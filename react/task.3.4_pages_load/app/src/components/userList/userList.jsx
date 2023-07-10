import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const ADD_USER = 'ADD_USER';
const EDIT_USER = 'EDIT_USER';
const DELETE_USER = 'DELETE_USER';


const addUser = (newUser) => ({
  type: ADD_USER,
  payload: newUser,
});

export const editUser = (updatedUser) => ({
  type: EDIT_USER,
  payload: updatedUser,
});

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: userId,
});

const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export { usersReducer };

const UserList = ({ addUser, editUser, deleteUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users?_limit=20'
        );
        const data = response.data;
        setUsers(data);
        localStorage.setItem('users', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };

    const storedusers = localStorage.getItem('users');
    if (storedusers) {
      setUsers(JSON.parse(storedusers));
    } else {
      fetchData();
    }
  }, []);

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name: 'New user name',
      completed: false,
    };
    addUser(newUser);
    setUsers([...users, newUser]);
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
  };

  const handleEditUser = (userId) => {
    const updateduser = {
      id: userId,
      name: 'Updated user',
      completed: false,
    };
    editUser(updateduser);
    const updatedUsers = users.map((user) =>
      user.id === userId ? updateduser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handledeleteUser = (userId) => {
    deleteUser(userId);
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };
  return (
    <div>
      <h1>User List</h1>
      <button onClick={handleAddUser}>Add User</button>
      {users.map((user) => (
      <div key={user.id}>
        <h3>{user.name}</h3>
        <div className='buttons'>
            <button onClick={() => handleEditUser(user.id)}>Edit user</button>
            <button onClick={() => handledeleteUser(user.id)}>Delete user</button>
        </div>
      </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  addUser,
  editUser,
  deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);