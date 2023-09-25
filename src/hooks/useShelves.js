import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouteLoaderData } from 'react-router-dom';

export function useShelves() {
  const token = useRouteLoaderData('token');
  const { data: shelves } = useQuery({
    queryKey: ['shelves'],
    queryFn: () =>
      axios.get(
        'https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/shelf',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      ),
    select: (data) => data.data.data.shelves,
  });

  return shelves;
}
