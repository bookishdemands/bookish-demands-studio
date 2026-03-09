const STORAGE_KEY_PRESETS = "bookish_demands_presets_v1";

export function loadPresets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRESETS);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

export function savePresetsMap(presets = {}) {
  try {
    localStorage.setItem(STORAGE_KEY_PRESETS, JSON.stringify(presets));
  } catch {
    alert("Storage unavailable in this browser mode.");
  }
}

export function savePreset(name, data, presets = loadPresets()) {
  const next = { ...presets, [name]: { version: 1, data } };
  savePresetsMap(next);
  return next;
}

export function deletePreset(name, presets = loadPresets()) {
  const next = { ...presets };
  delete next[name];
  savePresetsMap(next);
  return next;
}
