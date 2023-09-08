import { createTodo } from './createTodo.js';

const root = document.getElementById('root');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

//header
const header = document.createElement('header');
const deleteAllBtn = document.createElement('button');
const deleteLastBtn = document.createElement('button');
const toDoInput = document.createElement('input');
const addBtn = document.createElement('button');
const deleteAllBtnText = document.createTextNode('Delete All');
const deleteLastBtnText = document.createTextNode('Delete Last');
const addBtnText = document.createTextNode('Add');

toDoInput.setAttribute('placeholder', 'Enter todo …');

root.append(header);
header.append(deleteAllBtn, deleteLastBtn, toDoInput, addBtn);
deleteAllBtn.append(deleteAllBtnText);
deleteLastBtn.append(deleteLastBtnText);
addBtn.append(addBtnText);

header.classList.add('header');
deleteAllBtn.classList.add('headerBtn', 'btn');
deleteLastBtn.classList.add('headerBtn', 'btn');
addBtn.classList.add('headerBtn', 'btn');
toDoInput.classList.add('headerInput', 'input');

//filter-search container
const filterSearchContainer = document.createElement('div');
const allTaskCounter = document.createElement('p');
const completedTaskCounter = document.createElement('p');
const showAllBtn = document.createElement('button');
const showCompletedBtn = document.createElement('button');
const searchInput = document.createElement('input');

let allCounter = 0;
let completedCounter = 0;

const allTaskCounterText = document.createTextNode(`All: ${allCounter}`);
const completedTaskCounterText = document.createTextNode(`Completed: ${completedCounter}`);
const showAllBtnText = document.createTextNode('Show All');
const showCompletedBtnText = document.createTextNode('Show Completed');

searchInput.setAttribute('placeholder', 'Search …');

root.append(filterSearchContainer);
filterSearchContainer.append(allTaskCounter, completedTaskCounter, showAllBtn, showCompletedBtn, searchInput);
allTaskCounter.append(allTaskCounterText);
completedTaskCounter.append(completedTaskCounterText);
showAllBtn.append(showAllBtnText);
showCompletedBtn.append(showCompletedBtnText);

filterSearchContainer.classList.add('filterSearch');
showAllBtn.classList.add('filterSearchBtn', 'btn');
showCompletedBtn.classList.add('filterSearchBtn', 'btn');
searchInput.classList.add('filterSearchInput', 'input');

//main to-Do container
const toDoContainer = document.createElement('div');
root.append(toDoContainer);
toDoContainer.classList.add('toDoContainer');

const renderToDo = (todo) => {
    const wrapper = document.createElement('div');
    const checkbox = document.createElement('input');
    const toDoItem = document.createElement('div');
    const btnDataWrapper = document.createElement('div');
    const closeBtn = document.createElement('button');
    const dateInfo = document.createElement('div');

    const toDoItemText = todo.title;
    const currentDate = todo.date;
    checkbox.checked = todo.checked;

    const closeBtnText = document.createTextNode('X');

    wrapper.setAttribute('data-todoid', todo.id);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-checked', 'checked');
    closeBtn.setAttribute('data-name', 'closeToDo');

    wrapper.append(checkbox, toDoItem, btnDataWrapper);
    btnDataWrapper.append(closeBtn, dateInfo);
    toDoItem.append(toDoItemText);
    closeBtn.append(closeBtnText);
    dateInfo.append(currentDate);

    wrapper.classList.add('wrapper');
    checkbox.classList.add('checkbox');
    toDoItem.classList.add('toDoItem');
    btnDataWrapper.classList.add('btnDataWrapper');
    closeBtn.classList.add('closeBtn', 'btn');
    dateInfo.classList.add('dateInfo');

    if (todo.checked) {
        toDoItem.classList.add('checked');
        wrapper.classList.add('colored');
    }

    toDoContainer.append(wrapper);

    const handleBtnCompleteToDo = (event) => {
        const todoId = event.currentTarget.dataset.todoid;
        const todo = todos.find(todo => +todo.id === +todoId);
        const checkbox = event.currentTarget.querySelector('.checkbox');

        if (todo) {
            todo.checked = !todo.checked;
            updateLocalStorage();
        }

        checkbox.checked = todo.checked;

        event.currentTarget.classList.toggle('colored');
        event.currentTarget.querySelector('.toDoItem').classList.toggle('checked');
    }

    const handleBtnCloseToDo = (event) => {
        if (event.target.dataset.name === 'closeToDo') {
            event.currentTarget.remove();
            const todoId = event.currentTarget.dataset.todoid;
            todos = todos.filter(todo => +todo.id !== +todoId);
            updateLocalStorage();
        }
    }

    wrapper.addEventListener('click', handleBtnCloseToDo);
    wrapper.addEventListener('click', handleBtnCompleteToDo);
}

const updateLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
    updateCounters();
}

const updateCounters = () => {
    allCounter = todos.length;
    completedCounter = todos.filter(todo => todo.checked).length;

    allTaskCounter.textContent = `All: ${allCounter}`;
    completedTaskCounter.textContent = `Completed: ${completedCounter}`;
}

//add events for btn
const handleBtnDeleteAll = (event) => {
    todos.length = 0;
    updateLocalStorage();
    updateCounters();
    toDoContainer.innerHTML = '';
};

const handleBtnDeleteLast = (event) => {
    todos.pop();
    updateLocalStorage();
    updateCounters();
    if (toDoContainer.lastChild === null) return;
    else toDoContainer.lastChild.remove();
};

const handleAddToDo = () => {
    const title = toDoInput.value;
    toDoInput.value = '';

    const todo = createTodo(title, todos, updateLocalStorage);

    if (!todo) return;
    renderToDo(todo);
}

const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(searchQuery));
    toDoContainer.innerHTML = '';
    filteredTodos.forEach(renderToDo);
};

const handleShowAll = () => {
    toDoContainer.innerHTML = '';
    todos.forEach(renderToDo);
}

const handleShowCompleted = () => {
    const filteredTodos = todos.filter(todo => todo.checked);
    toDoContainer.innerHTML = '';
    filteredTodos.forEach(renderToDo);
}

if (todos.length) {
    todos.forEach(renderToDo);
}

updateCounters();

addBtn.addEventListener('click', handleAddToDo);
deleteAllBtn.addEventListener('click', handleBtnDeleteAll);
deleteLastBtn.addEventListener('click', handleBtnDeleteLast);
searchInput.addEventListener('input', handleSearch);
showAllBtn.addEventListener('click', handleShowAll);
showCompletedBtn.addEventListener('click', handleShowCompleted);








