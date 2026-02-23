const express = require("express");
const router = express.Router();

const todos = [
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

router.get("/", (req, res) => {
  res.send(todos);
});

module.exports = router;
