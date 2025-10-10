const ROLES = {
  admin: '-r1-',
  user: '-r2-',
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

  async getUserByEmail(emailToFind) {
    const users = await this.getUsers();
    return users.find(({ email }) => email === emailToFind);
  },

  async addUser(formData) {
    const newUser = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        ...formData,
        created_at: new Date().toLocaleDateString(),
        role_id: ROLES.user,
      }),
    }).then((response) => response.json());

    delete newUser.password;
    return newUser;
  },

  async authorize(email, password) {
    const user = await this.getUserByEmail(email);

    if (!user) return { error: 'Такой пользователь не найден', response: null };

    if (password !== user.password) return { error: 'Неверный пароль', response: null };

    delete user.password;

    return {
      error: null,
      response: { ...user, hash: await sessions.create(user) },
    };
  },

  async register(formData) {
    const user = await this.getUserByEmail(formData.email);

    if (user) return { error: 'Такой логин уже занят', response: null };

    const newUser = await this.addUser(formData);
    console.log(newUser);

    return {
      error: null,
      response: {
        ...newUser,
        hash: await sessions.create(newUser),
      },
    };
  },

  async logout(hash) {
    await sessions.remove(hash);
    console.log('Выход из системы');

    return {
      error: null,
      response: 'Выход из системы',
    };
  },

  async resetPassword(email) {
    const user = await this.getUserByEmail(email);

    if (!user) return { error: 'Такой пользователь не найден', response: null };

    const newUser = await fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        password: user.id,
      }),
    }).then((response) => response.json());

    return {
      error: null,
      response: newUser.password,
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
