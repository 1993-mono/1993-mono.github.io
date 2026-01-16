import { getTodos } from '@/lib/todo';

export default async function Todo() {
  const categories = await getTodos();

  return (
    <main className="todo-page">
      {categories.map((category) => (
        <section key={category.id} className="todo-category">
          <h2 className="category-title">{category.name}</h2>
          <ul className="todo-list">
            {category.todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <div className="todo-header">
                  <input
                    type="checkbox"
                    id={todo.id}
                    checked={todo.checked}
                    disabled
                    readOnly
                    className="todo-checkbox"
                  />
                  <label htmlFor={todo.id} className="todo-title">
                    {todo.title}
                  </label>
                </div>
                {todo.htmlDetails && (
                  <div
                    className="todo-details"
                    dangerouslySetInnerHTML={{ __html: todo.htmlDetails }}
                  />
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}