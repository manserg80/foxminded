"use strict";

const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.getElementById("task-name-input");
  createItem(item);
});

document.getElementById("task-name-input").addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    const item = document.getElementById("task-name-input");
    createItem(item);
  }
});

function displayDate(){
  let date = new Date();
  date = date.toString().split(" ");
  date = date[1] + " " + date[2] + " " + date[3];
  document.getElementById("date").innerHTML = date;
}

function displayItems(){
  const items = itemsArray.filter(item => item.trim().length > 0).map(item => {
      return `<div class="item">
        <div class="input-controller">
          <textarea disabled>${item}</textarea>
          <div class="edit-controller">
            <i class="fa-solid fa-check deleteBtn"></i>
            <i class="fa-solid fa-pen-to-square editBtn"></i>
          </div>
        </div>
        <div class="update-controller">
          <button class="saveBtn">Save</button>
          <button class="cancelBtn">Cancel</button>
        </div>
      </div>`;
    });
  document.querySelector(".to-do-list").innerHTML = items.join("");
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
}

function activateDeleteListeners(){
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  [...deleteBtn].map((dB, i) =>  {
    dB.addEventListener("click", () => { deleteItem(i); });
  });
}

function activateEditListeners(){
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  [...editBtn].map((eB, i) => {
    eB.addEventListener("click", () => { 
      updateController[i].style.display = "block";
      inputs[i].disabled = false });
  });
}

function activateSaveListeners(){
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  [...saveBtn].map((sB, i) => {
    sB.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
}

function activateCancelListeners(){
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  [...cancelBtn].map((cB, i) => {
    cB.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
      inputs[i].style.border = "none";
    });
  });
}

function createItem(item){
  itemsArray.push(item.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload();
}

function deleteItem(i){
  itemsArray.splice(i,1);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload();
}

function updateItem(text, i){
  itemsArray[i] = text
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload();
}

window.onload = function() {
  displayDate();
  displayItems();
};