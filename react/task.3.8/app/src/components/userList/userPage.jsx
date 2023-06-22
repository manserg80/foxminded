import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BiUser, BiNavigation, BiEnvelope, BiWindowAlt, BiPhone } from 'react-icons/bi';
import './userPage.css';

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [albums, setAlbums] = useState([]);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}/albums`
        );
        const albumData = response.data;
        setAlbums(albumData);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}/todos`
        );
        const todoData = response.data;
        setTodos(todoData);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}/posts`
        );
        const postData = response.data;
        setPosts(postData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchAlbums();
    fetchTodos();
    fetchPosts();
  }, [userId]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleTodoCheck = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <div className="user-page">
        <div className="user">
          <div className="tabs">
            <div
              className={`tab ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => handleTabChange('details')}
            >
              Details
            </div>
            <div
              className={`tab ${activeTab === 'albums' ? 'active' : ''}`}
              onClick={() => handleTabChange('albums')}
            >
              Albums
            </div>
            <div
              className={`tab ${activeTab === 'todos' ? 'active' : ''}`}
              onClick={() => handleTabChange('todos')}
            >
              Todos
            </div>
            <div
              className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
              onClick={() => handleTabChange('posts')}
            >
              Posts
            </div>
          </div>
          <div className={`user-details ${activeTab === 'details' ? 'active' : ''}`}>
            <h3>User Details</h3>
            <div className="user-deatils-row">
              <BiUser className="icon" />
              <div>
                <p>{user.name}</p>
                <span>Name</span>
              </div>
            </div>
            <div className="user-deatils-row">
              <BiNavigation className="icon" />
              <div>
                <p>
                  {user.address.street} street, <br />
                  {user.address.suite} suite, <br />
                  {user.address.city} city, <br />
                  {user.address.zipcode} zipcode
                </p>
                <span>Address</span>
              </div>
            </div>
            <div className="user-deatils-row">
              <BiEnvelope className="icon" />
              <div>
                <p>{user.email}</p>
                <span>Email</span>
              </div>
            </div>
            <div className="user-deatils-row">
              <BiWindowAlt className="icon" />
              <div>
                <p>{user.website}</p>
                <span>Website</span>
              </div>
            </div>
            <div className="user-deatils-row">
              <BiPhone className="icon" />
              <div>
                <p>{user.phone}</p>
                <span>Phone</span>
              </div>
            </div>
          </div>
          <div className={`user-details ${activeTab === 'albums' ? 'active' : ''}`}>
            <h3>Albums</h3>
            {albums.length === 0 ? (
              <div>Loading albums...</div>
            ) : (
              <ul>
                {albums.map((album) => (
                  <li key={album.id}>{album.title}</li>
                ))}
              </ul>
            )}
          </div>
          <div className={`user-details ${activeTab === 'todos' ? 'active' : ''}`}>
            <h3>Todos</h3>
            {todos.length === 0 ? (
              <div>Loading todos...</div>
            ) : (
              <ul>
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className={todo.completed ? 'completed' : ''}
                    onClick={() => handleTodoCheck(todo.id)}
                  >
                    <div className="todo-container">
                      <div className="todo-round">
                        <input
                          id="checkbox"
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => handleTodoCheck(todo.id)}
                        />
                        <label htmlFor="checkbox"></label>
                        <span className="todo-text">{todo.title}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={`user-details ${activeTab === 'posts' ? 'active' : ''}`}>
            <h3>Posts</h3>
            {posts.length === 0 ? (
              <div>Loading posts...</div>
            ) : (
              <ul>
                {posts.map((post) => (
                  <li key={post.id}>{post.title}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;