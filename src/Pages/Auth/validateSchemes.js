export const initialState = {
  auth: { login: '', password: '' },
  register: { fullname: '', phone: '', email: '', password: '', repeatPassword: '' },
  resetPassword: { email: '' },
};

export const schemes = {
  // Набор правил для входа
  auth: {
    login: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 20 символов', value: 20 },
    },
    password: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 20 символов', value: 20 },
    },
  },
  // Набор правил для регистрации
  register: {
    fullname: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 20 символов', value: 20 },
    },
    phone: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 20 символов', value: 20 },
    },
    email: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 20 символов', value: 20 },
    },
    password: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 20 символов', value: 20 },
    },
    repeatPassword: {
      isRequired: { message: 'Обязательное поле' },
      confirmPassword: { message: 'Пароли не совпадают', ref: 'password' },
    },
  },
  // Набор правил для восстановления
  resetPassword: {
    email: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 20 символов', value: 20 },
    },
  },
};
