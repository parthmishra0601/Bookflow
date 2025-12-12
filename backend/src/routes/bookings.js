const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const { rows } = await pool.query(
      `
      SELECT
        b.id AS booking_id,
        s.bus_name,
        s.start_time,
        b.status,
        array_agg(se.seat_number ORDER BY se.seat_number) AS seats
      FROM bookings b
      JOIN shows s ON s.id = b.show_id
      JOIN booking_seats bs ON bs.booking_id = b.id
      JOIN seats se ON se.id = bs.seat_id
      WHERE b.user_id = $1
      GROUP BY b.id, s.bus_name, s.start_time, b.status
      ORDER BY b.created_at DESC
      `,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

router.post("/", async (req, res) => {
  const client = await pool.connect();

  try {
    const { user_id, show_id, seat_ids } = req.body;

    if (!user_id || !show_id || !Array.isArray(seat_ids) || seat_ids.length === 0) {
      return res.status(400).json({ message: "user_id, show_id and seat_ids required" });
    }

    await client.query("BEGIN");

    const bookingResult = await client.query(
      `
      INSERT INTO bookings (user_id, show_id, status)
      VALUES ($1, $2, 'PENDING')
      RETURNING id
      `,
      [user_id, show_id]
    );

    const bookingId = bookingResult.rows[0].id;

    for (const seatId of seat_ids) {
      const seatCheck = await client.query(
        `
        UPDATE seats
        SET is_booked = true
        WHERE id = $1 AND show_id = $2 AND is_booked = false
        RETURNING id
        `,
        [seatId, show_id]
      );

      if (seatCheck.rowCount === 0) {
        throw new Error("Seat already booked");
      }

      await client.query(
        `
        INSERT INTO booking_seats (booking_id, seat_id)
        VALUES ($1, $2)
        `,
        [bookingId, seatId]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Booking created",
      booking_id: bookingId,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(409).json({ message: "Booking failed. Seat may be already booked." });
  } finally {
    client.release();
  }
});

module.exports = router;
