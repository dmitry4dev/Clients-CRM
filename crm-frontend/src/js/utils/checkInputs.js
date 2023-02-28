import { createErrorMsg } from './createErrorMsg.js';

export function checkInputs(container) {
  const formInputs = [...document.getElementsByTagName('input')];
  const letterRegEx = /^[a-zA-Zа-яёА-ЯЁ]{2,48}$/;
  const maskOptions = {
    mask: '+7(000)000-00-00',
    lazy: false,
  }

  formInputs.forEach(input => {
    if (input.classList.contains('form__input') && input.name !== 'middlename') {
      if (input.value !== '' && input.value.match(letterRegEx)) {
        input.removeAttribute('data-state');
        input.classList.remove('input-error');
        removeError(container, formInputs);
      }
      if (input.value !== '' && !input.value.match(letterRegEx)) {
        input.classList.add('input-error');
        input.dataset.state = 'wrong-data';
        addError(container, createErrorMsg('wrong-data', 'Данные заполнены некорректно'));
      }
      if (input.value === '') {
        input.classList.add('input-error');
        input.dataset.state = 'empty-data';
        addError(container, createErrorMsg('empty-data', 'Все поля должны быть заполнены'));
      }
    } else if (input.classList.contains('form-contact__input')) {
      if (input.value === '') {
        input.classList.add('input-error');
        input.dataset.state = 'empty-data';
        addError(container, createErrorMsg('empty-data', 'Все поля должны быть заполнены'));
      } else {
        input.removeAttribute('data-state');
        input.classList.remove('input-error');
        removeError(container, formInputs);
      }
      if (input.getAttribute('data-mask') === 'phone') {
        if (input.value === maskOptions.mask) {
          input.classList.add('input-error');
          input.dataset.state = 'empty-data';
          addError(container, createErrorMsg('empty-data', 'Все поля должны быть заполнены'));
        } else {
          input.removeAttribute('data-state');
          input.classList.remove('input-error');
          removeError(container, formInputs);
        }
      }
    }
    input.addEventListener('input', () => {
      if (input.classList.contains('input-error')) {
        input.classList.remove('input-error');
      }
    });
  });

  function addError(container, msg) {
    if (container.childElementCount === 0) {
      container.appendChild(msg);
    } else {
      const errors = Array.from(container.childNodes);
      for (let i = 0; i <= errors.length - 1; ++i) {
        if (errors[i].getAttribute('data-state') === msg.getAttribute('data-state')) {
          break;
        }
        if (errors[i].getAttribute('data-state') !== msg.getAttribute('data-state') && i == errors.length - 1) {
          container.appendChild(msg);
          break;
        }
      }
    }
    return container;
  }

  function removeError(container, inputs) {
    const errors = Array.from(container.childNodes);
    if (inputs.every(input => input.getAttribute('data-state') !== 'empty-data')) {
      errors.forEach(err => {
        if (err.getAttribute('data-state') === 'empty-data') {
          err.remove();
        }
      });
    }
    if (inputs.every(input => input.getAttribute('data-state') !== 'wrong-data')) {
      errors.forEach(err => {
        if (err.getAttribute('data-state') === 'wrong-data') {
          err.remove();
        }
      });
    }
    return container;
  }

  if (formInputs.every(input => input.getAttribute('data-state') !== 'empty-data') &&
      formInputs.every(input => input.getAttribute('data-state') !== 'wrong-data')
  ) {
    return true;
  } else {
    return false;
  }
}
