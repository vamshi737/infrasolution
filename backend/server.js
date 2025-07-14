
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MySQL connection setup for Docker Compose
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql',       // Use Compose service name
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Vamsi321',
  database: process.env.DB_NAME || 'bankdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// ✅ Login API
app.post('/login', (req, res) => {
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

// ✅ Balance API (Real DB logic can be added later)
app.get('/balance', (req, res) => {
  const dummyBalance = 12000.75;
  res.json({ balance: dummyBalance });
});

// ✅ Transactions API
app.get('/transactions', (req, res) => {
  const transactions = [
    { date: '2025-07-05', type: 'Deposit', amount: 3000 },
    { date: '2025-07-06', type: 'Withdrawal', amount: 1500 },
    { date: '2025-07-07', type: 'Transfer', amount: 2000 },
  ];
  res.json({ transactions });
});

// ✅ Signup API
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).send('❌ Server error');
    
    if (results.length > 0) {
      return res.status(409).send('⚠️ Username already exists');
    }

    // If not exists, insert new user
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
      if (err) return res.status(500).send('❌ Error saving user');
      res.send('✅ Signup successful!');
    });
  });
});

// ✅ Start the server
app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});

