const express = require("express");
const router = express.Router();
const { supabase, isSupabaseConfigured } = require("../../lib/supabase");

const fallbackTodos = [
  {
    id: 1,
    title: "Buy Groceries",
    completed: false,
  },
  {
    id: 2,
    title: "Complete Supabase",
    completed: false,
  },
  {
    id: 3,
    title: "Learn Firebase",
    completed: true,
  },
  {
    id: 4,
    title: "ExpressJs",
    completed: false,
  },
  {
    id: 5,
    title: "Test endpoints",
    completed: false,
  },
];

router.get("/", async (req, res) => {
  if (!isSupabaseConfigured) {
    return res.send(fallbackTodos);
  }

  const { data, error } = await supabase
    .from("todo_items")
    .select("id, title, completed")
    .order("id", { ascending: true });

  if (error) {
    return res.status(500).json({
      message: "Failed to fetch todos from Supabase",
      details: error.message,
    });
  }

  return res.send(data);
});

module.exports = router;
