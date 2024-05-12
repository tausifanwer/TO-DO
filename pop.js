export const overLy = document.querySelector(".overly");
export const popUp = document.querySelector(`.pop-up`);
const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", (e) => {
  overLy.style.display = "none";
  popUp.style.display = "none";
});
