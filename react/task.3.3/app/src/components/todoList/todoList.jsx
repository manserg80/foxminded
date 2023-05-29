import React from 'react';
import { connect } from 'react-redux';
import { addTodos } from '../../redux/actions';
import useDataFetching from '../hooks/useDataFetching';

const TodoList = ({ todos, addTodos }) => {
  useDataFetching('https://jsonplaceholder.typicode.com/todos', addTodos);

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

export default connect(mapStateToProps, { addTodos })(TodoList);