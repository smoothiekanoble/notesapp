const express = require('express');
const router = express.Router();
const db = require('../db');

// GET leaderboard data
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT
        u.email,
        COUNT(n.note_id) AS note_count
      FROM
        users u
      JOIN
        notes n ON u.user_id = n.user_id
      GROUP BY
        u.email
      ORDER BY
        note_count DESC
      LIMIT 10`
    );
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
