const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');
const themeToggleBtn = document.getElementById("theme-toggle");

let allTodos = getTodos();
updateTodoList();
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addTodo();
});
function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false
    };
    allTodos.push(todoObject);
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
}
function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}

function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li");
  todoLI.className = "todo";

  todoLI.innerHTML = `
    <input type="checkbox" id="${todoId}">
    <label class="custom-checkbox" for="${todoId}">
      <img src="icons/done.svg" alt="Done" />
    </label>
    <label for="${todoId}" class="todo-text">${todo.text}</label>
    <div class="actions">
      <button class="edit-button">
        <img src="icons/pencil.svg" alt="Edit" />
      </button>
      <button class="delete-button">
        <img src="icons/delete.svg" alt="Delete" />
      </button>
    </div>
  `;

  const checkbox = todoLI.querySelector("input[type='checkbox']");
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  });

  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });

  const editButton = todoLI.querySelector(".edit-button");
  editButton.addEventListener("click", () => {
    const newText = prompt("Edit your task:", allTodos[todoIndex].text);
    if (newText !== null && newText.trim() !== "") {
      allTodos[todoIndex].text = newText.trim();
      saveTodos();
      updateTodoList();
    }
  });

  return todoLI;
}

function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  const todosJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJson);
}
function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  saveTheme();
});

function saveTheme() {
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
}
loadTheme();
function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li");
  todoLI.className = "todo";

  todoLI.innerHTML = `
    <input type="checkbox" id="${todoId}">
    <label class="custom-checkbox" for="${todoId}">
      <img src="icons/done.svg" alt="Done" />
    </label>
    <label for="${todoId}" class="todo-text">${todo.text}</label>
    <div class="actions">
      <button class="edit-button">
        <img src="icons/pencil.svg" alt="Edit" />
      </button>
      <button class="delete-button">
        <img src="icons/delete.svg" alt="Delete" />
      </button>
    </div>
  `;

  const checkbox = todoLI.querySelector("input[type='checkbox']");
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  });

  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });

  const editButton = todoLI.querySelector(".edit-button");
  editButton.addEventListener("click", () => {
    const textLabel = todoLI.querySelector(".todo-text");

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = todo.text;
    inputField.className = "edit-input";
    inputField.setAttribute("aria-label", "Edit task");

    todoLI.replaceChild(inputField, textLabel);
    inputField.focus();

    inputField.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveEdit();
      }
    });

    inputField.addEventListener("blur", () => {
      saveEdit();
    });

    function saveEdit() {
      const updatedText = inputField.value.trim();
      if (updatedText) {
        allTodos[todoIndex].text = updatedText;
      }
      saveTodos();
      updateTodoList();
    }
  });

  return todoLI;
}
