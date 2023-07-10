import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const ADD_TODO = 'ADD_TODO';
const EDIT_TODO = 'EDIT_TODO';
const DELETE_TODO = 'DELETE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const addTodo = (newTodo) => ({
  type: ADD_TODO,
  payload: newTodo,
});

export const editTodo = (updatedTodo) => ({
  type: EDIT_TODO,
  payload: updatedTodo,
});

export const deleteTodo = (todoId) => ({
  type: DELETE_TODO,
  payload: todoId,
});

export const toggleTodo = (todoId) => ({
  type: TOGGLE_TODO,
  payload: todoId,
});

const initialState = {
  todos: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    default:
      return state;
  }
};

export { todosReducer };

const TodoList = ({ addTodo, editTodo, deleteTodo, toggleTodo }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/todos?_limit=20'
        );
        const data = response.data;
        setTodos(data);
        localStorage.setItem('todos', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching todo list:', error);
      }
    };

    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      fetchData();
    }
  }, []);

  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: 'New Todo Title',
      completed: false,
    };
    addTodo(newTodo);
    setTodos([...todos, newTodo]);
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
  };

  const handleEditTodo = (todoId) => {
    const updatedTodo = {
      id: todoId,
      title: 'Updated TODO',
      completed: false, // You can customize the initial completed status here
    };
    editTodo(updatedTodo);
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? updatedTodo : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = (todoId) => {
    deleteTodo(todoId);
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleToggle = (todoId) => {
    toggleTodo(todoId);
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div>
      <h1>Todos</h1>
      <button onClick={handleAddTodo}>Add Todo</button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggle(todo.id)}
          />
          <span>{todo.title}</span>
          <div className='buttons'>
            <button onClick={() => handleEditTodo(todo.id)}>Edit Todo</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete Todo</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = {
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);