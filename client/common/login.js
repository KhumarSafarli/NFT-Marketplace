const formContainerElement = document.querySelector(".submit-form");
const userNameInputElement = document.getElementById("username");
const passwordInputElement = document.getElementById("password");

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

formContainerElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (validateFormItems()) {
    await loginUser();
  }
});

function validateFormItems() {
  let isSuccess = true;
  const username = userNameInputElement.value;
  const password = passwordInputElement.value;

  if (!username.trim()) {
    document.querySelector(".name .error-message").textContent =
      "Username is required!";
    isSuccess = false;
  } else {
    document.querySelector(".name .error-message").textContent = "";
  }

  if (!password.trim()) {
    document.querySelector(".password .error-message").textContent =
      "Password is required";
    isSuccess = false;
  } else if (!PASSWORD_REGEX.test(password)) {
    document.querySelector(".password .error-message").textContent =
      "Invalid Password";
    isSuccess = false;
  } else {
    document.querySelector(".password .error-message").textContent = "";
  }

  return isSuccess;
}

async function loginUser() {
  const username = userNameInputElement.value;
  const password = passwordInputElement.value;

  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (response.status === 200) {
    const data = await response.json();
    showSuccessToast("Login successful!");
    setTimeout(() => {
      window.location.href = "../home.html";
    }, 2000);
  } else {
    const data = await response.json();
    showToast("Invalid username or password");
  }
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
      background: "linear-gradient(to right, #2ecc71, #27ae60)",
    },
  }).showToast();
}
