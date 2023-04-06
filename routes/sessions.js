const express = require("express");
const router = express.Router();
const Sessions = require("../Models/Sessions.js");

// Создание нового фильма POST
router.post("/sessions", async (req, res) => {
  try {
    const session = await Sessions.create(req.body);
    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Получение всех фильмов GET
router.get("/sessions", async (req, res) => {
  try {
    const session = await Sessions.findAll();
    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});
// Получение фильма по его id GET
router.get("/sessions/:id", async (req, res) => {
  try {
    const session = await Sessions.findByPk(req.params.id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Изменение фильма по его id PUT
router.put("/sessions/:id", async (req, res) => {
  try {
    const session = await Sessions.findByPk(req.params.id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    await session.update(req.body);
    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Удаление фильма по его id
router.delete("/sessions/:id", async (req, res) => {
  try {
    const session = await Sessions.findByPk(req.params.id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    await session.destroy();
    res.json({ message: "Session deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
