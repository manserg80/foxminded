import React from 'react';
import { connect } from 'react-redux';
import { addUsers } from '../../redux/actions';
import useDataFetching from '../hooks/useDataFetching';

const UserList = ({ users, addUsers }) => {
  useDataFetching('https://jsonplaceholder.typicode.com/users', addUsers);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { addUsers })(UserList);