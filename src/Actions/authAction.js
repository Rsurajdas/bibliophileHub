import { redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const authAction = async ({ request }) => {
  const formData = await request.formData();
  const cookie = new Cookies();
  const credentials = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const res = await fetch(
    'https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/login',
    {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.status === 401) {
    return res;
  }

  const data = await res.json();

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

  return redirect(`/profile/${userId}`);
};
