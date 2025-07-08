document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault(); // prevent form from refreshing the page

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/signup', {
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
        console.error(err);
      });
  });
});
