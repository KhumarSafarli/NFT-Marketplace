const subscribeButtonFooter = document.querySelector(".page-footer .submit");
subscribeButtonFooter.addEventListener("click", handleSubscribe);

function handleSubscribe(event) {
  const emailInput = event.target.parentElement.parentElement.querySelector(".email");
  const email = emailInput.value.trim();
  if (isValidEmail(email)) {
    showSuccessToast("You successfully subscribed!");
  } else {
    showToast("Invalid email address");
  }
};
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
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