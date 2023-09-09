import { redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

export const getAuthToken = () => cookie.get('token');

export const tokenLoader = () => {
  if (getAuthToken()) return getAuthToken();
  else return '';
};

export const getUserId = () => cookie.get('userId');

export const checkAuthLoader = () => {
  if (!getAuthToken()) return redirect('/signin');
  return null;
};
