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

  // Event listener for form submission to add task
  form.addEventListener('submit', addTask);

  // Event delegation for click actions (radio button & delete icon)
  todoContainer.addEventListener('click', function(e) {
    // Toggle checked status when radio button or label is clicked
    if (e.target.classList.contains('todo-radio') || e.target.classList.contains('todo-label')) {
      const todoItem = e.target.closest('.todo-item');
      const label = todoItem.querySelector('.todo-label');
      const radioBtn = todoItem.querySelector('.todo-radio');

      // Toggle the checked state
      label.classList.toggle('checked');
      radioBtn.classList.toggle('checked');
    }

    // Remove todo item and horizontal line when delete icon is clicked
    if (e.target.classList.contains('todo-delete') || e.target.closest('.todo-delete')) {
      const todoWrapper = e.target.closest('.todo-wrapper');
      todoWrapper.remove(); // Remove the entire wrapper (todo item + hr)
    }
  });
