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
          `http://127.0.0.1:3000/api/v1/shelf/move-book/${bookId}`,
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
              // <tr key={book.book._id}>
              //   <td style={{ width: '70px' }}>
              //     <div className="">
              //       <Link to={`/book/${book.book._id}`}>
              //         <img
              //           src={book.book.book_image}
              //           alt={book.book.title}
              //           className="cover-img"
              //         />
              //       </Link>
              //     </div>
              //   </td>
              //   <td
              //     style={{
              //       width: '180px',
              //     }}
              //   >
              //     <div>{book.book.title}</div>
              //   </td>
              //   <td
              //     style={{
              //       width: '90px',
              //     }}
              //   >
              //     <div>{book.book.author.name}</div>
              //   </td>
              //   <td
              //     style={{
              //       width: '90px',
              //     }}
              //   >
              //     <div>{book.book.publisher}</div>
              //   </td>
              //   <td
              //     style={{
              //       width: '110px',
              //     }}
              //   >
              //     {book.review ? (
              //       <Rating
              //         name="book-rating"
              //         value={book.review.rating}
              //         size="small"
              //         onChange={handleRating(book.book._id)}
              //       />
              //     ) : (
              //       <Rating
              //         name="book-rating"
              //         value={0}
              //         size="small"
              //         onChange={handleRating(book.book._id)}
              //       />
              //     )}
              //   </td>
              //   <td
              //     style={{
              //       width: '120px',
              //     }}
              //   >
              //     <div>
              //       {!shelfName ? book.shelves[0].shelf_name : shelfName}{' '}
              //       <Button
              //         text="[edit]"
              //         variant="text"
              //         sx={{ fontSize: '10px' }}
              //         onClick={() => setOpen(true)}
              //       />
              //     </div>
              //   </td>
              //   <td>
              //     <Link to="/">Write Review</Link>
              //   </td>
              //   <td>
              //     {!shelfId ? (
              //       <Button
              //         variant="text"
              //         text="X"
              //         onClick={() =>
              //           removeBook(book.shelves[0].shelf_id, book.book._id)
              //         }
              //       />
              //     ) : (
              //       <Button
              //         variant="text"
              //         text="X"
              //         onClick={() => removeBook(shelfId, book.book._id)}
              //       />
              //     )}
              //   </td>
              //   {!shelfId ? (
              //     <SelectSelf
              //       open={open}
              //       shelves={shelves}
              //       setOpen={setOpen}
              //       handleShelf={handleUpdateShelf(
              //         book.shelves[0].shelf_id,
              //         book.book._id
              //       )}
              //       key={idx}
              //     />
              //   ) : (
              //     <SelectSelf
              //       open={open}
              //       shelves={shelves}
              //       setOpen={setOpen}
              //       handleShelf={handleUpdateShelf(shelfId, book.book._id)}
              //       key={idx}
              //     />
              //   )}
              // </tr>
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
