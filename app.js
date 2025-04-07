const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// READ
app.get('/', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) throw err;
    res.render('index', { students: results });
  });
});

// CREATE
app.post('/add', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO students (name, email) VALUES (?, ?)', [name, email], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// DELETE
app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM students WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// UPDATE FORM
app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM students WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.render('edit', { student: result[0] });
  });
});

// UPDATE SUBMIT
app.post('/update/:id', (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  db.query('UPDATE students SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
