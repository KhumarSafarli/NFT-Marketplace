document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".submit-form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;

    if (!username.trim()) {
      showToast("Username must be filled.");
      return;
    }

    if (!email.trim()) {
      showToast("Email must be filled.");
      return;
    }
    if (!isEmailValid(email)) {
      showToast("Please enter a valid email address.");
      return;
    }
    if (!isPasswordValid(password)) {
      showToast("Password must contain at least 8 characters and 1 number.");
      return;
    }
    if (!password.trim()) {
      showToast("Password must be filled.");
      return;
    }

    if (!repeatPassword.trim()) {
      showToast("Confirm Password must be filled.");
      return;
    }

    if (password !== repeatPassword) {
      showToast("Passwords do not match.");
      return;
    }
    async function registerAccount() {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          repeatPassword,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setTimeout(() => {
          showSuccessToast("You successfully created an account!");
        }, 1000);
    
      } else if (response.status === 409) {
        
        showToast("Username is already used");
      } else {
        showToast("Username or Email already used");
        console.log('Response data:', await response.json());
      }
    }
    registerAccount();

  });

  function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !!email.match(emailRegex);
  }

  function isPasswordValid(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    return !!password.match(passwordRegex);
  }

  function showToast(message) {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #e74c3c, #e74c3c)",
      },
    }).showToast();
  }

  function showSuccessToast(message) {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #2ecc71, #27ae60)", // Green gradient
      },
    }).showToast();
  }
});
