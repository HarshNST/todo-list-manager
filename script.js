const todoContainer = document.getElementById("todoContainer");
const loadingMessage = document.getElementById("loading");
const errorMessage = document.getElementById("error");

async function fetchTodos() {
  try {
    loadingMessage.style.display = "block";
    errorMessage.textContent = "";
    todoContainer.innerHTML = "";

    const response = await fetch("https://dummyjson.com/todos?limit=12");

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await response.json();
    const todos = data.todos;

    displayTodos(todos);
  } catch (error) {
    console.error("Fetch Error:", error);
    errorMessage.textContent = "Something went wrong while fetching tasks.";
  } finally {
    loadingMessage.style.display = "none";
  }
}

function displayTodos(todos) {
  todos.forEach((todo) => {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");

    if (todo.completed) {
      todoCard.classList.add("completed");
    } else {
      todoCard.classList.add("pending");
    }

    todoCard.innerHTML = `
      <h3 class="todo-title">${todo.todo}</h3>
      <p class="todo-id">Task ID: ${todo.id}</p>
      <p class="todo-status">Status: ${todo.completed ? "Completed ✅" : "Pending ⏳"}</p>
    `;

    todoContainer.appendChild(todoCard);
  });
}

fetchTodos();