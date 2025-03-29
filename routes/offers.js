const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all offers
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM offers");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// GET single offer
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM offers WHERE id = $1", [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// POST new offer
router.post("/", async (req, res) => {
  try {
    const { title, description, price, image_url } = req.body;
    const result = await pool.query(
      "INSERT INTO offers (title, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, price, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// PUT update offer
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, image_url } = req.body;
    const result = await pool.query(
      "UPDATE offers SET title = $1, description = $2, price = $3, image_url = $4 WHERE id = $5 RETURNING *",
      [title, description, price, image_url, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// DELETE offer
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM offers WHERE id = $1", [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
