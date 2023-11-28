async function getCreatorsFromApi() {
  try {
    const response = await fetch(`${BASE_URL}/creators`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function fillCreatorsTable() {
  const artistsGrid = document.querySelector(".artists-grid");
  try {
    const data = await getCreatorsFromApi();
    const creators = data;

    creators.forEach((creator) => {
      const artistCard = document.createElement("div");
      artistCard.classList.add("artist-card");

      artistCard.addEventListener("click", () => {
        window.location.href = `./pages/artist-page/artist-page.html?id=${creator.id}`;
      });

      const artistId = document.createElement("div");
      artistId.classList.add("artist-id");
      artistId.textContent = creator.id;
      const avatarImg = document.createElement("img");
      avatarImg.src = "../" + creator.profileImgPath;
      avatarImg.classList.add("user-avatar");
      const artInfo = document.createElement("div");
      artInfo.classList.add("art-info");
      const nickname = document.createElement("h5");
      nickname.classList.add("nickname");
      nickname.textContent = creator.name;
      const topSales = document.createElement("div");
      topSales.classList.add("top-sales");
      const totalSales = document.createElement("p");
      totalSales.classList.add("total");
      totalSales.textContent = "Total Sales:";
      const sales = document.createElement("p");
      sales.classList.add("sales");
      sales.textContent = `${creator.totalSale.value} ${creator.totalSale.currency}`;
      topSales.appendChild(totalSales);
      topSales.appendChild(sales);
      artInfo.appendChild(nickname);
      artInfo.appendChild(topSales);
      artistCard.appendChild(artistId);
      artistCard.appendChild(avatarImg);
      artistCard.appendChild(artInfo);
      artistsGrid.appendChild(artistCard);
    });
  } catch (error) {
    console.log(error);
  }
}

fillCreatorsTable();

const subscribeWidget = document.querySelector(".subscribe-widget");
const subscribeButtonWidget = subscribeWidget.querySelector(".submit-btn");
subscribeButtonWidget.addEventListener("click", handleSubscribe);

function handleSubscribe(event) {
  const emailInput =
    event.target.parentElement.parentElement.querySelector(".email");
  const email = emailInput.value.trim();
  if (isValidEmail(email)) {
    showSuccessToast("You successfully subscribed!");
  } else {
    showToast("Invalid email address");
  }
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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

const endTime = new Date();
endTime.setHours(endTime.getHours() + 59);
const timerInterval = setInterval(updateTimer, 1000);
function updateTimer() {
  const currentTime = new Date();
  const remainingTime = endTime - currentTime;
  if (remainingTime > 0) {
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    document.querySelector(".hours").textContent = addZero(hours);
    document.querySelector(".minutes").textContent = addZero(minutes);
    document.querySelector(".seconds").textContent = addZero(seconds);
  } else {
    clearInterval(timerInterval);
  }
}
function addZero(num) {
  return num < 10 ? "0" + num : num;
}
