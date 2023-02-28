import { tableInit } from './utils/tableInit.js';
import { tableRender } from './utils/tableRender.js';
import { createPopup } from './utils/createPopup.js';
import { tableSort } from './utils/tableSort.js';
import { getClients, searchClients } from './utils/api.js';
import { preloader } from './utils/preloader.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header__search');
  const mainContainer = document.querySelector('.container');
  const addClientBtn = document.querySelector('.add-btn');
  const API_URL = `http://localhost:3000/api/clients`;
  const url = new URL(API_URL);
  const loaderIcon = preloader();
  let timerId;

  tableInit(tableRender, mainContainer, addClientBtn);

  if (location.hash) {
    const hash = location.hash.split('#').join('');

    getClients(hash).then(object => {
      createPopup(object);
    });
  }

  searchInput.addEventListener('input', () => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      url.searchParams.set('search', searchInput.value);
      document.querySelector('.section-table__table').prepend(loaderIcon);

      searchClients(url).then(result => {
        document.querySelector('.table__body').innerHTML = '';
        loaderIcon.classList.remove('preloader--hide');
        loaderIcon.remove();

        for (const object of result) {
          tableRender(object);
        }
      });
    }, 300);
  });

  addClientBtn.addEventListener('click', () => {
    createPopup();
  });

  const tableHeader = document.querySelectorAll('.table__title');

  tableHeader.forEach(th => {
    let counter = 1;

    if (th.textContent === 'Контакты' || th.textContent === 'Действия') {
      return;
    }
    th.addEventListener('click', (e) => {
      const target = e.target;
      counter++;
      getClients().then(data => {
        tableSort(data, tableRender, target, counter);
      });
    })
  });
});
