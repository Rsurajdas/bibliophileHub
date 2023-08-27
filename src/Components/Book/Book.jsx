import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Book.css';

const Book = ({ book }) => {
  return (
    <div className="book">
      <Link to={`/book/${book._id}`}>
        <div className="book-img">
          <img src={book.book_image} alt={book.title} />
        </div>
        <div className="books-content">
          <h4 className="book-title">{book.title}</h4>
        </div>
      </Link>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object,
};

export default Book;
