export function onClose(element) {
  history.pushState(null, null, '/');
  element.remove();
}
