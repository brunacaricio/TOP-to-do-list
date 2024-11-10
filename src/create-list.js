const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
let newListInput = document.querySelector('[data-new-list-input]');
const deleteListBtn = document.querySelector('[data-delete-list-button]');

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

listsContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId;
    saveList();
    renderLists();
  }
})

newListForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const listName = newListInput.value;

  if (listName == null || listName === '') return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveList();
  renderLists();
});

deleteListBtn.addEventListener('click', e => {
  lists = lists.filter(list => list.id !== selectedListId);
  selectedListId = null;
  saveList();
  renderLists();
})

export function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] }
}

function saveList() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

export function renderLists() {
  listsContainer.innerHTML = '';

  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.classList.add('list-name')
    listElement.dataset.listId = list.id;
    listElement.innerText = list.name;

    if (list.id === selectedListId) {
      listElement.classList.add('active-list')
    }

    listsContainer.appendChild(listElement);
  });

  newListInput.value = '';
};
