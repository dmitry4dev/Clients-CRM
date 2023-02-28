export function createErrorMsg(dataState, text) {
  const errMsg = document.createElement('span');
  errMsg.classList.add('form__error-text');
  errMsg.dataset.state = dataState;
  errMsg.textContent = text;

  return errMsg;
}
