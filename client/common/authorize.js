const formContainerElement = document.querySelector(".submit-form");
const userNameInputElement = document.getElementById("username");
const mailInputElement = document.querySelector(".email");
const passwordInputElement = document.getElementById("password");
const confirmPasswordInputElement = document.getElementById("repeatPassword");

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

formContainerElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (validateFormItems()) {
    await signUpUser();
  }
});

function validateFormItems() {
  let isSuccess = true;
  const username = userNameInputElement.value;
  const email = mailInputElement.value;
  const password = passwordInputElement.value;
  const confirmPassword = confirmPasswordInputElement.value;

  if (!username.trim()) {
    document.querySelector(".name .error-message").textContent =
      "Username is required!";
    isSuccess = false;
  } else {
    document.querySelector(".name .error-message").textContent = "";
  }

  if (!email.trim()) {
    document.querySelector(".mail .error-message").textContent =
      "Email is required";
    isSuccess = false;
  } else if (!EMAIL_REGEX.test(email)) {
    document.querySelector(".mail .error-message").textContent =
      "Invalid Email";
    isSuccess = false;
  } else {
    document.querySelector(".mail .error-message").textContent = "";
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

  if (!confirmPassword.trim()) {
    document.querySelector(".repeat-password .error-message").textContent =
      "Confirm password is required";
    isSuccess = false;
  } else if (!PASSWORD_REGEX.test(confirmPassword)) {
    document.querySelector(".repeat-password .error-message").textContent =
      "Invalid Confirm Password";
    isSuccess = false;
  } else {
    document.querySelector(".repeat-password .error-message").textContent = "";
  }

  if (password !== confirmPassword) {
    document.querySelector(".repeat-password .error-message").textContent =
      "Passwords do not match";
    isSuccess = false;
  }

  return isSuccess;
}

async function signUpUser() {
  const username = userNameInputElement.value;
  const email = mailInputElement.value;
  const password = passwordInputElement.value;

  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.status === 200) {
    const data = await response.json();
    showSuccessToast("Account created, please login!");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  } else {
    const data = await response.json();
    showToast("Username is already used");
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

function cleanErrorMessage() {
  [
    userNameInputElement,
    mailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  ].forEach((element) => {
    element.addEventListener("input", () => {
      element.nextElementSibling.textContent = "";
    });
  });
}
cleanErrorMessage();
