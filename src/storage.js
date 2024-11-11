export const LOCAL_STORAGE_LIST_KEY = 'task.lists';
export const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';

export let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let _selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

export function getSelectedListId() {
  return _selectedListId;
}

export function setSelectedListId(id) {
  _selectedListId = id;
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, id);
}

export function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, _selectedListId);
}

export function updateStorage(newLists) {
  lists.length = 0;             // Clear array in place
  lists.push(...newLists);       // Spread operator to add new items
  save();
}
