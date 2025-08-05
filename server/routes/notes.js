const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// GET all notes for a user
router.get('/', auth, async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM notes WHERE user_id = $1 ORDER BY pinned DESC, created_at DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST a new note for a user
router.post('/', auth, async (req, res) => {
  try {
    const { title, body } = req.body;
    const { rows } = await db.query(
      'INSERT INTO notes (title, body, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, body, req.user.id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// PUT (update) a note for a user
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, pinned } = req.body;
    const { rows } = await db.query(
      'UPDATE notes SET title = $1, body = $2, pinned = $3 WHERE note_id = $4 AND user_id = $5 RETURNING *',
      [title, body, pinned, id, req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Note not found or user not authorized' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// DELETE a note for a user
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM notes WHERE note_id = $1 AND user_id = $2', [
      id,
      req.user.id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ msg: 'Note not found or user not authorized' });
    }
    res.json({ msg: 'Note deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;