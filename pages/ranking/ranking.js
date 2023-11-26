async function getCreatorsFromApi() {
  const response = await fetch(`${BASE_URL}/creators`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  const data = await response.json();
  return data;
}

async function fillCreatorsTable() {
  const data = await getCreatorsFromApi();
  const creators = data; 

  creators.forEach(creator => {
    console.log(creator);

    const tableBody = document.querySelector(".table-body");
    const artistInfo = document.createElement("div");
    artistInfo.classList.add("artist-info");
    const idAvatar = document.createElement("div");
    idAvatar.classList.add("id-avatar");
    const idElement = document.createElement("div");
    idElement.classList.add("id");
    idElement.textContent = creator.id;
    const avatarElement = document.createElement("div");
    avatarElement.classList.add("avatar");
    const avatarImg = document.createElement("img");
    avatarImg.src = creator.profileImgPath;
    avatarImg.classList.add("creator-avatar");
    avatarElement.appendChild(avatarImg);
    const nameElement = document.createElement("div");
    nameElement.classList.add("name");
    nameElement.textContent = creator.name;
    idAvatar.appendChild(idElement);
    idAvatar.appendChild(avatarElement);
    idAvatar.appendChild(nameElement);
    const status = document.createElement("div");
    status.classList.add("status");
    const changeElement = document.createElement("div");
    changeElement.classList.add("change");
    changeElement.textContent = "+1.41%";
    const soldElement = document.createElement("div");
    soldElement.classList.add("sold");
    soldElement.textContent = creator.nftSold;
    const volumeElement = document.createElement("div");
    volumeElement.classList.add("volume");
    volumeElement.textContent = `${creator.totalSale.value} ${creator.totalSale.currency}`;
    status.appendChild(changeElement);
    status.appendChild(soldElement);
    status.appendChild(volumeElement);
    artistInfo.appendChild(idAvatar);
    artistInfo.appendChild(status);
    tableBody.appendChild(artistInfo);
    artistInfo.addEventListener("click", () => {
      window.location.href = `../../pages/artist-page/artist-page.html?id=${creator.id}`;
    });
  });
}

fillCreatorsTable();
