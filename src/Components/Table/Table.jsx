import { useRouteLoaderData } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import TableRow from './TableRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Table.css';

const Table = ({ books, removeBook, shelves, shelfId, shelfName }) => {
  const token = useRouteLoaderData('token');

  const handleUpdateShelf = (currentId, bookId) => {
    return async (evt, newValue) => {
      try {
        const shelfData = {
          fromShelfId: currentId,
          toShelfId: newValue,
        };
        const res = await axios.patch(
          `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/shelf/move-book/${bookId}`,
          shelfData,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const { data } = res;
        toast.success(data.message);
        window.location.reload();
      } catch (err) {
        toast.error(err.message);
      }
    };
  };

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
          {books &&
            books.map((book) => (
              <TableRow
                key={book.book._id}
                book={book}
                shelves={shelves}
                shelfId={shelfId}
                shelfName={shelfName}
                removeBook={removeBook}
                handleUpdateShelf={handleUpdateShelf}
              />
            ))}
          {books.length === 0 && (
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

Table.propTypes = {
  books: PropTypes.array,
  removeBook: PropTypes.func,
  shelves: PropTypes.array,
  shelfId: PropTypes.string,
  shelfName: PropTypes.string,
};

export default Table;
