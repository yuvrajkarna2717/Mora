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

// Auto backup endpoints
router.post('/auto-enable', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        auto_backup: true,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (error) throw error;

    res.json({ success: true, message: 'Auto backup enabled successfully' });
  } catch (error) {
    console.error('Auto backup enable error:', error);
    res.status(500).json({ success: false, message: 'Failed to enable auto backup' });
  }
});

router.post('/auto-disable', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        auto_backup: false,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (error) throw error;

    res.json({ success: true, message: 'Auto backup disabled successfully' });
  } catch (error) {
    console.error('Auto backup disable error:', error);
    res.status(500).json({ success: false, message: 'Failed to disable auto backup' });
  }
});

router.get('/auto-status', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const { data, error } = await supabase
      .from('user_preferences')
      .select('auto_backup')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    res.json({ 
      success: true, 
      autoBackupEnabled: data?.auto_backup || false 
    });
  } catch (error) {
    console.error('Auto backup status error:', error);
    res.status(500).json({ success: false, message: 'Failed to get auto backup status' });
  }
});

// Download backup endpoints
router.get('/download/latest', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const { data, error } = await supabase
      .from('backups')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'No backups found' });
      }
      throw error;
    }

    const filename = `mora-backup-${new Date(data.created_at).toISOString().split('T')[0]}.json`;
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.json(data.data);
  } catch (error) {
    console.error('Download backup error:', error);
    res.status(500).json({ success: false, message: 'Failed to download backup' });
  }
});

router.get('/download/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const backupId = req.params.id;

    const { data, error } = await supabase
      .from('backups')
      .select('*')
      .eq('user_id', userId)
      .eq('id', backupId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Backup not found' });
      }
      throw error;
    }

    const filename = `mora-backup-${new Date(data.created_at).toISOString().split('T')[0]}.json`;
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.json(data.data);
  } catch (error) {
    console.error('Download backup error:', error);
    res.status(500).json({ success: false, message: 'Failed to download backup' });
  }
});

// Restore backup endpoint
router.post('/restore/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const backupId = req.params.id;

    const { data, error } = await supabase
      .from('backups')
      .select('*')
      .eq('user_id', userId)
      .eq('id', backupId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Backup not found' });
      }
      throw error;
    }

    // In a real implementation, you would restore the data to the user's extension
    // For now, we'll just return the data that should be restored
    res.json({ 
      success: true, 
      message: 'Backup data retrieved for restoration',
      data: data.data,
      metadata: {
        backupDate: data.created_at,
        totalDays: Object.keys(data.data || {}).length,
        totalSites: [...new Set(Object.values(data.data || {}).flatMap(day => Object.keys(day)))].length
      }
    });
  } catch (error) {
    console.error('Restore backup error:', error);
    res.status(500).json({ success: false, message: 'Failed to restore backup' });
  }
});

// Delete all backups endpoint
router.delete('/delete-all', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const { error } = await supabase
      .from('backups')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;

    res.json({ 
      success: true, 
      message: 'All backups deleted successfully' 
    });
  } catch (error) {
    console.error('Delete all backups error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete backups' });
  }
});
module.exports = router;