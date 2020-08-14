import React, { useEffect, useState, useCallback } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useHttp } from '../../../shared/http-hook';
import UserList from '../components/UserList';
import ErrorModal from '../../UI/ErrorModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const fetchUsers = useCallback(async () => {
    const url = 'http://localhost:5000/api/users';
    try {
      const resData = await sendRequest(url);
      setUsers(resData.users);
    } catch (error) {}
  }, [sendRequest]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading ? (
        <div className="center">
          <CircularProgress />
        </div>
      ) : (
        <UserList users={users} />
      )}
    </React.Fragment>
  );
};

export default Users;
