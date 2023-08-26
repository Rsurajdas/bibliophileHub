import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import Button from '../Btn/Button';

const Table = ({ books, removeBook, shelfId }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>cover</th>
          <th>title</th>
          <th>author</th>
          <th>Publisher</th>
          <th>rating</th>
          <th>isbn</th>
          <th>review</th>
          {shelfId && <th></th>}
        </tr>
      </thead>
      <tbody>
        {books &&
          books.map((book) => (
            <tr key={book._id}>
              <td style={{ width: '70px' }}>
                <div className="">
                  <Link to={`/book/${book._id}`}>
                    <img
                      src={book.book_image}
                      alt={book.title}
                      className="cover-img"
                    />
                  </Link>
                </div>
              </td>
              <td
                style={{
                  width: '180px',
                }}
              >
                <div>{book.title}</div>
              </td>
              <td
                style={{
                  width: '90px',
                }}
              >
                <div>{book.author.name}</div>
              </td>
              <td
                style={{
                  width: '90px',
                }}
              >
                <div>{book.publisher}</div>
              </td>
              <td
                style={{
                  width: '110px',
                }}
              >
                <Rating name="book-rating" defaultValue={2.5} size="small" />
              </td>
              <td
                style={{
                  width: '120px',
                }}
              >
                <div>{book.primary_isbn10}</div>
              </td>
              <td>
                <Link to="/">Write Review</Link>
              </td>
              {shelfId && (
                <td>
                  <Button
                    variant="text"
                    text="X"
                    onClick={() => removeBook(book._id)}
                  />
                </td>
              )}
            </tr>
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
  );
};

Table.propTypes = {
  books: PropTypes.array,
  removeBook: PropTypes.func,
  shelfId: PropTypes.string,
};

export default Table;
