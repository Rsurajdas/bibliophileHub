import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouteLoaderData } from 'react-router-dom';

export const useSocialHandleFunc = (action) => {
  const token = useRouteLoaderData('token');
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (userId) => {
      await axios.post(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/${action}/${userId}`,
        null,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['social-list'],
      });
    },
    onError: (err) => console.error(err.message),
  });

  return [mutate, isLoading];
};
