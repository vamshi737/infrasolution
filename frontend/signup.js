fetch('/api/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username, password }),
})
.then(res => res.text())
.then(data => {
  document.getElementById('result').textContent = data;
})
.catch(err => {
  document.getElementById('result').textContent = '❌ Signup failed.';
});
