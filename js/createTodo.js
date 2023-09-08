export const createTodo = (title, todos, updateLocalStorage) => {
    const date = new Date();

    if (!title) return;

    let todo = {
        title,
        date: date.toLocaleDateString(),
        checked: false,
        id: Date.now(),
    };

    todos.push(todo);
    updateLocalStorage();
    return todo;
};