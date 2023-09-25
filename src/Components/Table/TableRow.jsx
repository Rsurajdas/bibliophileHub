import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { Rating } from '@mui/material';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import { ModalDialog } from '@mui/joy';
import axios from 'axios';
import Button from '../Btn/Button';
import SelectSelf from '../Shelf/SelectShelf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQueryClient } from '@tanstack/react-query';

const TableRow = ({ book, shelfId, removeBook }) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [saveRating, setSavRating] = useState(0);
  const token = useRouteLoaderData('token');
  const reviewRef = useRef(null);
  const [review, setReview] = useState('');
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries({
          queryKey: ['get-shelf-books'],
        });
        toast.success(data.message);
      } catch (err) {
        toast.error(err.message);
      }
    };
  };

  const handleRating = async (e, newValue) => {
    try {
      e.preventDefault();
      if (!saveRating) {
        const ratingData = {
          rating: newValue,
          review: reviewRef.current.value,
        };
        const res = await axios.post(
          `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/books/${book.book._id}/reviews`,
          ratingData,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const { data } = res;
        setSavRating(data.data.review.rating);
        setReview(data.data.review.review);
        toast.success(`${newValue} star rating is saved`);
        setModalOpen(false);
      } else {
        const ratingData = {
          rating: newValue,
          review: reviewRef.current.value,
        };
        const res = await axios.patch(
          `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/books/${book.book._id}/reviews`,
          ratingData,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const { data } = res;
        setSavRating(data.data.review.rating);
        setReview(data.data.review.review);
        toast.success(`Rating updated to ${newValue} star rating`);
        setModalOpen(false);
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
      <tr>
        <td style={{ width: '70px' }}>
          <div className=''>
            <Link to={`/book/${book.book._id}`}>
              <img
                src={book.book.book_image}
                alt={book.book.title}
                className='cover-img'
              />
            </Link>
          </div>
        </td>
        <td
          style={{
            width: '180px',
          }}>
          <div>{book.book.title}</div>
        </td>
        <td
          style={{
            width: '90px',
          }}>
          <div>{book.book.author.name}</div>
        </td>
        <td
          style={{
            width: '90px',
          }}>
          <div>{book.book.publisher}</div>
        </td>
        <td
          style={{
            width: '110px',
          }}>
          <Rating
            name='book-rating'
            value={saveRating}
            size='small'
            onChange={handleRating}
          />
        </td>
        <td
          style={{
            width: '120px',
          }}>
          <div>
            {book.shelf.shelf_name}{' '}
            <Button
              text='[edit]'
              variant='text'
              sx={{ fontSize: '10px' }}
              onClick={() => setOpen(true)}
            />
          </div>
        </td>
        <td>
          {!review ? (
            <Button
              text='Write Review'
              variant='text'
              onClick={() => setModalOpen(true)}
            />
          ) : (
            <p>{review}</p>
          )}
        </td>
        <td>
          <Button
            variant='text'
            text='X'
            onClick={
              shelfId === 'all'
                ? () =>
                    removeBook({
                      shelf_id: book.shelf.shelf_id,
                      bookId: book.book._id,
                    })
                : () => removeBook({ shelf_id: shelfId, bookId: book.book._id })
            }
          />
          <ToastContainer position='bottom-left' />
        </td>
        <SelectSelf
          open={open}
          setOpen={setOpen}
          handleShelf={
            shelfId === 'all'
              ? handleUpdateShelf(book.shelf.shelf_id, book.book._id)
              : handleUpdateShelf(shelfId, book.book._id)
          }
        />
      </tr>
      <Modal
        aria-labelledby='modal-title'
        aria-describedby='modal-desc'
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ModalDialog
          aria-labelledby='size-modal-title'
          aria-describedby='size-modal-description'
          size='lg'>
          <ModalClose variant='outlined' />
          <div className='modal_top'>
            <h3 style={{ fontSize: '18px' }} className='mb-2'>
              Write a review
            </h3>
            <div className='text-center my-3'>
              <Rating
                name='book-rating'
                value={saveRating}
                size='large'
                onChange={handleRating}
              />
            </div>
          </div>
          <div className='modal_bottom'>
            <form action='post' onSubmit={handleRating}>
              <div className='form-group'>
                <textarea
                  name='review'
                  id='review'
                  cols='50'
                  rows='30'
                  className='form-input'
                  style={{ height: '90px' }}
                  placeholder='write a review'
                  ref={reviewRef}></textarea>
              </div>
              <div className='modal-footer'>
                <Button
                  text='cancel'
                  variant='solid'
                  sx={{
                    backgroundColor: '#b8b8b8',
                    marginRight: '10px',
                  }}
                  type='button'
                />
                <Button text='submit' variant='solid' type='submit' />
              </div>
            </form>
          </div>
        </ModalDialog>
      </Modal>
    </>
  );
};

TableRow.propTypes = {
  book: PropTypes.object,
  shelfId: PropTypes.string,
  removeBook: PropTypes.func,
};

export default TableRow;
