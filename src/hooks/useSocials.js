import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouteLoaderData } from 'react-router-dom';

export function useSocials(path, id) {
  const token = useRouteLoaderData('token');

  const fetchData = (path, id) => {
    return axios.get(
      `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/${path}/${id}`,
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    );
  };

  const { data, isLoading } = useQuery({
    queryKey: ['social-list', path, id],
    queryFn: () => fetchData(path, id),
    select: (data) => data.data.data[path],
    onError: (err) => console.error(err),
  });

  return { data, isLoading };
}
