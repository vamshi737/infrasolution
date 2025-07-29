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
  host: 'mysql',         // name of your MySQL Kubernetes service
  user: 'root',
  password: 'Vamsi321',
  database: 'bank'
});

// ✅ Wrap routes with /api
const router = express.Router();

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

router.get('/balance', (req, res) => {
  res.json({ balance: 12000.75 });
});

router.get('/transactions', (req, res) => {
  const transactions = [
    { date: '2025-07-05', type: 'Deposit', amount: 3000 },
    { date: '2025-07-06', type: 'Withdrawal', amount: 1500 },
    { date: '2025-07-07', type: 'Transfer', amount: 2000 },
  ];
  res.json({ transactions });
});

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

// Start server
app.listen(3000, '0.0.0.0', () => {
  console.log('✅ Backend running on port 3000');
});
