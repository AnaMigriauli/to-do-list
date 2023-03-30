import "./style.css";
// import "./mixins.css";

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
document.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === "Enter") {
    createItem(myInput);
  }
});
myInput.addEventListener("input", autoResize);
function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += `<div class="item">
    <div class="input-controller">
      <span class="text" disabled autofocus  type='text' style='height:fit-content'>${itemsArray[i]}</span>
      </div>
    <div class="edit-controller">
      <i class="delete-button btnCommon"></i>
      <i class="edit-button btnCommon"></i>
    </div>
    <div class="update-controller active">
      <i class="submit-button btnCommon"></i>
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
  const inputController = document.querySelectorAll(".input-controller");
  editBtn.forEach((eb, i) =>
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block";
      editController[i].style.display = "none";
      text[i].disabled = false;
      const a = text[i].textContent;
      const textA = document.createElement("textarea");
      textA.classList.add("textA");
      text[i].remove();
      inputController[i].appendChild(textA);
      textA.textContent = a;
      // move the cursor to the end
      const end = textA.textContent.length;
      textA.setSelectionRange(end, end);
      textA.focus();
      textA.addEventListener("input", autoResize);
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
  const sp = document.querySelectorAll(".text");
  submitBtn.forEach((sb, i) =>
    sb.addEventListener("click", () => {
      const el =
        sb.parentElement.parentNode.firstElementChild.firstElementChild;

      sb.parentElement.parentNode.firstElementChild.replaceChild(sp[i], el);
      updateItem((sp[i].textContent = el.value), i);
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
  headerDataTime.textContent = now.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  headerDataData.textContent = `${currentMonth} ${day} ,${year}`;
}

window.onload = function () {
  getCurrentTime();
  displayItems();
};
