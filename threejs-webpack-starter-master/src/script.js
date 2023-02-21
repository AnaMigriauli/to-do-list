import "./style.css";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from "dat.gui";

//to do list

const btn = document.querySelector(".btn");
const myInput = document.querySelector(".myInput");
const myUL = document.getElementById("myUL");

const addItem = function () {
  if (myInput.value.length > 0) {
    //Add Item
    const list = document.createElement("li");
    list.textContent = myInput.value;
    myUL.appendChild(list);

    //Add Edit & delete buttons
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("button-delete");
    list.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("button-edit");
    // editBtn.textContent = "Edit";
    list.appendChild(editBtn);

    //Clear Input
    myInput.value = "";

    //Delete btn
    const close = document.querySelectorAll(".button-delete");
    const btnDelete = function () {
      let s = this.parentElement.remove();
    };
    close.forEach((a) => a.addEventListener("click", btnDelete));

    //Edit btn
    const btnEdit = function () {
      const EditText = this.previousSibling.previousSibling.textContent;
      this.parentNode.innerHTML = "";
      let i = document.createElement("input");
      list.appendChild(i);
      i.value = EditText;
      //Submit BTN
      let bttn = document.createElement("button");
      bttn.classList.add("button-submit");
      bttn.textContent = "Submit";
      list.appendChild(bttn);
      // Submit;

      const btnSubmit = function () {
        const submitValue = this.previousSibling.value;
        this.parentNode.innerHTML = "";
        list.textContent = submitValue;
        list.appendChild(deleteBtn);

        list.appendChild(editBtn);
      };
      bttn.addEventListener("click", btnSubmit);
    };
    editBtn.addEventListener("click", btnEdit);
  } else {
    alert("You must write something!");
  }
};
btn.addEventListener("click", addItem);

const hederData = document.querySelector(".heder-data");
const headerDataData = document.querySelector(".header-data-data");
const headerTime = document.querySelector(".header-time");
const headerDataTime = document.querySelector(".header-data-time");

function getCurrentTime() {
  const now = new Date();
  const day = now.getDate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = now.getMonth();
  const month = months[currentMonth];
  const year = now.getFullYear();
  let hours = now.getHours();
  hours = formatTime(hours);
  let minutes = now.getMinutes();
  return { day, month, year, hours, minutes };
}

getCurrentTime();

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

console.log(new Date().toLocaleString("en-US", { month: "long" }));
console.log(new Date().toLocaleString("en-US", { day: "numeric" }));
console.log(new Date().getFullYear());
