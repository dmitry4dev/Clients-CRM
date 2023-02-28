import { preloader } from './preloader.js';

export function tableInit(func, container, refElem) {
  const createTable = () => {
    const tableWrapper = document.createElement('div');
    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');
    const tableBody = document.createElement('tbody');
    const tableHeadArr = [];

    tableWrapper.classList.add('table-wrapper');
    table.classList.add('section-table__table', 'table');
    tableHeader.classList.add('table__header');
    tableBody.classList.add('table__body');

    tableWrapper.append(table);
    table.append(tableHeader);

    for (let i = 0; i <= 5; ++i) {
      const tableHead = document.createElement('th');
      const innerTableHead = document.createElement('div');

      tableHead.classList.add('table__title');

      tableHead.append(innerTableHead);

      switch(i) {
        case 0 :
          innerTableHead.textContent = 'ID';
          innerTableHead.classList.add('arrow', 'arrow-up');
          break;
        case 1 :
          innerTableHead.textContent = 'Фамилия Имя Отчество';
          innerTableHead.classList.add('arrow', 'arrow-down-txt');
          break;
        case 2 :
          innerTableHead.textContent = 'Время создания';
          innerTableHead.classList.add('arrow', 'arrow-down');
          break;
        case 3 :
          innerTableHead.textContent = 'Последние изменения';
          innerTableHead.classList.add('arrow', 'arrow-down');
          break;
        case 4 :
          tableHead.textContent = 'Контакты';
          break;
        case 5 :
          tableHead.textContent = 'Действия';
          break;
      }
      tableHeadArr.push(tableHead);
    }
    tableHeader.append(...tableHeadArr);
    table.append(tableBody);

    return tableWrapper;
  }

  const TABLE = createTable();
  const loaderIcon = preloader();
  console.log(TABLE)

  container.insertBefore(TABLE, refElem);

  TABLE.prepend(loaderIcon);

  fetch(`http://localhost:3000/api/clients`)
  .then(res => {
    return res.json();
  })
  .then(data => {
    for (const object of data) {
      func(object);
    }
  })
  .finally(() => {
    loaderIcon.classList.add('preloader--hide');
    loaderIcon.remove();
  });
}
