import "./style.css";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from "dat.gui";

//to do list

const btn = document.querySelector(".btn");
const myInput = document.querySelector(".myInput");

const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

function createItem(myInput) {
  if (!myInput.value) {
    return;
  }
  itemsArray.push(myInput.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}
btn.addEventListener("click", () => {
  createItem(myInput);
});
document.addEventListener("keydow", (e) => {
  console.log(e.key);
  if ((e.key = "Enter")) {
    createItem(myInput);
  }
});

function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += `<div class="item">
    <div class="input-controller">
      <textarea class="text" disabled autofocus  type='text' style='height:fit-content'>${itemsArray[i]}</textarea>
      </div>
    <div class="edit-controller">
      <i class="delete-button"></i>
      <i class="edit-button"></i>
    </div>
    <div class="update-controller active">
      <i class="submit-button"></i>
    </div>
  </div>
</div>`;
  }
  document.querySelector(".to-do-container").innerHTML = items;
  activateDeleteListeners();
  activateEditListeners();
  activateSubmitListeners();
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".delete-button");
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => deleteItem(i));
  });
}
function activateEditListeners() {
  const editBtn = document.querySelectorAll(".edit-button");
  const editController = document.querySelectorAll(".edit-controller");
  const updateController = document.querySelectorAll(".update-controller");
  const text = document.querySelectorAll(".text");
  editBtn.forEach((eb, i) =>
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block";
      editController[i].style.display = "none";
      text[i].disabled = false;
      //move the cursor to the end
      const end = text[i].value.length;
      text[i].setSelectionRange(end, end);
      text[i].focus();
      text[i].addEventListener("input", autoResize);
    })
  );
}

function autoResize() {
  this.style.height = "auto";
  let size = this.scrollHeight + "px";
  this.style.height = size;
}

function activateSubmitListeners() {
  const submitBtn = document.querySelectorAll(".submit-button");
  const text = document.querySelectorAll(".text");
  submitBtn.forEach((sb, i) =>
    sb.addEventListener("click", () => {
      updateItem(text[i].value, i);
    })
  );
}

function updateItem(text, i) {
  itemsArray[i] = text;

  localStorage.setItem("items", JSON.stringify(itemsArray));

  location.reload();
}
function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

//DATA
const headerDataData = document.querySelector(".header-data-data");
const headerDataTime = document.querySelector(".header-data-time");

function getCurrentTime() {
  const now = new Date();
  const day = now.getDate();
  const currentMonth = now.toLocaleString("en-US", { month: "long" });

  const year = now.getFullYear();
  let hours = now.getHours();
  hours = formatTime(hours);
  let minutes = now.getMinutes();

  headerDataData.textContent = `${currentMonth} ${day} ,${year}`;
  headerDataTime.textContent = `${hours}:${minutes}`;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

window.onload = function () {
  getCurrentTime();
  displayItems();
};

// const addItem = function () {
//   if (!myInput.value) {
//     return;
//   }
//   let list = document.createElement("li");
//   list.classList.add("list");
//   myUL.appendChild(list);
//   //Div
//   const firstDiv = document.createElement("div");
//   firstDiv.classList.add("firstDiv");
//   list.appendChild(firstDiv);

//   const secondDiv = document.createElement("div");
//   secondDiv.classList.add("secondDiv");
//   list.appendChild(secondDiv);

//   //Add Item
//   const text = document.createElement("span");
//   text.classList.add("item-name");
//   text.textContent = myInput.value;
//   itemsArray.push(text.textContent);
//   localStorage.setItem("items", JSON.stringify(itemsArray));
//   location.reload();
//   firstDiv.appendChild(text);

//   //Add Edit & delete buttons
//   const deleteBtn = document.createElement("i");
//   deleteBtn.classList.add("button-delete");
//   secondDiv.appendChild(deleteBtn);
//   deleteBtn.addEventListener("click", btnDelete);

//   const editBtn = document.createElement("i");
//   editBtn.classList.add("button-edit");
//   secondDiv.appendChild(editBtn);
//   editBtn.addEventListener("click", btnEdit);

//   //Clear Input
//   myInput.value = "";

// };
// btn.addEventListener("click", addItem);
//Delete btn

// const btnDelete = function () {
//   this.parentNode.parentElement.remove();
// };

// //Edit btn
// const btnEdit = function () {
//   const EditText =
//     this.parentElement.previousSibling.lastElementChild.textContent;
//   this.parentElement.previousSibling.remove();
//   this.parentElement.remove();
//   const l = document.querySelectorAll(".list");
//   let i = document.createElement("input");
//   i.classList.add("myInput");
//   i.value = EditText;
//   l.forEach((a) => a.appendChild(i));

//   // Submit BTN
//   let bttn = document.createElement("i");
//   bttn.classList.add("button-submit");
//   l.forEach((c) => c.appendChild(bttn));
//   bttn.addEventListener("click", btnSubmit);
// };

// Submit;

// const btnSubmit = function () {
//   const submitValue = this.previousSibling.value;

//   this.parentNode.innerHTML = "";

//   let list = document.querySelectorAll(".list");
//   //Div
//   const firstDiv = document.createElement("div");
//   firstDiv.classList.add("firstDiv");
//   // list.appendChild(firstDiv);

//   const secondDiv = document.createElement("div");
//   secondDiv.classList.add("secondDiv");
//   // list.appendChild(secondDiv);

//   list.forEach((a) => a.appendChild(firstDiv));

//   text.textContent = submitValue;
//   firstDiv.appendChild(text);
//   secondDiv.appendChild(deleteBtn);
//   secondDiv.appendChild(editBtn);
// };
