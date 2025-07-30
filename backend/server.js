const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Serve static frontend files from /public
app.use(express.static('public'));

// ✅ Define the db connection
const db = mysql.createConnection({
  host: 'mysql',         // Kubernetes MySQL service name
  user: 'root',
  password: 'Vamsi321',
  database: 'bank'
});

// ✅ Wrap routes with /api
const router = express.Router();

// ✅ Login Route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) return res.status(500).send('Server error');
      if (results.length > 0) {
        res.send('✅ Login successful');
      } else {
        res.status(401).send('❌ Invalid credentials');
      }
    }
  );
});

// ✅ Balance Route (Mock)
router.get('/balance', (req, res) => {
  res.json({ balance: 12000.75 }); // You can fetch this from DB if needed
});

// ✅ ✅ FIXED: Transactions Route (Now from MySQL)
router.get('/transactions', (req, res) => {
  db.query('SELECT * FROM transactions', (err, results) => {
    if (err) {
      console.error('Error fetching transactions:', err);
      return res.status(500).send('Error fetching transactions');
    }
    res.json({ transactions: results });
  });
});

// ✅ Signup Route
router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).send('❌ Server error');

    if (results.length > 0) {
      return res.status(409).send('⚠️ Username already exists');
    }

    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
      if (err) return res.status(500).send('❌ Error saving user');
      res.send('✅ Signup successful!');
    });
  });
});

// ✅ Register the router under /api
app.use('/api', router);

// ✅ Start the server
app.listen(3000, '0.0.0.0', () => {
  console.log('✅ Backend running on port 3000');
});
