import { onSave, onDelete } from './api.js';
import { tableRender } from './tableRender.js';
import { createContactsBlock } from './createContactsBlock.js';
import { checkInputs } from './checkInputs.js';
import { onClose } from './onClose.js';

export function createPopup(client, id) {
  const popupContainer = document.createElement('div');
  const popup = document.createElement('div');
  const form = document.createElement('form');
  const formTitle = document.createElement('div');
  const surnameLabel = document.createElement('label');
  const nameLabel = document.createElement('label');
  const middlenameLabel = document.createElement('label');
  const surnameInput = document.createElement('input');
  const nameInput = document.createElement('input');
  const middlenameInput = document.createElement('input');
  const contactsWrapper = document.createElement('div');
  const errContainer = document.createElement('div');
  const addBtn = document.createElement('button');
  const saveBtn = document.createElement('button');
  const undoBtn = document.createElement('button');
  const closeBtn = document.createElement('button');
  const crossLinesWrapper = document.createElement('div');
  const crossLineFirst = document.createElement('span');
  const crossLineSecond = document.createElement('span');
  const url = new URL(location.href);

  popupContainer.classList.add('popup-container');
  popup.classList.add('popup');
  form.classList.add('popup__form', 'form');
  formTitle.classList.add('form__title');
  surnameLabel.classList.add('form__label');
  nameLabel.classList.add('form__label');
  middlenameLabel.classList.add('form__label');
  surnameInput.classList.add('form__input');
  nameInput.classList.add('form__input');
  middlenameInput.classList.add('form__input');
  contactsWrapper.classList.add('form__contacts');
  errContainer.classList.add('form__err-container');
  addBtn.classList.add('form__add-btn');
  saveBtn.classList.add('form__save-btn');
  undoBtn.classList.add('form__delete-btn');
  closeBtn.classList.add('form__close-btn');
  crossLinesWrapper.classList.add('crossline-wrapper');
  crossLineFirst.classList.add('crossline');
  crossLineSecond.classList.add('crossline');

  popupContainer.style.opacity = 0;

  surnameLabel.for = 'surname';
  nameLabel.for = 'name';
  middlenameLabel.for = 'middlename';
  surnameInput.name = 'surname';
  nameInput.name = 'name';
  middlenameInput.name = 'middlename';
  addBtn.type = 'button';
  saveBtn.type = 'submit';
  undoBtn.type = 'button';
  closeBtn.type = 'button';

  if (client) {
    const formTitleId = document.createElement('span');
    formTitleId.classList.add('form__title-id');
    formTitleId.textContent = `ID: ${client.id.substring(0, 7)}`;

    url.hash = client.id;
    location.href = url;

    formTitle.append('Изменить данные', formTitleId);
    surnameInput.value = client.surname;
    nameInput.value = client.name;
    middlenameInput.value = client.lastName;

    createContactsBlock(contactsWrapper, client);
  } else {
    formTitle.textContent = 'Новый клиент';
  }



  surnameLabel.textContent = 'Фамилия';
  nameLabel.textContent = 'Имя';
  middlenameLabel.textContent = 'Отчество';
  addBtn.textContent = 'Добавить контакт';
  saveBtn.textContent = 'Сохранить';
  undoBtn.textContent = client ? 'Удалить клиента' : 'Отмена';

  crossLinesWrapper.append(crossLineFirst, crossLineSecond);
  closeBtn.append(crossLinesWrapper);
  contactsWrapper.append(addBtn);

  form.append(
    closeBtn,
    formTitle,
    surnameLabel,
    surnameInput,
    nameLabel,
    nameInput,
    middlenameLabel,
    middlenameInput,
    contactsWrapper,
    errContainer,
    saveBtn,
    undoBtn
  )

  popup.append(form);
  popupContainer.append(popup);

  let opacity = 0;
  let translateY = 0;

  const raf = () => {
    requestAnimationFrame(() => {
      if (opacity < 1) {
        opacity += 0.2;
        translateY += 3;
        popup.style.transform = `translateY(${translateY}%)`;
        popupContainer.style.opacity = opacity.toString();
        raf();
      }
    });
  }
  raf();

  document.body.prepend(popupContainer);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    history.pushState(null, null, '/');

    if (checkInputs(errContainer)) {
      const formData = new FormData(form);
      const formObject = {
        contacts: [],
      };

      if (formData.getAll('contact-types').length > 0) {
        for (let i = 0; i <= formData.getAll('contact-types').length - 1; ++i) {
          const contact = {
            type: formData.getAll('contact-types')[i],
            value: formData.getAll('contact-types')[i] === 'Телефон' ?
                   formData.getAll('contact-info')[i].replace(/[^0-9+]/g, '') :
                   formData.getAll('contact-info')[i].trim(),
          };
          formObject.contacts.push(contact);
        }
      }

      formData.forEach(function(value, key) {
        if (key === 'contact-types' || key === 'contact-info') {
          return;
        }
        if (key === 'name' || key === 'surname') {
          value = value.trim();
          value = value.toLowerCase();
          value = value[0].toUpperCase() + value.slice(1);
        }
        if (key === 'middlename' && value !== '') {
          value = value.trim();
          value = value.toLowerCase();
          value = value[0].toUpperCase() + value.slice(1);
        }
        formObject[key] = value;
      });

      client ? onSave(formObject, popupContainer, client).then((object) => {
        document.querySelectorAll('.table__row').forEach(tr => {
          if (tr.getAttribute('data-id') === object.id) {
            tr.replaceWith(tableRender(object));
          }
        });
      }) : onSave(formObject, popupContainer).then(object => tableRender(object));
    } else {
      return;
    }
  });

  addBtn.addEventListener('click', () => {
    createContactsBlock(contactsWrapper);
  });

  closeBtn.addEventListener('click', () => {
    onClose(popupContainer);
  });

  undoBtn.addEventListener('click', () => {
    if (client) {
      onDelete(id);

      onClose(popupContainer);

      document.querySelectorAll('.table__row').forEach(row => {
        if (row.getAttribute('data-id') === id) {
          row.remove();
        }
      });
    } else {
      onClose(popupContainer);
    }
  });

  popupContainer.addEventListener('click', (e) => {
    if (e.target.closest('.popup') ||
        e.target.closest('.form-contact__delete-btn') ||
        e.target.closest('.form__delete-btn')
       ) {
      return;
    } else {
      onClose(popupContainer);
    }
  });

  return popupContainer;
}
