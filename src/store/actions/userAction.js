import { userActions } from '../reducers/userReducer';
import { getAuthToken, getUserId } from './../../utils/auth';

export const getUserData = () => async (dispatch) => {
  const token = getAuthToken();
  const userId = getUserId();
  const fetchUser = async () => {
    const res = await fetch(
      `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/get-user/${userId}`,
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
