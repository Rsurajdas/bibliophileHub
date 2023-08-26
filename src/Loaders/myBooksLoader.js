import { getAuthToken } from './../utils/auth';

export const myBooksLoader = async () => {
  try {
    const token = getAuthToken();

    const res = await fetch('http://127.0.0.1:3000/api/v1/shelf', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data.data.shelves;
  } catch (err) {
    console.error(err);
  }
};
