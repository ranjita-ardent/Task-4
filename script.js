 // Select the "Personal" and "Professional" elements
 const personal = document.querySelector('.personal');
 const professional = document.querySelector('.Professional');

 // Select elements related to to-do section
 const todoAddSection = document.querySelector('.to-do-addbtn-txtField');
 const todoContainerCloseItem = document.querySelector('.todo-container-close-item');
 const todoContainer = document.querySelector('#todo-container');

 // Form and input
 const form = document.querySelector('.to-do-addbtn-txtField');
 const input = document.querySelector('#todo-input');

 // Set default active class to Personal
 personal.classList.add('active');

 // Set a flag for the current section
 let currentSection = 'personal'; // Default is Personal

 // Add event listener to "Personal"
 personal.addEventListener('click', function() {
   personal.classList.add('active');
   professional.classList.remove('active');

   currentSection = 'personal';
   loadTodos(currentSection); // Load saved todos when switching to Personal

   todoContainer.style.display = 'none'; // Ensure todo container is hidden initially
   todoContainerCloseItem.style.display = 'none'; // Ensure close item is hidden initially
   if (JSON.parse(localStorage.getItem(currentSection)).length > 0) {
     todoContainer.style.display = 'block'; // Show todo container if there are tasks
     todoContainerCloseItem.style.display = 'block'; // Show close item
   }
 });

 // Add event listener to "Professional"
 professional.addEventListener('click', function() {
   professional.classList.add('active');
   personal.classList.remove('active');

   currentSection = 'professional';
   loadTodos(currentSection); // Load saved todos when switching to Professional

   todoContainer.style.display = 'none'; // Ensure todo container is hidden initially
   todoContainerCloseItem.style.display = 'none'; // Ensure close item is hidden initially
   if (JSON.parse(localStorage.getItem(currentSection)).length > 0) {
     todoContainer.style.display = 'block'; // Show todo container if there are tasks
     todoContainerCloseItem.style.display = 'block'; // Show close item
   }
 });

 // Function to add a new task
 function addTask(event) {
   event.preventDefault();

   const taskText = input.value.trim();

   if (taskText === '') {
     alert("Please enter a task!");
     return;
   }

   const todos = JSON.parse(localStorage.getItem(currentSection)) || [];
   todos.push(taskText);

   localStorage.setItem(currentSection, JSON.stringify(todos));
   loadTodos(currentSection);

   input.value = ''; // Clear the input field
 }

 // Event listener for form submission to add task
 form.addEventListener('submit', addTask);

 // Load todos from localStorage based on the current section
 function loadTodos(section) {
   const todos = JSON.parse(localStorage.getItem(section)) || [];
   todoContainer.innerHTML = ''; // Clear the container

   if (todos.length > 0) {
     todoContainer.style.display = 'block'; // Show todo container if there are tasks
     todoContainerCloseItem.style.display = 'block'; // Show close item
   } else {
     todoContainer.style.display = 'none'; // Hide todo container if no tasks
     todoContainerCloseItem.style.display = 'none'; // Hide close item
   }

   todos.forEach(function(taskText) {
     const todoWrapper = document.createElement('div');
     todoWrapper.classList.add('todo-wrapper');

     const newTodo = document.createElement('div');
     newTodo.classList.add('todo-item');

     const radioBtn = document.createElement('input');
     radioBtn.type = 'radio';
     radioBtn.classList.add('todo-radio');
     radioBtn.name = 'radio-btn';

     const label = document.createElement('label');
     label.classList.add('todo-label');
     label.textContent = taskText;

     const trashIcon = document.createElement('i');
     trashIcon.classList.add('fa-trash', 'todo-delete', 'fa-solid');

     newTodo.appendChild(radioBtn);
     newTodo.appendChild(label);
     newTodo.appendChild(trashIcon);

     const hr = document.createElement('hr');
     todoWrapper.appendChild(newTodo);
     todoWrapper.appendChild(hr);

     todoContainer.appendChild(todoWrapper);
   });
 }

 // Event for delete (radio button & delete icon)
 todoContainer.addEventListener('click', function(e) {
   if (e.target.classList.contains('todo-radio') || e.target.classList.contains('todo-label')) {
     const todoItem = e.target.closest('.todo-item');
     const label = todoItem.querySelector('.todo-label');
     const radioBtn = todoItem.querySelector('.todo-radio');

     label.classList.toggle('checked');
     radioBtn.classList.toggle('checked');
   }

   if (e.target.classList.contains('todo-delete') || e.target.closest('.todo-delete')) {
     const todoWrapper = e.target.closest('.todo-wrapper');
     const label = todoWrapper.querySelector('.todo-label');

     let todos = JSON.parse(localStorage.getItem(currentSection)) || [];
     todos = todos.filter(taskText => taskText !== label.textContent);

     localStorage.setItem(currentSection, JSON.stringify(todos));
     todoWrapper.remove();
   }
 });

 // Initialize by loading the todos from the "Personal" section by default
 loadTodos('personal');


 // Selected the "Clear Completed" button (close item)
const clearCompletedButton = document.querySelector('.close-item');

// Added an event listener for clicking the "Clear Completed" button
clearCompletedButton.addEventListener('click', function() {
  // Get all the to-do items (elements) in the UI
  const todoItems = todoContainer.querySelectorAll('.todo-item');

  // Loop through each to-do item and remove them from both the UI and localStorage
  todoItems.forEach(todoItem => {
    // Remove the task from the UI
    todoItem.closest('.todo-wrapper').remove();
  });

  // Clear all tasks from localStorage for the current section (Personal or Professional)
  localStorage.setItem(currentSection, JSON.stringify([])); 
});
