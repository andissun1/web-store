const ROLES = {
  admin: 'r1',
  user: 'r2',
};

const getUsers = () =>
  fetch('http://localhost:3000/users').then((loadedUsers) => loadedUsers.json());

const getUserByLogin = async (loginToFind) => {
  const users = await getUsers();
  return users.find(({ login }) => login === loginToFind);
};

const addUser = async (login, password) => {
  await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'applicaton/json;charset=utf-8' },
    body: JSON.stringify({
      login,
      password,
      created_at: new Date(),
      role_id: 'r2',
    }),
  });
};

// Все функции по расширению прав на управление контентом
const allActions = {
  logOut() {
    Object.keys(session).forEach((key) => {
      delete session[key];
    });
    console.log('Выход из системы');
  },
  removeComment() {
    console.log('Удаление комментария');
  },
};

const createSession = async (role_id) => {
  const session = {};

  switch (role_id) {
    case ROLES.admin:
      session.removeComment = allActions.removeComment;
      break;
    case ROLES.user:
      console.log('Роль пользователя получена');

      break;

    default:
      // Не расширяем функционал для анонимных пользователей
      break;
  }

  return session;
};

// --- Основная часть бэка ---
export const server = {
  async authorize(authLogin, authPassword) {
    const user = getUserByLogin(authLogin);

    if (!user) return { error: 'Такой пользователь не найден', response: null };

    if (authPassword !== user.password)
      return { error: 'Неверный пароль', response: null };

    return {
      error: null,
      response: createSession(user.role_id),
    };
  },

  async register(regLogin, regPassword) {
    const user = getUserByLogin(regLogin);

    if (user) return { error: 'Такой логин уже занят', response: null };

    await addUser(regLogin, regPassword);

    return {
      error: null,
      response: createSession(ROLES.user),
    };
  },
};
