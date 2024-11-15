import { lists, getSelectedListId, setSelectedListId, save, updateStorage } from './storage.js';
import { render } from "./create-tasks.js"

export const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
let newListInput = document.querySelector('[data-new-list-input]');
const deleteListBtn = document.querySelector('[data-delete-list-button]');

listsContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    setSelectedListId(e.target.dataset.listId);
    render();
  }
});

newListForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === '') return;

  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  save();
  render();
});

deleteListBtn.addEventListener('click', e => {
  const selectedId = getSelectedListId();
  const updatedLists = lists.filter(list => list.id !== selectedId);
  setSelectedListId(null);
  updateStorage(updatedLists);
  render();
});

export function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] }
}

export function renderLists() {
  listsContainer.innerHTML = '';

  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.classList.add('list-name');
    listElement.dataset.listId = list.id;
    listElement.innerText = list.name;

    const selectedId = getSelectedListId();
    if (list.id === selectedId) {
      listElement.classList.add('active-list');
    }

    listsContainer.appendChild(listElement);
  });

  newListInput.value = '';
};
