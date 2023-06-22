import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import './todoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editedTodo, setEditedTodo] = useState(null);

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
    setShowAddForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTodoTitle.trim() === '') {
      alert('Please enter a title for the todo.');
      return;
    }
    const newTodo = {
      id: Date.now(),
      title: newTodoTitle,
      completed: false,
    };
    setTodos([newTodo, ...todos]); // Prepend the new todo
    localStorage.setItem('todos', JSON.stringify([newTodo, ...todos]));
    setShowAddForm(false);
    setNewTodoTitle('');
  };

  const handleEditTodo = (todoId) => {
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    setEditedTodo(todoToEdit);
    setShowEditForm(true);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    if (!editedTodo || editedTodo.title.trim() === '') {
      alert('Please enter a name for the todo.');
      return;
    }
    const updatedTodos = todos.map((todo) =>
      todo.id === editedTodo.id ? editedTodo : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setShowEditForm(false);
    setEditedTodo(null);
  };

  const handleDeleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleToggle = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    const checkedTodo = updatedTodos.find((todo) => todo.id === todoId);
  
    if (checkedTodo && checkedTodo.completed) {
      const uncheckedTodos = updatedTodos.filter((todo) => !todo.completed);
      const checkedTodos = updatedTodos.filter((todo) => todo.completed);
      setTodos([...uncheckedTodos, ...checkedTodos]);
    } else {
      setTodos(updatedTodos);
    }

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const updatedTodos = Array.from(todos);
    const [reorderedTodo] = updatedTodos.splice(startIndex, 1);
    updatedTodos.splice(endIndex, 0, reorderedTodo);

    setTodos(updatedTodos);

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className="todo-container">
      <h1>Todos</h1>
      <button onClick={handleAddTodo}>Add Todo</button>
      {showAddForm && (
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Enter todo title"
          />
          <button type="submit">Add</button>
        </form>
      )}
      {showEditForm && editedTodo && (
        <form onSubmit={handleEditFormSubmit}>
          <input
            type="text"
            value={editedTodo.title}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, title: e.target.value })
            }
            placeholder="Enter todo title"
          />
          <button type="submit">Update</button>
        </form>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided) => (
                    <div className='todo' 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>
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
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoList;