const todoContainer = document.getElementById("todoContainer");
const loadingMessage = document.getElementById("loading");
const errorMessage = document.getElementById("error");

let allTodos = [];

async function fetchTodos() {
  try {
    loadingMessage.style.display = "block";
    errorMessage.textContent = "";
    todoContainer.innerHTML = "";

    const response = await fetch("https://dummyjson.com/todos");

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await response.json();
    allTodos = data.todos;

    displayTodos(allTodos);
  } catch (error) {
    console.log(error);
    errorMessage.textContent = "Error fetching data";
  } finally {
    loadingMessage.style.display = "none";
  }
}

function displayTodos(todos) {
  todoContainer.innerHTML = "";

  todos.forEach((todo) => {
    const card = document.createElement("div");
    card.classList.add("todo-card");

    if (todo.completed) {
      card.classList.add("completed");
    } else {
      card.classList.add("pending");
    }

    card.innerHTML = `
      <h3>${todo.todo}</h3>
      <p>Task ID: ${todo.id}</p>
      <p>${todo.completed ? "Completed ✅" : "Pending ⏳"}</p>
    `;

    todoContainer.appendChild(card);
  });
}

function searchTodos(text) {
  const result = allTodos.filter((todo) =>
    todo.todo.toLowerCase().includes(text.toLowerCase())
  );

  displayTodos(result);
}

function filterTodos(type) {
  let result = [];

  if (type === "completed") {
    result = allTodos.filter((todo) => todo.completed);
  } else if (type === "pending") {
    result = allTodos.filter((todo) => !todo.completed);
  } else {
    result = allTodos;
  }

  displayTodos(result);
}

function sortTodos() {
  const sorted = [...allTodos].sort((a, b) => a.id - b.id);
  displayTodos(sorted);
}

fetchTodos();