const express = require('express');
const { authenticateToken } = require('./auth');
const supabase = require('../config/database');

const router = express.Router();

router.post('/upload', authenticateToken, async (req, res) => {
  try {
    const { data } = req.body;
    const userId = req.user.userId;

    const { error } = await supabase
      .from('backups')
      .insert({
        user_id: userId,
        data: data,
        backup_type: 'manual',
        created_at: new Date().toISOString()
      });

    if (error) throw error;
    res.json({ success: true, message: 'Data backed up successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Backup failed' });
  }
});

router.get('/download', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { data, error } = await supabase
      .from('backups')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download backup' });
  }
});

router.get('/list', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { data, error } = await supabase
      .from('backups')
      .select('id, backup_type, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list backups' });
  }
});

module.exports = router;