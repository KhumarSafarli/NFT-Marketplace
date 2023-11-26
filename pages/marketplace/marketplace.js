const marketplaceNftCard = document.querySelector(".nft-container .nft-card");

async function getNftsFromApi() {
  const response = await fetch(`${BASE_URL}/nfts`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pageSize: 18,
    }),
  });

  const data = await response.json();
  return data;
}

async function fillNftCardWithNft() {
  const data = await getNftsFromApi();
  const nfts = data.nfts;

  nfts.forEach(nft => {
    console.log(nft);
    const nftContainer = document.querySelector(".nft-container");
    const nftCard = document.createElement("div");
    nftCard.classList.add("nft-card");
    const img = document.createElement("img");
    img.src = nft.imgPath;
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
    avatar.src = nft.creator.profileImgPath;
    avatar.classList.add("avatar");
    const username = document.createElement("p");
    username.classList.add("username");
    username.textContent = nft.creator.name;
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
}
fillNftCardWithNft();
