import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { Rating } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, Spin, message } from 'antd';
import axios from 'axios';
import Button from '../Btn/Button';
import SelectSelf from '../Shelf/SelectShelf';
import 'react-toastify/dist/ReactToastify.css';

const TableRow = ({ book, shelfId, removeBook }) => {
  const [open, setOpen] = useState(false);
  const [saveRating, setSavRating] = useState(0);
  const token = useRouteLoaderData('token');
  const reviewRef = useRef(null);
  const [isReviewAvailable, setIsReviewAvailable] = useState(false);
  const [review, setReview] = useState('');
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { isLoading: isUpdating, mutate: updateShelf } = useMutation({
    mutationFn: async ({ id }) => {
      console.log({ bookID: book.book._id, shelfID: book.shelf.shelf_id });
      const shelfData = {
        fromShelfId: shelfId === 'all' ? book.shelf.shelf_id : shelfId,
        toShelfId: id,
      };
      await axios.patch(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/shelf/move-book/${book.book._id}`,
        shelfData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-shelf-books', shelfId, token],
      });
    },
  });

  const { isLoading, mutate: handleRating } = useMutation({
    mutationFn: async ({ newValue }) => {
      const ratingData = {
        rating: newValue,
        review: reviewRef.current.value,
      };

      if (!isReviewAvailable) {
        return await axios.post(
          `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/books/${book.book._id}/reviews`,
          ratingData,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
      } else {
        return axios.patch(
          `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/books/${book.book._id}/reviews`,
          ratingData,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
      }
    },
    onSuccess: (data) => {
      setSavRating(data.data.data.review.rating);
      setReview(data.data.data.review.review);
      messageApi.open({
        type: 'success',
        content: `${data.data.data.review.rating} star rating is saved`,
      });
      setIsModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: ['get-shelf-books', shelfId, token],
      });
    },
    onError: (err) => {
      messageApi.open({
        type: 'error',
        content: err.message,
      });
    },
  });

  useEffect(() => {
    if (book?.review) {
      setIsReviewAvailable(true);
    }
  }, [book?.review]);

  useEffect(() => {
    if (book.review?.rating) {
      setSavRating(book.review?.rating);
    }
  }, [book.review?.rating]);

  useEffect(() => {
    if (book.review?.review) {
      setReview(book.review?.review);
    }
  }, [book.review?.review]);

  return (
    <>
      {contextHolder}
      <tr>
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
            value={book.review?.rating}
            size="small"
            readOnly={true}
          />
        </td>
        <td
          style={{
            width: '120px',
          }}
        >
          <div>
            {book.shelf.shelf_name}{' '}
            <Button
              text="[edit]"
              variant="text"
              sx={{ fontSize: '10px' }}
              onClick={() => setOpen(true)}
            />
          </div>
        </td>
        <td>
          {!review ? (
            <Button
              text="Write Review"
              variant="text"
              onClick={() => showModal(true)}
            />
          ) : (
            <p>
              {review}{' '}
              <Button
                text="[edit]"
                variant="text"
                sx={{ fontSize: '10px' }}
                onClick={() => showModal(true)}
              />
            </p>
          )}
        </td>
        <td>
          <Button
            variant="text"
            text="X"
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
        </td>
        <SelectSelf
          open={open}
          setOpen={setOpen}
          handleShelf={updateShelf}
          loading={isUpdating}
        />
      </tr>
      <Modal
        title="Write a review"
        open={isModalOpen}
        onOk={() => handleRating({ newValue: saveRating })}
        onCancel={handleCancel}
        footer={[
          <Button
            key={'cancel'}
            text="Cancel"
            variant="solid"
            onClick={handleCancel}
            sx={{
              backgroundColor: '#b8b8b8',
              marginRight: '10px',
            }}
            type="button"
          />,
          <Button
            key={'submit'}
            text="Submit"
            variant="solid"
            type="submit"
            onClick={() => handleRating({ newValue: saveRating })}
          />,
        ]}
      >
        {' '}
        <Spin spinning={isLoading}>
          <div className="modal_top">
            <div className="my-3">
              <Rating
                name="book-rating"
                value={saveRating}
                size="large"
                onChange={(e) => setSavRating(e.target.value)}
              />
            </div>
          </div>
          <div className="modal_bottom">
            <form action="post">
              <div className="form-group">
                <textarea
                  name="review"
                  id="review"
                  cols="50"
                  rows="30"
                  className="form-input"
                  style={{ height: '90px' }}
                  placeholder="write a review"
                  ref={reviewRef}
                  defaultValue={book.review?.review}
                ></textarea>
              </div>
            </form>
          </div>
        </Spin>
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
