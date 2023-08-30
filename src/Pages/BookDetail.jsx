import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  useLoaderData,
  Link,
  useRouteLoaderData,
  redirect,
} from 'react-router-dom';
import axios from 'axios';
import Button from './../Components/Btn/Button';
import Capitalize from 'lodash.capitalize';
import PostBtn from '../Components/Post/PostBtn';
import parse from 'html-react-parser';
import Title from './../Components/UI/Title';
import Rating from '@mui/material/Rating';
import { ToastContainer, toast } from 'react-toastify';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import './../Components/Post/Post.css';
import './../Components/Btn/Button.css';
import SelectSelf from '../Components/Shelf/SelectShelf';
import 'react-toastify/dist/ReactToastify.css';

const BookDetail = () => {
  const { book, review, user, shelves } = useLoaderData();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isShelved, setIsShelved] = useState(false);
  const [show, setShow] = useState(false);
  const [saveRating, setSavRating] = useState(0);
  const [open, setOpen] = useState(false);
  const token = useRouteLoaderData('token');

  useEffect(() => {
    setIsFollowing(user.following.includes(book.author._id));
  }, []);

  useEffect(() => {
    const isBookInShelf = shelves.some((shelf) => {
      return shelf.books.some((bookObj) => bookObj.book === book._id);
    });

    setIsShelved(isBookInShelf);
  }, [book._id, shelves]);

  useEffect(() => {
    if (review[0]?.rating) {
      setSavRating(review[0].rating);
    } else {
      setSavRating(0);
    }
  }, [review]);

  const handleRating = async (e, newValue) => {
    try {
      if (!saveRating) {
        const ratingData = {
          rating: newValue,
        };
        const res = await axios.post(
          `http://127.0.0.1:3000/api/v1/books/${book._id}/reviews`,
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
          `http://127.0.0.1:3000/api/v1/books/${book._id}/reviews`,
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

  const handleFollowToggle = async (id) => {
    if (!token) return redirect('/signin');

    const action = isFollowing ? 'unfollow' : 'follow';
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/users/${action}/${id}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    await res.json();
    setIsFollowing(!isFollowing);
    window.location.reload(true);
  };

  const handleAddToShelf = async (evt, newValue) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/shelf/add-book/${newValue}/${book._id}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      const data = res.json();
      toast.done(data.message);
      setIsShelved(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <main>
      <section style={{ padding: '20px 0' }}>
        {console.log(review)}
        <Container>
          <Row>
            <Col md={3}>
              <div className="detail-aside text-center">
                <div className="detail-img ">
                  <img src={book.book_image} alt={book.title} />
                </div>
                <PostBtn
                  sx={{ width: '250px', margin: '2rem auto 1rem' }}
                  bookId={book._id}
                  isShelved={isShelved}
                  setOpen={setOpen}
                />
                <div
                  className="btn-wrapper"
                  style={{ width: '250px', margin: '1rem auto 0.2rem' }}
                >
                  <a
                    href={book.amazon_product_url}
                    style={{ width: '250px', borderRadius: '2.5rem' }}
                    className="button button-outline text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy on Amazon IN
                  </a>
                </div>
                <Button
                  text="More Option"
                  variant="text"
                  type="button"
                  sx={{ marginBottom: '1rem' }}
                  onClick={() => setShow(true)}
                />
                <div className="book-rating">
                  {/* {book.reviews.length < 0 && (
                    <Rating
                      size="large"
                      onChange={handleRating}
                      value={book.reviews[0].rating}
                    />
                  )} */}
                  <Rating
                    size="large"
                    onChange={handleRating}
                    value={saveRating}
                  />
                </div>
                <Button type="button" variant="text" text="Rate this book" />
              </div>
            </Col>
            <Col md={9}>
              <div className="detail-content">
                <h1 className="detail-title">
                  {Capitalize(book.title.toLowerCase())}
                </h1>
                <div className="detail-author">{book.author.name}</div>
                <Rating
                  name="read-only"
                  value={4}
                  readOnly
                  size="large"
                  sx={{ padding: '8px', margin: '-8px -8px 0 -8px' }}
                />
                <div className="detail-content">{parse(book.description)}</div>
                <ul
                  className="detail-genres mb-4 border-bottom pb-4 mt-3"
                  style={{ fontSize: '13px' }}
                >
                  {book.genres.map((genre) => (
                    <li key={genre._id}>
                      <Link to={`/genres/${genre._id}/${genre.genre_name}`}>
                        {genre.genre_name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="book-edition pb-4 border-bottom">
                  <Title element={<h6>This edition</h6>} />
                  <div className="edition-item">
                    <dt>Published</dt>
                    <dd>by {book.publisher}</dd>
                  </div>
                  <div className="edition-item">
                    <dt>ISBN</dt>
                    <dd>
                      {book.primary_isbn13} (ISBN10: {book.primary_isbn10})
                    </dd>
                  </div>
                </div>
                <div className="author  mt-4 border-bottom pb-4">
                  <Title element={<h5 className="mb-3">About the author</h5>} />
                  <div className="d-flex align-items-center">
                    <div className="author-left d-flex align-items-center">
                      <div className="author-image">
                        <img
                          src={`http://127.0.0.1:3000${book.author.photo}`}
                          alt=""
                        />
                      </div>
                      <div className="author-details">
                        <h6>{book.author.name}</h6>
                        <div className="">
                          {book.author.followers.length} followers
                        </div>
                      </div>
                    </div>
                    <div className="author-right">
                      <Button
                        type="button"
                        variant="solid"
                        text={isFollowing ? 'Following' : 'Follow'}
                        onClick={() => handleFollowToggle(book.author._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <SelectSelf
        setOpen={setOpen}
        shelves={shelves}
        handleShelf={handleAddToShelf}
        open={open}
      />
      <ToastContainer position="bottom-left" />

      <Dialog onClose={() => setShow(false)} open={show}>
        <DialogTitle>Buy Links</DialogTitle>
        <List>
          {book.buy_links.map((link) => (
            <ListItem key={link._id}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </main>
  );
};

export default BookDetail;
