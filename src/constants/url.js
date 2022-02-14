const URL = 'https://rn-todo-app-6a827-default-rtdb.firebaseio.com/';

export const DB_URL = `${URL}todos.json`;

export const getDbUrlWithId = (id) => `${URL}/todos/${id}.json`;
