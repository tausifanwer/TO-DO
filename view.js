export const viewData = document.querySelector(".view-container");
const closeBtn = document.querySelector(".close-data");
closeBtn.addEventListener("click", (e) => {
  viewData.style.display = "none";
});
