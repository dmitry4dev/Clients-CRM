import { onDelete } from './api.js';
import { onClose } from './onClose.js';

export function createDeletePopup(id) {
  const popupContainer = document.createElement('div');
  const popup = document.createElement('div');
  const popupTitle = document.createElement('div');
  const popupText = document.createElement('div');
  const deleteBtn = document.createElement('button');
  const undoBtn = document.createElement('button');
  const closeBtn = document.createElement('button');
  const crossLinesWrapper = document.createElement('div');
  const crossLineFirst = document.createElement('span');
  const crossLineSecond = document.createElement('span');

  popupContainer.classList.add('popup-container');
  popup.classList.add('delete-popup');
  popupTitle.classList.add('delete-popup__title');
  popupText.classList.add('delete-popup__txt');
  deleteBtn.classList.add('form__save-btn');
  undoBtn.classList.add('form__delete-btn');
  closeBtn.classList.add('form__close-btn');
  crossLinesWrapper.classList.add('crossline-wrapper');
  crossLineFirst.classList.add('crossline');
  crossLineSecond.classList.add('crossline');

  popupContainer.style.opacity = 0;

  deleteBtn.type = 'button';
  undoBtn.type = 'button';
  closeBtn.type = 'button';

  popupTitle.textContent = 'Удалить клиента';
  popupText.textContent = 'Вы действительно хотите удалить данного клиента?';
  deleteBtn.textContent = 'Удалить';
  undoBtn.textContent = 'Отмена';

  crossLinesWrapper.append(crossLineFirst, crossLineSecond);
  closeBtn.append(crossLinesWrapper);
  popup.append(closeBtn, popupTitle, popupText, deleteBtn, undoBtn);
  popupContainer.append(popup);

  let opacity = 0;
  let translateY = 0;

  const raf = () => {
    requestAnimationFrame(() => {
      if (opacity < 1) {
        opacity += 0.2;
        translateY += 15;
        popup.style.transform = `translateY(${translateY}%)`;
        popupContainer.style.opacity = opacity.toString();
        raf();
      }
    });
  }
  raf();

  document.body.prepend(popupContainer);

  deleteBtn.addEventListener('click', () => {
    onDelete(id);

    onClose(popupContainer);

    document.querySelectorAll('.table__row').forEach(row => {
      if (row.getAttribute('data-id') === id) {
        row.remove();
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    onClose(popupContainer);
  });

  undoBtn.addEventListener('click', () => {
    onClose(popupContainer);
  });

  popupContainer.addEventListener('click', (e) => {
    if (e.target.closest('.delete-popup')) {
      return;
    } else {
      onClose(popupContainer);
    }
  });

  return popupContainer;
}

