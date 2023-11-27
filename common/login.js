document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.submit-form');
  form.addEventListener('submit',async function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username.trim()) {
      showToast('Username must be filled.');
      return;
    }

    if (!password.trim()) {
      showToast('Password must be filled.');
      return;
    }
    if (!isPasswordValid(password)) {
      showToast('Password is not valid');
      return;
    }

    loginAccount(username, password);
   
  });

  function isPasswordValid(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    return !!password.match(passwordRegex);
  }

  async function loginAccount(username, password) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      // console.log(data);
      setTimeout(() => {
        showSuccessToast('You successfully logged in!');
      }, 1000);
    } else if (response.status === 400) {
      showToast('Invalid username or password. Please try again.');
    } else {
      
      console.log( await response.json());
    }
  }

});
function showToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: 'linear-gradient(to right, #e74c3c, #e74c3c)',
    },
  }).showToast();
}

function showSuccessToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: 'linear-gradient(to right, #2ecc71, #27ae60)',
    },
  }).showToast();
}