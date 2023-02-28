export function tableSort(arr, func, target, counter) {
  document.querySelector('.table__body').innerHTML = '';
  arr.sort((a, b) => {
    if (counter % 2 === 0) {
      switch(target.textContent) {
        case 'ID' :
          target.classList.remove('arrow-up');
          target.classList.add('arrow-down');
          return b.id - a.id;
        case 'Фамилия Имя Отчество' :
          target.classList.remove('arrow-up-txt');
          target.classList.add('arrow-down-txt');
          if (a.lastName + a.name < b.lastName + b.name) {
            return -1;
          }
          return 0;
        case 'Время создания' :
          target.classList.remove('arrow-up');
          target.classList.add('arrow-down');
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          return 0;
        case 'Последние изменения' :
          target.classList.remove('arrow-up');
          target.classList.add('arrow-down');
          if (a.updatedAt > b.updatedAt) {
            return -1;
          }
          return 0;
      }
    } else {
      switch(target.textContent) {
        case 'ID' :
          target.classList.remove('arrow-down');
          target.classList.add('arrow-up');
          return a.id - b.id;
        case 'Фамилия Имя Отчество' :
          target.classList.remove('arrow-down-txt');
          target.classList.add('arrow-up-txt');
          if (a.lastName + a.name > b.lastName + b.name) {
            return -1;
          }
          return 0;
        case 'Время создания' :
          target.classList.remove('arrow-down');
          target.classList.add('arrow-up');
          if (a.createdAt < b.createdAt) {
            return -1;
          }
          return 0;
        case 'Последние изменения' :
          target.classList.remove('arrow-down');
          target.classList.add('arrow-up');
          if (a.updatedAt < b.updatedAt) {
            return -1;
          }
          return 0;
      }
    }
  });
  for (const object of arr) {
    func(object);
  }
}
