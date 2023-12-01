document.addEventListener("DOMContentLoaded", function () {
  const favorites = getFavoritesFromLocalStorage() || [];
  renderFavorites(favorites);
});

function renderFavorites(nfts) {
  const artistsGrid = document.querySelector(".artists-grid");
  createAppendNftCards(nfts, artistsGrid);
}

function createAppendNftCards(nfts, container) {
  container.innerHTML = "";

  nfts.forEach((nft) => {
    const nftCard = document.createElement("div");
    nftCard.classList.add("artist-card");

    const artistId = document.createElement("div");
    artistId.classList.add("artist-id");
    artistId.textContent = nft.id;

    const avatarImg = document.createElement("img");
    avatarImg.src = "../../../" + nft.profileImgPath;
    avatarImg.classList.add("user-avatar");

    const artInfo = document.createElement("div");
    artInfo.classList.add("art-info");

    const nickname = document.createElement("h5");
    nickname.classList.add("nickname");
    nickname.textContent = nft.name;

    const topSales = document.createElement("div");
    topSales.classList.add("top-sales");
    const totalSales = document.createElement("p");
    totalSales.classList.add("total");
    totalSales.textContent = "Total Sales:";

    const sales = document.createElement("p");
    sales.classList.add("sales");
    sales.textContent = `${nft.totalSale.value} ${nft.totalSale.currency}`;

    topSales.appendChild(totalSales);
    topSales.appendChild(sales);

    artInfo.appendChild(nickname);
    artInfo.appendChild(topSales);

    nftCard.appendChild(artistId);
    nftCard.appendChild(avatarImg);
    nftCard.appendChild(artInfo);

    container.appendChild(nftCard);
  });
}

function getFavoritesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}
