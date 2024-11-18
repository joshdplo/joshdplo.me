/**
 * Seasonal
 */
export function getStorageSeasonal() {
  return localStorage.getItem('seasonal');
};

export function setStorageSeasonal(preference) {
  localStorage.setItem('seasonal', preference);
};