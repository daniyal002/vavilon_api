const express = require("express");
const router = express.Router();
const Orders = require("../Models/Orders.js");

// Создание нового фильма POST
router.post("/orders", async (req, res) => {
  try {
    const order = await Orders.create(req.body);
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Получение всех фильмов GET
router.get("/orders", async (req, res) => {
  try {
    const order = await Orders.findAll();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});
// Получение фильма по его id GET
router.get("/orders/:id", async (req, res) => {
  try {
    const order = await Orders.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Изменение фильма по его id PUT
router.put("/orders/:id", async (req, res) => {
  try {
    const order = await Orders.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "order not found" });
    }
    await order.update(req.body);
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Удаление фильма по его id
router.delete("/orders/:id", async (req, res) => {
  try {
    const order = await Orders.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "order not found" });
    }
    await order.destroy();
    res.json({ message: "Order deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
