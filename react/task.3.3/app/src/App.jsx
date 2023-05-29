import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navigation from './components/nav/nav';
import PostsList from './components/postsList/postsList';
import TodoList from './components/todoList/todoList';
import UserList from './components/userList/userList';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<h1>Home Page</h1>} />
            <Route path="/posts" element={<PostsList />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;