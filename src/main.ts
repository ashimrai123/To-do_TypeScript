interface Task {
  text: string;
  completed: boolean;
}

let tasks: Task[] = [];
// --------------------------------------------------------------------------------------------------------------//
// ---------------------------------------------- ADD TASK ------------------------------------------------------//
// --------------------------------------------------------------------------------------------------------------//
function addTask() {
  const newTaskInput = document.getElementById("newTask") as HTMLInputElement;
  const newTaskText = newTaskInput.value.trim();

  if (newTaskText !== "") {
    tasks.push({ text: newTaskText, completed: false });
    displayTasks();
    newTaskInput.value = "";
  }
}

//--------------------------- Event listener for the "Add Task" button -------------------------------------//
const addTaskButton = document.getElementById('addTaskButton');
if (addTaskButton) {
  addTaskButton.addEventListener('click', addTask);
}

// ----------------------------------------------ENTER KEY ------------------------------------------------------//
document.getElementById("newTask")?.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// --------------------------------------------------------------------------------------------------------------//
// ----------------------------------------------COMPLETED TASK ------------------------------------------------------//
// --------------------------------------------------------------------------------------------------------------//

function toggleComplete(index: number, event:Event) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
  event.stopPropagation(); // Prevents the click event from propagating to the label

}

// --------------------------------------------------------------------------------------------------------------//
// ----------------------------------------------DISPLAY TASK ------------------------------------------------------//
// --------------------------------------------------------------------------------------------------------------//
function displayTasks(taskArray: Task[] = tasks) {
  const taskList = document.getElementById("taskList");
  if (taskList) {
    taskList.innerHTML = "";

    if (taskArray.length === 0) {
      const message = document.createElement("li");
      message.textContent = "No tasks found.";
      taskList.appendChild(message);
      return;
    }

    taskArray.forEach((task, index) => {
      const listItem = document.createElement("li");
      const label = document.createElement("label");
      label.className = task.completed ? 'completed' : '';

      label.innerHTML = `
      <div class = "listedItem">${task.text}
      <span class="checkmark"></span></div>
      `;

      
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checkboxBox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", (event) => toggleComplete(index, event));

      label.insertBefore(checkbox, label.firstChild);
      listItem.appendChild(label);
      taskList.appendChild(listItem);
    });
  }
}

// --------------------------------------------------------------------------------------------------------------//
// ------------------------------------------------SEARCH--------------------------------------------------------//
// --------------------------------------------------------------------------------------------------------------//

function searchTask() {
  const searchInput = document.getElementById("searchInput") as HTMLInputElement;
  const searchText = searchInput.value.trim().toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    return task.text.toLowerCase().includes(searchText);
  });

  displayTasks(filteredTasks);
}


//--------------------------- Event listener for search input -------------------------------------//
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', searchTask);
}


// --------------------------------------------------------------------------------------------------------------//
// --------------------------------------------NAV BUTTONS--------------------------------------------------------//
// --------------------------------------------------------------------------------------------------------------//


// --------------------------------------------Name Nav--------------------------------------------------------//

document.getElementById("faireNav")?.addEventListener("click", function () {
  displayTasks(tasks);
});

// --------------------------------------------Completed Nav--------------------------------------------------------//
document.getElementById("completedNav")?.addEventListener("click", function () {
  const completedTasks = tasks.filter((task) => task.completed);
  displayTasks(completedTasks);
});

// -----------------------------------------Remaining Nav--------------------------------------------------------//
document.getElementById("remainingNav")?.addEventListener("click", function () {
  const remainingTasks = tasks.filter((task) => !task.completed);
  displayTasks(remainingTasks);
});

// -----------------------------------------Home Nav--------------------------------------------------------//
document.getElementById("homeNav")?.addEventListener("click", function () {
  displayTasks(tasks);
});

var navItems = document.querySelectorAll(".headingTop__nav li");

navItems.forEach(function (item) {
  item.addEventListener("click", function () {
    navItems.forEach(function (navItem) {
      (navItem as HTMLElement).style.color = "#fff";
    });

    (item as HTMLElement).style.color = "#4499cc";
  });
});
