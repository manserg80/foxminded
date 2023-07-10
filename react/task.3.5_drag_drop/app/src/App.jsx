import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/nav/nav';
import Home from './components/home/home';
import PostsList from './components/postsList/postsList';
import TodoList from './components/todoList/todoList';
import UserList from './components/userList/userList';

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <div className='main'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/posts" element={<PostsList />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;