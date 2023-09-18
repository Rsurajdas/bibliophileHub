import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Grid = ({ books }) => {
  if (!books.length) {
    return (
      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(7, 120px)',
          gridGap: '2.1%',
        }}
      >
        <div
          className="item"
          style={{ gridColumn: '1 / 8', textAlign: 'center' }}
        >
          No book was found on the shelf.
        </div>
      </div>
    );
  }
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: 'repeat(7, 120px)',
        gridGap: '2.1%',
      }}
    >
      {books.map((book) => (
        <div className="item" key={book.book._id}>
          <div className="item-img">
            <Link to={`/book/${book.book._id}`}>
              <img src={book.book.book_image} alt={book.book.title} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

Grid.propTypes = {
  books: PropTypes.array,
};

export default Grid;
