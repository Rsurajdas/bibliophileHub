import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { getAuthToken, getUserId } from '../utils/auth';
import axios from 'axios';
import { useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const token = getAuthToken();
  const userId = getUserId();

  const { data: user, isLoading } = useQuery({
    queryKey: ['current-user', userId, token],
    queryFn: () => {
      return axios.get(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/get-user/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    },
    select: (data) => data.data.data.user,
    enabled: !!userId,
  });
  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('Cities context was used outside the context provider');
  return context;
};

UserProvider.propTypes = {
  children: PropTypes.node,
};
