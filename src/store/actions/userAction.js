import { userActions } from '../reducers/userReducer';
import { getAuthToken, getUserId } from './../../utils/auth';

export const getUserData = () => async (dispatch) => {
  const token = getAuthToken();
  const userId = getUserId();
  const fetchUser = async () => {
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/users/get-user/${userId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    return data.data.user;
  };

  try {
    const userData = await fetchUser();
    dispatch(userActions.initializeUser(userData));
  } catch (err) {
    console.error(err);
  }
};
