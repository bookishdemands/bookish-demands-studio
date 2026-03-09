const STORAGE_KEY_DROP_LIBRARY = "bookish_demands_drop_library_v1";

export function loadDropLibrary() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DROP_LIBRARY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch (error) {
    return {};
  }
}

export function saveDropLibrary(dropLibrary = {}) {
  localStorage.setItem(STORAGE_KEY_DROP_LIBRARY, JSON.stringify(dropLibrary));
}

export function saveDrop(drop, dropLibrary = {}) {
  if (!drop?.id) return dropLibrary;
  const next = { ...dropLibrary, [drop.id]: drop };
  saveDropLibrary(next);
  return next;
}

export function deleteDrop(dropId, dropLibrary = {}) {
  const next = { ...dropLibrary };
  delete next[dropId];
  saveDropLibrary(next);
  return next;
}
