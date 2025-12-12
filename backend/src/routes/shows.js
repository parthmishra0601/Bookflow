const express = require("express");
const router = express.Router();
const pool = require("../db");

/* ---------------- GET ALL SHOWS ---------------- */
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, bus_name, start_time, total_seats FROM shows ORDER BY start_time ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch shows" });
  }
});

/* ---------------- GET SEATS FOR A SHOW ---------------- */
router.get("/:showId/seats", async (req, res) => {
  try {
    const showId = Number(req.params.showId);

    const { rows } = await pool.query(
      "SELECT id, seat_number, is_booked FROM seats WHERE show_id = $1 ORDER BY seat_number ASC",
      [showId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch seats" });
  }
});

/* ---------------- CREATE NEW SHOW ---------------- */
router.post("/", async (req, res) => {
  const client = await pool.connect();

  try {
    const { bus_name, start_time, total_seats } = req.body;

    if (!bus_name || !start_time || !total_seats) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const seatsNum = Number(total_seats);
    if (isNaN(seatsNum) || seatsNum <= 0) {
      return res.status(400).json({ message: "total_seats must be positive" });
    }

    await client.query("BEGIN");

    const showResult = await client.query(
      `
      INSERT INTO shows (bus_name, start_time, total_seats)
      VALUES ($1, $2, $3)
      RETURNING id, bus_name, start_time, total_seats
      `,
      [bus_name, start_time, seatsNum]
    );

    const newShow = showResult.rows[0];

    const seatValues = [];
    const params = [newShow.id];

    for (let i = 1; i <= seatsNum; i++) {
      seatValues.push(`($1, $${i + 1}, false)`);
      params.push(i);
    }

    await client.query(
      `
      INSERT INTO seats (show_id, seat_number, is_booked)
      VALUES ${seatValues.join(", ")}
      `,
      params
    );

    await client.query("COMMIT");

    res.status(201).json(newShow);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ message: "Failed to create show" });
  } finally {
    client.release();
  }
});

module.exports = router;
