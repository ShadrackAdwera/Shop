import React from 'react';

import UserItem from './UserItem';

import Card from '../../UI/Card/card';

import './UserList.css';

const UsersList = (props) => {
  if (props.users.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.users.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            items={user.products.length}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;