import React from 'react';

import { Link } from 'react-router-dom';

import Avi from '../../UI/Avi/Avi';

import Card from '../../UI/Card/card';

import './UserItem.css';

const UserItem = (props) => {
  return (
    <div>
      <li className="user-item">
          <Card className="user-item__content">
            <Link to={`/users/${props.id}/products`}>
              <div className="user-item__image">
                <Avi image={props.image} alt={props.name} />
              </div>
              <div className="user-item__info">
                <h2><strong>{props.name}</strong></h2>
                <h3>
                  {props.items}{' '}
                  {props.items === 1 ? 'Item' : 'Items'}
                </h3>
              </div>
            </Link>
          </Card>
      </li>
    </div>
  );
};

export default UserItem;