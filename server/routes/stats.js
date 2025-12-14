const express = require('express');
const { authenticateToken } = require('./auth');
const supabase = require('../config/database');
const { generateInsights } = require('../utils/ai');

const router = express.Router();

router.post('/analyze', authenticateToken, async (req, res) => {
  try {
    const { data } = req.body;
    const userId = req.user.userId;

    // Store data in database
    const { error } = await supabase
      .from('usage_data')
      .insert({
        user_id: userId,
        data: data,
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    // Generate AI insights
    const insights = await generateInsights(data);

    // Store insights
    await supabase
      .from('ai_insights')
      .insert({
        user_id: userId,
        insights: insights,
        data_snapshot: data,
        created_at: new Date().toISOString()
      });

    res.json({ insights, data });
  } catch (error) {
    console.error('Stats analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze stats' });
  }
});

router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

router.delete('/day/:date', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { date } = req.params;

    const { error } = await supabase
      .from('usage_data')
      .delete()
      .eq('user_id', userId)
      .gte('created_at', `${date}T00:00:00`)
      .lt('created_at', `${date}T23:59:59`);

    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete data' });
  }
});

router.delete('/all', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    await supabase.from('usage_data').delete().eq('user_id', userId);
    await supabase.from('ai_insights').delete().eq('user_id', userId);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete all data' });
  }
});

module.exports = router;