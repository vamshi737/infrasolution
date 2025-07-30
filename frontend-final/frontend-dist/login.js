const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://4.255.20.140:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.text();

    if (response.ok) {
      alert('✅ Login successful');
      window.location.href = 'dashboard.html';
    } else {
      alert('❌ Login failed: ' + result);
    }
  } catch (err) {
    console.error('❌ Network error:', err);
    alert('❌ Network error occurred.');
  }
});
