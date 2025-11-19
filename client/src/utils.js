import { categories } from './constants/categories';

// Валидация форм
const validationRules = {
  isRequired: (value) => {
    return Boolean(value.trim());
  },
  min: (value, limiter) => {
    return value.length > limiter;
  },
  max: (value, limiter) => {
    return value.length < limiter;
  },
  confirmPassword: (value, _, ref) => {
    return value === ref;
  },
};

export function validator(allValues, scheme) {
  const errors = {};

  for (let inputName in allValues) {
    const rulesInSheme = scheme[inputName]; // Извлекаю правила из схемы по именам инпутов

    for (let rule in rulesInSheme) {
      const { message, value, ref } = rulesInSheme[rule]; // Извлекаю содержимое из пользовательской схемы

      const hasError =
        validationRules[rule] &&
        !validationRules[rule](allValues[inputName], value, allValues[ref]);

      if (hasError) {
        errors[inputName] = message;
        break;
      }
    }
  }

  return errors;
}

// Получение имени коллекции по id
export const getCollectionName = (collectionID) => {
  return categories.find((category) => category.id === collectionID).name;
};

// Упрощение запросов на сервер
export const request = async (URL, method = 'GET', payload) => {
  const response = await fetch(URL, {
    method,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: payload ? JSON.stringify(payload) : undefined,
    credentials: 'include',
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  const data = response.json();
  return data;
};
