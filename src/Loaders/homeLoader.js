import { getAuthToken } from '../utils/auth';

export const homeLoader = async () => {
  const token = getAuthToken();

  const res = await fetch('http://127.0.0.1:3000/api/v1/posts/social-posts', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return data.data.posts;
};
