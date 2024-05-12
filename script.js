import { overLy, popUp } from "./pop.js";
import { viewData } from "./view.js";
const inputData = document.querySelector("input");
const btn = document.querySelector("button");
let total = document.querySelector(".item-list");
let completedList = document.querySelector(".completed-item-list");
let dueDate = document.querySelector("#due_date");
let storage = JSON.parse(localStorage.getItem("items"));
let arr = storage || [];
let storage2 = JSON.parse(localStorage.getItem("totalItems"));
let comArr = storage2 || [];
let values = "";

showItem();
completed();
inputData.addEventListener("input", (e) => {
  values = e.target.value;
});

btn.addEventListener("click", () => {
  if (!values || dueDate.value === "") {
    overLy.style.display = "block";
    popUp.style.display = "block";
    return;
  }
  let flag = true;
  if (arr.length > 1) {
    arr.forEach((item) => {
      if (item.data === values) {
        alert("This item already exists");
        flag = false;
        return;
      }
    });
  }
  if (!flag) {
    values = "";
    inputData.value = "";
    dueDate.value = "";
    return;
  }
  arr.push({ data: values, debate: dueDate.value });
  localStorage.setItem("items", JSON.stringify(arr));
  console.log("hi");
  let block = document.createElement("div");
  block.classList.add("parent-content");
  let sap = document.createElement("div");
  sap.className = "sap";
  let sh = document.createElement("p");
  sh.innerText = `${values}`;
  let date = document.createElement("span");
  date.innerText = dueDate.value;
  let del = document.createElement("button");
  del.classList.add("delete");
  sap.append(sh, date);
  block.append(del, sap);
  total.append(block);
  values = "";
  inputData.value = "";
  window.location.reload();
});

let delBtn = document.querySelectorAll(".delete");
delBtn.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    // e.preventDefault();
    e.target.parentElement.remove();
    let d = arr.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(arr));
    comArr.push(d[0]);
    localStorage.setItem("totalItems", JSON.stringify(comArr));
    window.location.reload();
    arr.reverse();
  });
});
function showItem() {
  for (let i = 0; i < arr.length; i++) {
    let block = document.createElement("div");
    block.classList.add("parent-content");
    let sap = document.createElement("div");
    sap.className = "sap";
    let view = document.createElement("span");
    view.classList.add("material-symbols-outlined");
    view.innerText = "visibility";
    let sh = document.createElement("p");
    sh.innerText = `${arr[i].data}`;
    let date = document.createElement("span");
    date.innerText = `${arr[i].debate}`;
    let del = document.createElement("button");
    del.classList.add("delete");
    sap.append(view, sh, date);
    block.append(del, sap);
    total.append(block);
    let content = document.createElement("p");
    content.classList.add("content-style");
    view.addEventListener("click", (e) => {
      // debugger

      content.innerText = arr[i].data;
      viewData.append(content);
      viewData.style.display = "block";
      let all = document.querySelectorAll(".content-style");
      if ([...all].length > 1) {
        let parent = document.querySelector(".view-container");
        let child = parent.firstElementChild.nextElementSibling;
        parent.removeChild(child);
      }
    });
  }
}

function completed() {
  for (let i = 0; i < comArr.length; i++) {
    let bl = document.createElement("div");
    bl.classList.add("parent-content");
    let sap = document.createElement("div");
    sap.className = "sap";
    let view = document.createElement("span");
    view.classList.add("material-symbols-outlined");
    view.innerText = "visibility";
    let s = document.createElement("p");
    s.innerText = comArr[i].data;
    let date = document.createElement("span");
    date.innerText = `${comArr[i].debate}`;
    let del = document.createElement("button");
    del.classList.add("pdelete");
    del.innerHTML = ` <span class="material-symbols-outlined">delete</span>`;
    sap.append(view, s, date);
    bl.append(del, sap);
    completedList.append(bl);
    let content = document.createElement("p");
    content.classList.add("content-style");
    view.addEventListener("click", () => {
      content.innerText = comArr[i].data;
      viewData.append(content);
      viewData.style.display = "block";
      let all = document.querySelectorAll(".content-style");
      debugger;
      if ([...all].length > 1) {
        let parent = document.querySelector(".view-container");
        let child = parent.firstElementChild.nextElementSibling;
        parent.removeChild(child);
      }
    });
  }
}

let pardelbtn = document.querySelectorAll(".pdelete");
pardelbtn.forEach((item, index) => {
  item.addEventListener("click", (ev) => {
    ev.target.parentElement.remove();
    comArr.splice(index, 1);
    localStorage.setItem("totalItems", JSON.stringify(comArr));
    window.location.reload();
  });
});
