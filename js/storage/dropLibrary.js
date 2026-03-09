const STORAGE_KEY_DROP_LIBRARY = "bookish_demands_drop_library_v1";

export function loadDropLibrary() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DROP_LIBRARY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

export function saveDropLibraryMap(dropLibrary = {}) {
  try {
    localStorage.setItem(STORAGE_KEY_DROP_LIBRARY, JSON.stringify(dropLibrary));
  } catch {
    alert("Storage unavailable in this browser mode.");
  }
}

export function saveDrop(drop, dropLibrary = loadDropLibrary()) {
  if (!drop?.id) return dropLibrary;
  const next = { ...dropLibrary, [drop.id]: drop };
  saveDropLibraryMap(next);
  return next;
}

export function deleteDrop(dropId, dropLibrary = loadDropLibrary()) {
  const next = { ...dropLibrary };
  delete next[dropId];
  saveDropLibraryMap(next);
  return next;
}
