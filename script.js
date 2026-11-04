const bigContainer = document.querySelector(".big-container");

const button = document.getElementById("generate-button");

const nameInput = document.getElementById("list-name");
const listSize = document.getElementById("list-size");
let shoppingLists = [];

console.log(shoppingLists);
loadLists();
renderLists();

function renderList(list) {
  const ul = document.createElement("ul");
  const shoppingList = document.createElement("div");
  const h2 = document.createElement("h2");

  h2.innerText = list.name;

  shoppingList.appendChild(h2);

  for (const item of list.items) {
    const li = document.createElement("li");
    const inputText = document.createElement("input");
    const inputCheck = document.createElement("input");

    inputText.type = "text";
    inputText.value = item.name;
    inputText.addEventListener("input", () => {
      item.name = inputText.value;
      saveLists();
    });

    inputCheck.type = "checkbox";
    inputCheck.checked = item.checked;
    if (inputCheck.checked) {
      inputText.classList.add("checked");
    }
    inputCheck.addEventListener("change", () => {
      item.checked = inputCheck.checked;
      if (item.checked) {
        inputText.classList.add("checked");
      } else {
        inputText.classList.remove("checked");
      }
      saveLists();
    });
    li.appendChild(inputText);
    li.prepend(inputCheck);
    ul.appendChild(li);
  }
  shoppingList.appendChild(ul);
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "🗑️ Fjern";
  deleteButton.addEventListener("click", () => {
    const index = shoppingLists.indexOf(list);
    if (index !== -1) {
      shoppingLists.splice(index, 1);
    }
    saveLists();
    renderLists();
  });
  shoppingList.appendChild(deleteButton);
  shoppingList.classList.add("shopping-list");
  bigContainer.appendChild(shoppingList);
}
function renderLists() {
  bigContainer.innerHTML = "";
  if (shoppingLists) {
    for (const list of shoppingLists) {
      renderList(list);
    }
  }
}

button.addEventListener("click", () => {
  generateNewList(nameInput.value, listSize.value);
  renderLists();
});

function generateNewList(name, size) {
  const newList = {
    name: name,
    items: [],
  };
  for (let i = 0; i < size; i++) {
    newList.items.push({ name: "", checked: false });
  }
  shoppingLists.push(newList);
  saveLists();
}

function saveLists() {
  localStorage.setItem("shoppingLists", JSON.stringify(shoppingLists));
}
function loadLists() {
  const lists = localStorage.getItem("shoppingLists");
  if (lists) {
    shoppingLists = JSON.parse(lists);
  }
}
