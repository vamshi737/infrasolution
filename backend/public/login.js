document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    .then(res => res.text())
    .then(data => {
      if (data === '✅ Login successful') {
        window.location.href = 'balance.html';
      } else {
        document.getElementById('result').textContent = data;
      }
    })
    .catch(err => {
      document.getElementById('result').textContent = '❌ Error logging in.';
      console.error(err);
    });
  });
});

