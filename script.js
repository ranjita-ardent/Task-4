const todoContainer = document.querySelector('#todo-container');
  const form = document.querySelector('.to-do-addbtn');
  const input = document.querySelector('#todo-input');

  // Function to add a new task
  function addTask(event) {
    event.preventDefault();

    const taskText = input.value.trim();

    if (taskText === '') {
      alert("Please enter a task!");
      return;
    }

    // Create new todo item container
    const todoWrapper = document.createElement('div');
    todoWrapper.classList.add('todo-wrapper');

    // Create todo item
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo-item');

    // Radio button
    const radioBtn = document.createElement('input');
    radioBtn.type = 'radio';
    radioBtn.classList.add('todo-radio');
    radioBtn.name = 'radio-btn';

    // Label with task text
    const label = document.createElement('label');
    label.classList.add('todo-label');
    label.textContent = taskText;

    // Trash icon
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-trash', 'todo-delete' , 'fa-solid');

    // Append radio button, label, and trash icon to newTodo
    newTodo.appendChild(radioBtn);
    newTodo.appendChild(label);
    newTodo.appendChild(trashIcon);

    // Create the horizontal line and append to todoWrapper
    const hr = document.createElement('hr');
    todoWrapper.appendChild(newTodo);
    todoWrapper.appendChild(hr);

    // Append todoWrapper to todoContainer
    todoContainer.appendChild(todoWrapper);

    // Clear the input field
    input.value = '';
  }

 
