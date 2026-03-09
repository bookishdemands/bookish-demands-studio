const STORAGE_KEY_PRESETS = "bookish_demands_presets_v1";

export function loadPresets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRESETS);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch (error) {
    return {};
  }
}

export function savePresets(presets = {}) {
  localStorage.setItem(STORAGE_KEY_PRESETS, JSON.stringify(presets));
}

export function savePreset(name, data, presets = {}) {
  const next = { ...presets, [name]: data };
  savePresets(next);
  return next;
}

export function deletePreset(name, presets = {}) {
  const next = { ...presets };
  delete next[name];
  savePresets(next);
  return next;
}
