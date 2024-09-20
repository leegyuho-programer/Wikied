export default function removeStore() {
  if (!window) return;

  window.localStorage.removeItem('store');
}
