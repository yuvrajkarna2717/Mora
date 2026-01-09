const express = require('express');
const supabase = require('../config/database');
const router = express.Router();

// Submit feedback
router.post('/submit', async (req, res) => {
  try {
    const { name, email, feedbackType, title, description, priority, category } = req.body;

    // Validation
    if (!name || !email || !feedbackType || !title || !description || !priority || !category) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Validate feedback type
    const validTypes = ['bug', 'feature', 'feedback'];
    if (!validTypes.includes(feedbackType)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid feedback type' 
      });
    }

    // Validate priority
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid priority level' 
      });
    }

    // Insert feedback into database
    const { data, error } = await supabase
      .from('feedback_submissions')
      .insert([{
        name,
        email: email.toLowerCase(),
        feedback_type: feedbackType,
        title,
        description,
        priority,
        category
      }])
      .select();

    if (error) {
      throw error;
    }

    res.json({ 
      success: true, 
      message: 'Feedback submitted successfully!',
      id: data[0].id
    });

  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit feedback. Please try again.' 
    });
  }
});

// Get feedback statistics (optional - for admin dashboard)
router.get('/stats', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('feedback_submissions')
      .select('feedback_type, status, priority');

    if (error) {
      throw error;
    }

    const stats = {
      total: data.length,
      byType: {
        bug: data.filter(f => f.feedback_type === 'bug').length,
        feature: data.filter(f => f.feedback_type === 'feature').length,
        feedback: data.filter(f => f.feedback_type === 'feedback').length
      },
      byStatus: {
        open: data.filter(f => f.status === 'open').length,
        in_progress: data.filter(f => f.status === 'in_progress').length,
        resolved: data.filter(f => f.status === 'resolved').length,
        closed: data.filter(f => f.status === 'closed').length
      },
      byPriority: {
        low: data.filter(f => f.priority === 'low').length,
        medium: data.filter(f => f.priority === 'medium').length,
        high: data.filter(f => f.priority === 'high').length
      }
    };

    res.json({ success: true, stats });

  } catch (error) {
    console.error('Feedback stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get feedback statistics' 
    });
  }
});

module.exports = router;