import { useParams, useRouteLoaderData } from 'react-router-dom';
import axios from 'axios';
import TableRow from './TableRow';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingScreen from '../../LoadingScreen';
import 'react-toastify/dist/ReactToastify.css';
import './Table.css';

const Table = () => {
  const token = useRouteLoaderData('token');
  const { shelfId } = useParams();

  const {
    data: books,
    isLoading: isBooksLoading,
    isFetching: isBooksFetching,
  } = useQuery({
    queryKey: ['get-shelf-books', shelfId, token],
    queryFn: () => {
      return axios.get(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/shelf/all-books-user-shelves/${
          shelfId === 'all' ? '' : shelfId
        }`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    },
    select: (data) => data.data.data.books,
  });

  const queryClient = useQueryClient();

  const { isLoading: isRemoving, mutate: removeBook } = useMutation({
    mutationFn: async ({ shelf_id, bookId }) => {
      const confirm = window.confirm(
        'Are you sure want to remove this book from shelf?'
      );
      if (confirm) {
        await axios.post(
          `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/shelf/remove-book/${shelf_id}/${bookId}`,
          null,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-shelf-books'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isBooksLoading) return <LoadingScreen />;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>cover</th>
            <th>title</th>
            <th>author</th>
            <th>Publisher</th>
            <th>rating</th>
            <th>Shelf</th>
            <th>review</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => (
            <TableRow
              key={book.book._id}
              book={book}
              shelfId={shelfId}
              removeBook={removeBook}
              isRemoving={isRemoving}
            />
          ))}
          {!books?.length && (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>
                No book was found on the shelf.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastContainer position="bottom-left" />
    </>
  );
};

export default Table;
