const ROLES = {
  admin: 'r1',
  user: 'r2',
};

// --- Работа с сессиями пользователя и настройка доступов ---
const sessions = {
  async create(user) {
    const hash = Math.random().toFixed(50);
    await server.addSession(hash, user);
    return hash;
  },

  async remove(hash) {
    const session = await server.getSession(hash);
    if (!session) return;
    server.removeSession(session.id);
  },

  async access(hash, accessRoles) {
    const session = await server.getSession(hash);
    if (!session) return false;
    return accessRoles.includes(session.user.role_id);
  },
};

// --- Основная часть бэка ---
export const server = {
  async getUsers() {
    return fetch('http://localhost:3000/users').then((loadedUsers) => loadedUsers.json());
  },

  async getUserByLogin(loginToFind) {
    const users = await getUsers();
    return users.find(({ login }) => login === loginToFind);
  },

  async addUser(login, password) {
    await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'applicaton/json;charset=utf-8' },
      body: JSON.stringify({
        login,
        password,
        created_at: new Date().toLocaleDateString(),
        role_id: 'r2',
      }),
    });
  },

  async authorize(authLogin, authPassword) {
    const user = getUserByLogin(authLogin);

    if (!user) return { error: 'Такой пользователь не найден', response: null };

    if (authPassword !== user.password)
      return { error: 'Неверный пароль', response: null };

    return {
      error: null,
      response: sessions.create(user),
    };
  },

  async register(regLogin, regPassword) {
    const user = getUserByLogin(regLogin);

    if (user) return { error: 'Такой логин уже занят', response: null };

    const newUser = await this.addUser(regLogin, regPassword);

    return {
      error: null,
      response: sessions.create({ ...newUser, session: await sessions.create(newUser) }),
    };
  },

  async getSession(hash) {
    const session = await fetch(`http://localhost:3000/sessions?hash=${hash}`).then(
      (response) => response.json()
    );
    return session[0];
  },

  async addSession(hash, user) {
    await fetch(`http://localhost:3000/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        hash,
        user,
      }),
    }).then((response) => response.json());
  },

  async removeSession(sessionId) {
    await fetch(`http://localhost:3000/sessions/${sessionId}`, {
      method: 'DELETE',
    });
  },
};
