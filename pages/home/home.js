document.addEventListener("DOMContentLoaded", function () {
    function fillArtistCards(creators) {
        const artistsGrid = document.querySelector(".artists-grid");
        creators.forEach((creator) => {
          const artistCard = document.createElement("div");
          artistCard.classList.add("artist-card");
          const artistId = document.createElement("div");
          artistId.classList.add("artist-id");
          artistId.textContent = creator.id;
          const avatarImg = document.createElement("img");
          avatarImg.src = creator.profileImgPath;
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
    }
    fillArtistCards(creators);
  });