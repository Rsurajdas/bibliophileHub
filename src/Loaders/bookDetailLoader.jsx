import { getAuthToken, getUserId } from '../utils/auth';

export const bookDetailLoader = async ({ params }) => {
  const id = params.id;
  const token = getAuthToken();
  const userId = getUserId();

  // fetch Book
  const bookJson = await fetch(
    `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/books/${id}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  const bookData = await bookJson.json();

  // fetch User
  const userJson = await fetch(
    `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/get-user/${userId}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  const userData = await userJson.json();

  // Fetch Shelves
  const shelvesJson = await fetch(
    'https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/shelf',
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  const shelvesData = await shelvesJson.json();

  return {
    book: bookData.data.book,
    review: bookData.data.review,
    user: userData.data.user,
    shelves: shelvesData.data.shelves,
  };
};
