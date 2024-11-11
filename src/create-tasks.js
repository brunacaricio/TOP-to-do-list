import { lists, getSelectedListId, save } from './storage.js';
import { renderLists, listsContainer } from './create-list.js';

const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('task-template');

const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');

const clearCompletedTasksBtn = document.querySelector('[data-clear-completed-task-button]')

clearCompletedTasksBtn.addEventListener('click', (event) => {
  const selectedListId = getSelectedListId();
  const selectedList = lists.find(list => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
  save();
  render();
})

newTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskName = newTaskInput.value;
  if (taskName == null || taskName === '') return;

  const task = createTask(taskName);
  newTaskInput.value = '';

  const selectedListId = getSelectedListId();
  const selectedList = lists.find(list => list.id === selectedListId);
  selectedList.tasks.push(task);
  save();
  render();
})

tasksContainer.addEventListener('click', (event) => {
  if (event.target.tagName.toLowerCase() === 'input') {
    const selectedListId = getSelectedListId();
    const selectedList = lists.find(list => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(task => task.id === event.target.id)
    selectedTask.complete = event.target.checked
    save();
    renderTaskCount(selectedList);
  }
})

function createTask(name) {
  return { id: Date.now().toString(), name: name, complete: false }
}

export function render() {
  listsContainer.innerHTML = '';
  renderLists();

  const selectedListId = getSelectedListId();
  const selectedList = lists.find(list => list.id === selectedListId);

  if (selectedListId == null) {
    listDisplayContainer.style.display = 'none';
  } else {
    listDisplayContainer.style.display = '';
    listTitleElement.innerText = selectedList.name;
    renderTaskCount(selectedList);

    tasksContainer.innerHTML = '';
    renderTasks(selectedList);
  }
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('input');
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector('label');
    label.htmlFor = task.id;
    label.append(task.name);
    tasksContainer.appendChild(taskElement);
  })
}

function renderTaskCount(selectedList) {
  const incompleteTasksCount = selectedList.tasks.filter(task => !task.complete).length;
  const taskString = incompleteTasksCount === 1 ? 'task' : 'tasks';

  listCountElement.innerText = `${incompleteTasksCount} ${taskString} remaining`
}
