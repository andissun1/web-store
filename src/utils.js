// Валидация форм
const validationRules = {
  isRequired: (value) => {
    return Boolean(value.trim());
  },
  min: (value) => {
    return value.length > 2;
  },
  max: (value) => {
    return value.length < 10;
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
