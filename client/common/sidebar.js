document.addEventListener("DOMContentLoaded", function () {
  const burgerIcon = document.querySelector(".sidebar-icon");
  const sidebar = document.querySelector(".sidebar");

  burgerIcon.addEventListener("click", function () {
    sidebar.style.display = "flex";
  });

  document.addEventListener("click", function (event) {
    if (!sidebar.contains(event.target) && event.target !== burgerIcon) {
      sidebar.style.display = "none";
    }
  });
});
