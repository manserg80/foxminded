import React, { useEffect, useState } from 'react';
import { Outlet, Link} from 'react-router-dom';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './userList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [editUserId, setEditUserId] = useState('');
  const [editUserName, setEditUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        );
        const data = response.data;
        setUsers(data);
        localStorage.setItem('users', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      fetchData();
    }
  }, []);

  const handleAddUser = () => {
    setShowAddForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newUserName.trim() === '') {
      alert('Please enter a user name.');
      return;
    }
    const newUser = {
      id: Date.now(),
      name: newUserName,
    };
    setUsers([...users, newUser]);
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    setShowAddForm(false);
    setNewUserName('');
  };

  const handleEditUser = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      setEditUserId(userId);
      setEditUserName(user.name);
      setShowEditForm(true);
    }
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    if (editUserName.trim() === '') {
      alert('Please enter a user name.');
      return;
    }
    const updatedUser = {
      id: editUserId,
      name: editUserName,
    };
    const updatedUsers = users.map((user) =>
      user.id === editUserId ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setShowEditForm(false);
    setEditUserId('');
    setEditUserName('');
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedUsers = Array.from(users);
    const [reorderedUser] = updatedUsers.splice(sourceIndex, 1);
    updatedUsers.splice(destinationIndex, 0, reorderedUser);

    setUsers(updatedUsers);

    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="user-list">
      <h1>User List</h1>
      <button onClick={handleAddUser}>Add User</button>
      {showAddForm && (
        <form className="user-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter user name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="userList">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {users.map((user, index) => (
                  <Draggable key={user.id} draggableId={user.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="user"
                      >
                        {showEditForm && editUserId === user.id ? (
                          <form className="user-form" onSubmit={handleEditFormSubmit}>
                            <input
                              type="text"
                              placeholder="Enter user name"
                              value={editUserName}
                              onChange={(e) => setEditUserName(e.target.value)}
                              id='form-input'
                            />
                            <button type="submit">Update</button>
                          </form>
                        ) : (
                          <>
                            <Link to={`/users/${user.id}`}>{user.name}</Link>
                            <div className="buttons">
                              <button onClick={() => handleEditUser(user.id)}>Edit User</button>
                              <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      <Outlet />
    </div>
  );
};

export default UserList;