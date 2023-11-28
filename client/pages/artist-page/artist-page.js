function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");

if (!id) {
  window.open("../../home.html");
}

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = 0;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function toggleLoadingSpinner(showSpinner) {
  const avatarContainer = document.querySelector(".avatar-artist");
  let spinner = document.querySelector(".spinner");
  let avatarImage = document.querySelector(".avatar-artist img");

  if (!spinner) {
    spinner = document.createElement("img");
    spinner.src = "../../assets/images/spinner-2.gif";
    spinner.classList.add("spinner");
    avatarContainer.appendChild(spinner);
  }

  if (showSpinner) {
    avatarImage.style.display = "none";
    spinner.style.display = "block";
  } else {
    avatarImage.style.display = "block";
    spinner.style.display = "none";
  }
}

async function getCreatorFromApi(id) {
  try {
    toggleLoadingSpinner(true);

    const response = await fetch(`${BASE_URL}/creators/${id}`);
    if (!response.ok) {
      console.log(`${response.status}`);
      toggleLoadingSpinner(false);
    }

    const creator = await response.json();

    const avatarImage = document.querySelector(".avatar-artist img");
    avatarImage.src = "../../../" + creator.profileImgPath;

    document.querySelector(".name").textContent = creator.name;
    document.querySelector(".volume h5").textContent =
      kFormatter(creator.volume) + "+";
    document.querySelector(".sold h5").textContent =
      kFormatter(creator.nftSold) + "+";
    document.querySelector(".followers h5").textContent =
      creator.followers + "+";
    document.querySelector(".artist-bio").textContent = creator.bio;

    const chainIdElement = document.querySelector(".id");
    chainIdElement.addEventListener("click", () => {
      copyToClipboard(creator.chainId);
      showSuccessToast("ID copied to clipboard!");
    });

    const nftContainer = document.querySelector(".nft-container");
    const nftCreatorData = creator.nfts;
    nftCreatorData.forEach((nft) => {
      const nftCard = document.createElement("div");
      nftCard.classList.add("nft-card");
      const img = document.createElement("img");
      img.src = "../../../" + nft.imgPath;
      img.classList.add("head");
      const infoPart = document.createElement("div");
      infoPart.classList.add("info-part");
      const middlePart = document.createElement("div");
      middlePart.classList.add("middle-part");
      const h4 = document.createElement("h4");
      h4.textContent = nft.name;
      const userInfo = document.createElement("div");
      userInfo.classList.add("user-info");
      const avatar = document.createElement("img");
      avatar.src = "../../../" + creator.profileImgPath;
      avatar.classList.add("avatar");
      const username = document.createElement("p");
      username.classList.add("username");
      username.textContent = creator.name;
      userInfo.appendChild(avatar);
      userInfo.appendChild(username);
      middlePart.appendChild(h4);
      middlePart.appendChild(userInfo);
      const footerInfo = document.createElement("div");
      footerInfo.classList.add("footer-info");
      const left = document.createElement("div");
      left.classList.add("left");
      const priceLeft = document.createElement("p");
      priceLeft.classList.add("price");
      priceLeft.textContent = "Price";
      const costLeft = document.createElement("p");
      costLeft.classList.add("cost");
      costLeft.textContent = `${nft.price.value} ${nft.price.currency}`;
      left.appendChild(priceLeft);
      left.appendChild(costLeft);
      const right = document.createElement("div");
      right.classList.add("right");
      const priceRight = document.createElement("p");
      priceRight.classList.add("price");
      priceRight.textContent = "Highest Bid";
      const costRight = document.createElement("p");
      costRight.classList.add("cost");
      costRight.textContent = `${nft.highestBid.value} ${nft.highestBid.currency}`;
      right.appendChild(priceRight);
      right.appendChild(costRight);
      footerInfo.appendChild(left);
      footerInfo.appendChild(right);
      infoPart.appendChild(middlePart);
      infoPart.appendChild(footerInfo);
      nftCard.appendChild(img);
      nftCard.appendChild(infoPart);
      nftContainer.appendChild(nftCard);
    });
    toggleLoadingSpinner(false);
  } catch (error) {
    console.log(error);
    toggleLoadingSpinner(false);
  }
}

getCreatorFromApi(id);

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
