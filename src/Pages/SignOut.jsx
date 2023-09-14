import { redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const signOut = () => {
  const cookie = new Cookies();
  cookie.remove('token');
  cookie.remove('userId');

  return redirect('/signin');
};
