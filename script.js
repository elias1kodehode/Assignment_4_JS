const bigContainer = document.querySelector(".big-container");
const rowsInput = document.getElementById("rows");
const columnsInput = document.getElementById("columns");
const button = document.getElementById("generate-button");
const shoppingListContainer = document.getElementById("shopping-list");
const squareSize = 30;
const nameInput = document.getElementById("list-name");
const listSize = document.getElementById("list-size");
const shoppingLists = [];

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
    });
    li.appendChild(inputText);
    inputCheck.type = "checkbox";
    inputCheck.checked = item.checked;
    inputCheck.addEventListener("change", () => {
      item.checked = inputCheck.checked;
      if (item.checked) {
        inputText.style.textDecoration = "line-through";
      } else {
        inputText.style.textDecoration = "none";
      }
    });
    li.appendChild(inputCheck);
    ul.appendChild(li);
  }
  shoppingList.appendChild(ul);
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete list";
  deleteButton.addEventListener("click", () => {
    const index = shoppingLists.indexOf(list);
    if (index !== -1) {
      shoppingLists.splice(index, 1);
    }
    renderLists();
  });
  shoppingList.appendChild(deleteButton);
  shoppingList.classList.add("shopping-list");
  bigContainer.appendChild(shoppingList);
}
function renderLists() {
  bigContainer.innerHTML = "";
  for (const list of shoppingLists) {
    renderList(list);
  }
}

const lists = [
  { "list one": { "item 1": false, "item 2": false, "item 3": true } },
  { "list two": { "item 1": true } },
];

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
}
