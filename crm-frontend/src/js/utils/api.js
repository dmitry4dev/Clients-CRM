import { createErrorMsg } from './createErrorMsg.js';

export async function getClients(id) {
  const response = await fetch(id ? `http://localhost:3000/api/clients/${id}` : `http://localhost:3000/api/clients`);
  const data = response.json();

  return data;
}

export async function onSave(data, element, client) {
  const errContainer = document.querySelector('.form__err-container');
  const response = await fetch(client ? `http://localhost:3000/api/clients/${client.id}` : `http://localhost:3000/api/clients`, {
    method: client ? 'PATCH' : 'POST',
    body: JSON.stringify({
      surname: data.surname,
      name: data.name,
      lastName: data.middlename,
      contacts: data.contacts
    }),
  });

  if (response.status === 201 || response.status === 200) {
    element.remove();
  } else if (response.status === 422) {
    errContainer.appendChild(createErrorMsg('wrong-data', 'Серверу не удалось обработать Ваш запрос'));
  } else if (response.status === 404) {
    errContainer.appendChild(createErrorMsg('wrong-data', 'Ошибка 404, Данного сервера не существует'));
  } else if (response.status === 500) {
    errContainer.appendChild(createErrorMsg('wrong-data', 'Cервер столкнулся с неожиданной ошибкой'));
  } else {
    errContainer.appendChild(createErrorMsg('wrong-data', 'Что-то пошло не так...'));
  }

  return response.json();
}

export async function onChange(client) {
  await fetch(`http://localhost:3000/api/clients/${client.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      surname: client.middlename,
      name: client.name,
      lastName: client.surname,
      contacts: client.contacts
    }),
  });
}

export async function onDelete(id) {
  await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE',
  });
}

export async function searchClients(url) {
  const response = await fetch(url);
  const data = response.json();

  return data;
}
