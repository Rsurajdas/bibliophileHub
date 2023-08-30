import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { Rating } from '@mui/material';
import axios from 'axios';
import Button from '../Btn/Button';
import SelectSelf from '../Shelf/SelectShelf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableRow = ({
  book,
  shelves,
  shelfId,
  shelfName,
  removeBook,
  handleUpdateShelf,
}) => {
  const [open, setOpen] = useState(false);
  const [saveRating, setSavRating] = useState(0);
  const token = useRouteLoaderData('token');

  const handleRating = async (e, newValue) => {
    try {
      if (!saveRating) {
        const ratingData = {
          rating: newValue,
        };
        const res = await axios.post(
          `http://127.0.0.1:3000/api/v1/books/${book.book._id}/reviews`,
          ratingData,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const { data } = res;
        setSavRating(data.data.review.rating);
        toast.success(`${newValue} star rating is saved`);
      } else {
        const ratingData = {
          rating: newValue,
        };
        const res = await axios.patch(
          `http://127.0.0.1:3000/api/v1/books/${book.book._id}/reviews`,
          ratingData,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const { data } = res;
        setSavRating(data.data.review.rating);
        toast.success(`Rating updated to ${newValue} star rating`);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (book.review?.rating) {
      setSavRating(book.review.rating);
    } else {
      setSavRating(0);
    }
  }, []);

  return (
    <>
      <tr key={book.book._id}>
        <td style={{ width: '70px' }}>
          <div className="">
            <Link to={`/book/${book.book._id}`}>
              <img
                src={book.book.book_image}
                alt={book.book.title}
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
          <div>{book.book.title}</div>
        </td>
        <td
          style={{
            width: '90px',
          }}
        >
          <div>{book.book.author.name}</div>
        </td>
        <td
          style={{
            width: '90px',
          }}
        >
          <div>{book.book.publisher}</div>
        </td>
        <td
          style={{
            width: '110px',
          }}
        >
          <Rating
            name="book-rating"
            value={saveRating}
            size="small"
            onChange={handleRating}
          />
        </td>
        <td
          style={{
            width: '120px',
          }}
        >
          <div>
            {!shelfName ? book.shelves[0].shelf_name : shelfName}{' '}
            <Button
              text="[edit]"
              variant="text"
              sx={{ fontSize: '10px' }}
              onClick={() => setOpen(true)}
            />
          </div>
        </td>
        <td>
          <Link to="/">Write Review</Link>
        </td>
        <td>
          {!shelfId ? (
            <Button
              variant="text"
              text="X"
              onClick={() =>
                removeBook(book.shelves[0].shelf_id, book.book._id)
              }
            />
          ) : (
            <Button
              variant="text"
              text="X"
              onClick={() => removeBook(shelfId, book.book._id)}
            />
          )}
          <ToastContainer position="bottom-left" />
        </td>
        {!shelfId ? (
          <SelectSelf
            open={open}
            shelves={shelves}
            setOpen={setOpen}
            handleShelf={handleUpdateShelf(
              book.shelves[0].shelf_id,
              book.book._id
            )}
          />
        ) : (
          <SelectSelf
            open={open}
            shelves={shelves}
            setOpen={setOpen}
            handleShelf={handleUpdateShelf(shelfId, book.book._id)}
          />
        )}
      </tr>
    </>
  );
};

TableRow.propTypes = {
  book: PropTypes.object,
  handleRating: PropTypes.func,
  shelves: PropTypes.array,
  shelfId: PropTypes.string,
  shelfName: PropTypes.string,
  removeBook: PropTypes.func,
  handleUpdateShelf: PropTypes.func,
  saveRating: PropTypes.number,
};

export default TableRow;
