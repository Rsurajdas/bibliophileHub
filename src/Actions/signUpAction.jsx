import { redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const signUpAction = async ({ request }) => {
  const formData = await request.formData();
  const cookie = new Cookies();
  const userData = {
    name: formData.get('name'),
    email: formData.get('email'),
    role: formData.get('role'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const res = await fetch(
    'https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/signup',
    {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await res.json();

  if (res.status === 400) {
    return data;
  }

  const token = data.token;
  const userId = data.data.user._id;

  if (token && userId) {
    cookie.set('token', token, {
      path: '/',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    cookie.set('userId', userId, {
      path: '/',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  }

  return redirect('/');
};
