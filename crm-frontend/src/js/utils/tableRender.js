import { getClients } from './api.js';
import { createPopup } from './createPopup.js';
import { createDeletePopup } from './createDeletePopup.js';
import { showContact } from './showContact.js';

export function tableRender(obj) {
  function getId() {
    const clientId = obj.id;

    return clientId
  }

  function getFullName() {
    const fullName = `${obj.surname} ${obj.name} ${obj.lastName}`;

    return fullName;
  }

  function getCreationTime() {
    const date = document.createElement('span');
    const time = document.createElement('span');

    date.classList.add('date');
    time.classList.add('time');

    date.textContent = new Date(obj.createdAt).toLocaleDateString();
    time.textContent = new Date(obj.createdAt).toLocaleTimeString().substring(0, 5);

    return {
      date,
      time
    }
  }

  function getEditTime() {
    const date = document.createElement('span');
    const time = document.createElement('span');

    date.classList.add('date');
    time.classList.add('time');

    date.textContent = new Date(obj.updatedAt).toLocaleDateString();
    time.textContent = new Date(obj.updatedAt).toLocaleTimeString().substring(0, 5);

    return {
      date,
      time
    }
  }

  function createContacts() {
    const maskOptions = {
      mask: '+7(000)000-00-00',
      lazy: false,
    }

    if (!obj.contacts.length) {
      return;
    } else {
      const contactsBlock = document.createElement('div');
      contactsBlock.classList.add('table-cell__contacts');

      for (const contact of obj.contacts) {
        const contactIcon = document.createElement('div');
        contactIcon.classList.add('icon');

        switch(Object.values(contact)[0]) {
          case 'Телефон' :
            const valueForImask = document.createElement('input');
            valueForImask.value = Object.values(contact)[1];

            new IMask(valueForImask, maskOptions);

            contactIcon.classList.add('phone-icon');
            contactIcon.dataset.type = Object.values(contact)[0];
            contactIcon.dataset.value = valueForImask.value;
            break;
          case 'Email' :
            contactIcon.classList.add('mail-icon');
            contactIcon.dataset.type = Object.values(contact)[0];
            contactIcon.dataset.value = Object.values(contact)[1];
            break;
          case 'Facebook' :
            contactIcon.classList.add('fb-icon');
            contactIcon.dataset.type = Object.values(contact)[0];
            contactIcon.dataset.value = Object.values(contact)[1];
            break;
          case 'VK' :
            contactIcon.classList.add('vk-icon');
            contactIcon.dataset.type = Object.values(contact)[0];
            contactIcon.dataset.value = Object.values(contact)[1];
            break;
          case 'Другое' :
          case 'Twitter' :
          case 'Instagram' :
          case 'TikTok' :
          case 'Likee' :
          case 'LinkedIn' :
          case 'YouTube' :
          case 'RuTube' :
          case 'Dzen' :
            contactIcon.classList.add('other-icon');
            contactIcon.dataset.type = Object.values(contact)[0];
            contactIcon.dataset.value = Object.values(contact)[1];
            break;
        }
        contactsBlock.appendChild(contactIcon);
      }

      contactsBlock.addEventListener('mouseover', (e) => {
        const target = e.target;
        showContact(target);
      });

      return contactsBlock;
    }
  }

  function createButtons() {
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    editBtn.classList.add('table__edit-btn', 'btn-edit-icon');
    deleteBtn.classList.add('table__delete-btn', 'btn-cancel-icon');

    editBtn.type = 'button';
    deleteBtn.type = 'button';

    editBtn.textContent = 'Изменить';
    deleteBtn.textContent = 'Удалить';

    editBtn.addEventListener('click', (e) => {
      const target = e.target;
      const id = target.parentElement.parentElement.getAttribute('data-id');

      getClients(id).then(object => {
        createPopup(object, id);
      });
    });

    deleteBtn.addEventListener('click', (e) => {
      const target = e.target;
      const id = target.parentElement.parentElement.getAttribute('data-id');

      createDeletePopup(id);
    });

    return {
      editBtn,
      deleteBtn
    }
  }

  const creationTime = getCreationTime();
  const editTime = getEditTime();
  const contactBlock = createContacts();
  const tableButtons = createButtons();

  const tableRow = document.createElement('tr');
  const idCell = document.createElement('td');
  const fullNameCell = document.createElement('td');
  const dateAndTimeCell = document.createElement('td');
  const changesTimeCell = document.createElement('td');
  const contactCell = document.createElement('td');
  const actionCell = document.createElement('td');

  tableRow.classList.add('table__row');
  idCell.classList.add('table__cell');
  fullNameCell.classList.add('table__cell');
  dateAndTimeCell.classList.add('table__cell');
  changesTimeCell.classList.add('table__cell');
  contactCell.classList.add('table__cell');
  actionCell.classList.add('table__cell');

  tableRow.dataset.id = getId(obj);

  idCell.textContent = getId(obj).substring(0, 7);
  fullNameCell.textContent = getFullName(obj);
  dateAndTimeCell.append(creationTime.date, creationTime.time);
  changesTimeCell.append(editTime.date, editTime.time);
  contactCell.append(contactBlock || '');
  actionCell.append(tableButtons.editBtn, tableButtons.deleteBtn);

  tableRow.append(idCell, fullNameCell, dateAndTimeCell, changesTimeCell, contactCell, actionCell);
  document.querySelector('.table__body').append(tableRow);

  return tableRow;
}
