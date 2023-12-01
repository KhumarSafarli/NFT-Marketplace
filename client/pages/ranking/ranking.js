const delay = 1000;
const tableBody = document.querySelector(".table-body");

const idSort = document.querySelector(".sort-id");
const artistSort = document.querySelector(".sort-artist");
const changeSort = document.querySelector(".sort-change");
const nftSort = document.querySelector(".sort-nft-sold");
const volumeSort = document.querySelector(".sort-volume");
const loader = document.getElementById("preloader");
let orderByPropName = null;
let creatorsData = [];
window.addEventListener("load", function () {
  setTimeout(function () {
    loader.classList.add("hide-preloader");
  }, delay);
});
async function getCreatorsFromApi() {
  const response = await fetch(`${BASE_URL}/creators`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  creatorsData = data;
  return data;
}

async function fillCreatorsTable() {
  const data = await getCreatorsFromApi();
  const creators = data;
  creators.forEach((creator) => {
    createCreatorRow(creator);
  });
}
function createCreatorRow(creator) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("content");
  const baseContainer = document.createElement("div");
  baseContainer.classList.add("base");

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
  avatarImg.src = "../../../" + creator.profileImgPath;
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
  changeElement.textContent = `${creator.totalSale.value} ${creator.totalSale.currency}`;

  const soldElement = document.createElement("div");
  soldElement.classList.add("sold");
  soldElement.textContent = creator.nftSold;

  const volumeElement = document.createElement("div");
  volumeElement.classList.add("volume");
  volumeElement.textContent = creator.volume;
  status.appendChild(changeElement);
  status.appendChild(soldElement);
  status.appendChild(volumeElement);

  artistInfo.appendChild(idAvatar);
  artistInfo.appendChild(status);

  baseContainer.appendChild(artistInfo);

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "../../assets/icons/delete.svg";
  deleteIcon.classList.add("delete");

  cardContainer.appendChild(baseContainer);
  cardContainer.appendChild(deleteIcon);

  tableBody.appendChild(cardContainer);

  deleteIcon.addEventListener("click", async (event) => {
    event.stopPropagation();

    const creatorId = creator.id;

    const confirmDelete = confirm(
      "Are you sure you want to delete this creator?"
    );
    if (!confirmDelete) {
      return;
    }

    const deleteResponse = await deleteCreator(creatorId);

    if (deleteResponse.success) {
      cardContainer.remove();
    } else {
      alert(`Failed to delete creator. ${deleteResponse.error}`);
    }
  });

  cardContainer.addEventListener("click", () => {
    window.location.href = `../../pages/artist-page/artist-page.html?id=${creator.id}`;
  });
}
async function deleteCreator(creatorId) {
  try {
    const response = await fetch(`${BASE_URL}/creators/${creatorId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return { success: true };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error,
      };
    }
  } catch (error) {
    return { success: false, error: `Error: ${error.message}` };
  }
}

fillCreatorsTable();

function sortCreators(creators, propName) {
  if (orderByPropName && orderByPropName.label === propName) {
    orderByPropName.order = orderByPropName.order === "asc" ? "desc" : "asc";
  } else {
    orderByPropName = {
      label: propName,
      order: "desc",
    };
  }

  const isReverse = orderByPropName.order === "asc";

  creators.sort((p1, p2) => {
    if (!isNaN(+p1[propName])) {
      return isReverse
        ? +p1[propName] - +p2[propName]
        : +p2[propName] - +p1[propName];
    }

    return isReverse
      ? p1[propName].localeCompare(p2[propName])
      : p2[propName].localeCompare(p1[propName]);
  });
  tableBody.innerHTML = "";

  creators.forEach((creator) => createCreatorRow(creator));
}

idSort.addEventListener("click", (e) => {
  sortCreators(creatorsData, "id");
});
artistSort.addEventListener("click", (e) => {
  sortCreators(creatorsData, "name");
});

nftSort.addEventListener("click", (e) => {
  sortCreators(creatorsData, "nftSold");
});

volumeSort.addEventListener("click", (e) => {
  sortCreators(creatorsData, "volume");
});

changeSort.addEventListener("click", (e) => {
  propName = creatorsData.totalSale.value;
  sortCreators(creatorsData, "nftSold");
});
