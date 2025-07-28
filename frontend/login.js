document.getElementById('loginForm').addEventListener('submit', function (e) {
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
      document.getElementById('result').textContent = data;
    })
    .catch(err => {
      document.getElementById('result').textContent = '❌ Login failed.';
      console.error(err);
    });
});
