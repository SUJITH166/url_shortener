const express = require("express");
const pool = require("../db/pool");
const { nanoid } = require("nanoid");

const router = express.Router();

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const shortCode = nanoid(7);

  try {
    const result = await pool.query(
      "INSERT INTO urls (longUrl, shortCode) VALUES ($1, $2) RETURNING *",
      [longUrl, shortCode]
    );

    res.json({
      shortUrl: `http://localhost:5000/${shortCode}`,
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM urls WHERE shortCode = $1",
      [shortCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("URL not found");
    }

    const urlData = result.rows[0];

    // update click count
    await pool.query(
      "UPDATE urls SET clicks = clicks + 1 WHERE shortCode = $1",
      [shortCode]
    );

    res.redirect(urlData.longurl);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
