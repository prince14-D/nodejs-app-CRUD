const express = require('express');
const router = express.Router();
const db = require('../db');

// Show all users
router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.render('users', { users: results });
  });
});

// Add user
router.post('/add', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err) => {
    if (err) throw err;
    res.redirect('/users');
  });
});

// Delete user
router.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/users');
  });
});

// Edit form
router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.render('edit', { user: results[0] });
  });
});

// Update user
router.post('/update/:id', (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;
  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
    if (err) throw err;
    res.redirect('/users');
  });
});

module.exports = router;
