import { onChange } from './api.js';

export function createContactsBlock(contactsBlock, client) {
  const maskOptions = {
    mask: '+7(000)000-00-00',
    lazy: false,
  }

  if (client) {
    if (!client.contacts.length) {
      return;
    } else {
      for (const object of client.contacts) {
        const contact = document.createElement('div');
        const contactTypeList = document.createElement('select');
        const contactType = document.createElement('option');
        const contactValue = document.createElement('input');
        const contactValuePhone = document.createElement('input');
        const contactDeleteBtn = document.createElement('button');

        contact.classList.add('form__contact', 'form-contact');
        contactTypeList.classList.add('form-contact__select', 'form-select');
        contactType.classList.add('form-select__option');
        contactValue.classList.add('form-contact__input');
        contactValuePhone.classList.add('form-contact__input-PHONE');
        contactDeleteBtn.classList.add('form-contact__delete-btn', 'btn-cancel');

        contactTypeList.name = 'contact-types';
        contactValue.name = 'contact-info';
        contactDeleteBtn.type = 'button';

        contactType.value = object.type;
        contactType.textContent = object.type;

        if (object.type === 'Телефон') {
          contactValue.value = object.value;
          new IMask(contactValue, maskOptions);
        } else {
          contactValue.value = object.value;
        }

        contactTypeList.append(contactType);
        contact.append(contactTypeList, contactValue, contactDeleteBtn);
        contactsBlock.prepend(contact);
      }
    }
  } else {
    const contact = document.createElement('div');
    const contactTypeList = document.createElement('select');
    const contactValue = document.createElement('input');
    const contactValuePhone = document.createElement('input');
    const contactDeleteBtn = document.createElement('button');
    const contactTypesObject = {
      Телефон: 'Телефон',
      Email: 'Email',
      Facebook: 'Facebook',
      VK: 'VK',
      Другое: 'Другое',
    }

    new IMask(contactValuePhone, maskOptions);

    contact.classList.add('form__contact', 'form-contact');
    contactTypeList.classList.add('form-contact__select', 'form-select');
    contactValue.classList.add('form-contact__input');
    contactValuePhone.classList.add('form-contact__input');
    contactDeleteBtn.classList.add('form-contact__delete-btn', 'btn-cancel');

    contactTypeList.name = 'contact-types';
    contactValue.name = 'contact-info';
    contactValuePhone.name = 'contact-info';
    contactValuePhone.dataset.mask = 'phone';
    contactDeleteBtn.type = 'button';

    for (const key in contactTypesObject) {
      const contactType = document.createElement('option');
      contactType.classList.add('form-select__option');

      contactType.value = key;
      contactType.textContent = contactTypesObject[key];

      contactTypeList.append(contactType);
    }

    contactTypeList.value = 'Email';

    if ((contactsBlock.childNodes.length) == 10) {
      document.querySelector('.form__add-btn').disabled = 'disabled';
    }

    contactsBlock.addEventListener('DOMNodeRemoved', () => {
      if ((contactsBlock.childNodes.length - 1) <= 10) {
        document.querySelector('.form__add-btn').removeAttribute('disabled');
      }
    });

    contactTypeList.addEventListener('change', (e) => {
      if (e.target.value === 'Телефон') {
        contactValue.replaceWith(contactValuePhone);
      } else {
        contactValuePhone.replaceWith(contactValue);
      }

      if (e.target.value === 'Другое') {
        const otherTypesObject = {
          Twitter: 'Twitter',
          Instagram: 'Instagram',
          TikTok: 'TikTok',
          Likee: 'Likee',
          LinkedIn: 'LinkedIn',
          YouTube: 'YouTube',
          RuTube: 'RuTube',
          Dzen: 'Dzen',
        }
        const otherContactTypeList = document.createElement('select');
        otherContactTypeList.name = 'contact-types';

        for (const key in otherTypesObject) {
          const otherContactType = document.createElement('option');

          otherContactType.value = key;
          otherContactType.textContent = otherTypesObject[key];

          otherContactTypeList.append(otherContactType);
        }
        contactTypeList.remove();
        contact.prepend(otherContactTypeList);
      }
    });

    contact.append(contactTypeList, (contactValue || contactValuePhone), contactDeleteBtn);
    contactsBlock.prepend(contact);
  }

  contactsBlock.addEventListener('click', (e) => {
    const target = e.target;

    if (target.tagName === 'BUTTON' && !target.classList.contains('form__add-btn')) {
      if (client) {
        onChange(client);
      }
      target.parentElement.remove();
    }
  });

  return contactsBlock;
}
