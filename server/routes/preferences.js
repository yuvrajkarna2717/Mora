const express = require("express");
const supabase = require("../config/database");
const { authenticateToken } = require("./auth");

const router = express.Router();

// Check auto backup preference
router.get("/auto-backup", authenticateToken, async (req, res) => {
  try {
    const { data: preferences, error } = await supabase
      .from("user_preferences")
      .select("auto_backup")
      .eq("user_id", req.user.userId)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    res.json({ auto_backup: preferences?.auto_backup ?? true });
  } catch (error) {
    console.error("Error fetching auto backup preference:", error);
    res.status(500).json({ error: "Failed to fetch preference" });
  }
});

// Toggle auto backup preference
router.post("/toggle-auto-backup", authenticateToken, async (req, res) => {
  try {
    // Get current preference
    const { data: current, error: fetchError } = await supabase
      .from("user_preferences")
      .select("auto_backup")
      .eq("user_id", req.user.userId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    const newValue = !(current?.auto_backup ?? true);

    const { data: preferences, error } = await supabase
      .from("user_preferences")
      .upsert(
        {
          user_id: req.user.userId,
          auto_backup: newValue,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
      .select()
      .single();

    if (error) throw error;

    res.json({ auto_backup: preferences.auto_backup });
  } catch (error) {
    console.error("Error toggling auto backup:", error);
    res.status(500).json({ error: "Failed to toggle preference" });
  }
});

// Create backup
router.post("/backup", authenticateToken, async (req, res) => {
  try {
    const { backup_data } = req.body;

    if (!backup_data) {
      return res.status(400).json({ error: "Backup data is required" });
    }

    const backupSize = JSON.stringify(backup_data).length;

    const { data: backup, error } = await supabase
      .from("auto_backups")
      .insert({
        user_id: req.user.userId,
        backup_data,
        backup_size: backupSize,
        backup_frequency: "manual",
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, backup });
  } catch (error) {
    console.error("Error creating backup:", error);
    res.status(500).json({ error: "Failed to create backup" });
  }
});

// Delete user account
router.delete("/account", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Delete all related data in order (due to foreign key constraints)
    await supabase.from("auto_backups").delete().eq("user_id", userId);
    await supabase.from("user_preferences").delete().eq("user_id", userId);
    await supabase.from("backups").delete().eq("user_id", userId);
    await supabase.from("ai_insights").delete().eq("user_id", userId);
    await supabase.from("usage_data").delete().eq("user_id", userId);
    
    // Finally delete the user
    const { error } = await supabase.from("users").delete().eq("id", userId);
    
    if (error) throw error;

    res.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "Failed to delete account" });
  }
});

module.exports = router;
