import { getAuthToken } from './../utils/auth';

export const bookDetailLoader = async ({ params }) => {
  const id = params.id;
  const token = getAuthToken();

  // fetch Book
  const bookJson = await fetch(`http://127.0.0.1:3000/api/v1/books/${id}`);
  const bookData = await bookJson.json();

  // fetch User
  const userJson = await fetch('http://127.0.0.1:3000/api/v1/users/get-user', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const userData = await userJson.json();

  // Fetch Shelves
  const shelvesJson = await fetch('http://127.0.0.1:3000/api/v1/shelf', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const shelvesData = await shelvesJson.json();

  return {
    book: bookData.data.book,
    user: userData.data.user,
    shelves: shelvesData.data.shelves,
  };
};
