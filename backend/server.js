const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',  // replace with your real MySQL password
  database: 'bankdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// Sample login API
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

// Run the server
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
