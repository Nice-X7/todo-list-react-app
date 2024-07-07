import React, { useEffect } from 'react';
import Forms from './Forms/Forms';
import { useDispatch, useSelector } from 'react-redux';
import { loadTodos, removeTodo } from '../redux/TodosSlice';
import { loadUsers } from '../redux/UsersSlice';
import { checkTodo } from '../redux/TodosSlice';


export const Content = () => {
  const todos = useSelector((state) => state.todos.todos);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };

  const handleCheck = (id, completed) => {
    dispatch(checkTodo({ id: id, completed: completed }));
  };

  useEffect(() => {
    dispatch(loadTodos());
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <div className='content'>
      <Forms/>

      <div className="todos">
        {todos.map((item) => {
          const user = users.find(u => u.id === item.userId);
          return (
            <div className="todo" key={item.id}>
              <input 
                type='checkbox' 
                checked={item.completed} 
                onChange={() => handleCheck(item.id, item.completed)}
              />
              <div className="userData">
                {item.title}
                {user && <span>{user.email}</span>}                
              </div>
              <button onClick={() => handleDelete(item.id)} className='delete'>
                удалить
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};