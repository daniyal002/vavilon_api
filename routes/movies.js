const express = require("express");
const router = express.Router();
const Movies = require("../Models/Movies.js");

// Создание нового фильма POST
router.post("/movies", async (req, res) => {
  try {
    const movie = await Movies.create(req.body);
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Получение всех фильмов GET
router.get("/movies", async (req, res) => {
  try {
    const movies = await Movies.findAll();
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});
// Получение фильма по его id GET
router.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movies.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Изменение фильма по его id PUT
router.put("/movies/:id", async (req, res) => {
  try {
    const movie = await Movies.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    await movie.update(req.body);
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Удаление фильма по его id
router.delete("/movies/:id", async (req, res) => {
  try {
    const movie = await Movies.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    await movie.destroy();
    res.json({ message: "Movie deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
