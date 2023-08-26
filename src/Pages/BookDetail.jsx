import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  useLoaderData,
  Link,
  useRouteLoaderData,
  redirect,
} from 'react-router-dom';
import Button from './../Components/Btn/Button';
import Capitalize from 'lodash.capitalize';
import PostBtn from '../Components/Post/PostBtn';
import parse from 'html-react-parser';
import Rating from '@mui/material/Rating';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { ToastContainer, toast } from 'react-toastify';
import './../Components/Post/Post.css';
import './../Components/Btn/Button.css';
import 'react-toastify/dist/ReactToastify.css';

const BookDetail = () => {
  const { book, user, shelves } = useLoaderData();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isShelved, setIsShelved] = useState(false);
  const [open, setOpen] = useState(false);
  const [shelfId, setShelfId] = useState('');
  const token = useRouteLoaderData('token');

  useEffect(() => {
    setIsFollowing(user.following.includes(book.author._id));
  }, []);

  useEffect(() => {
    for (const shelf of shelves) {
      if (shelf.books.includes(book._id)) {
        setIsShelved(true);
      }
    }
  }, []);

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
        <Container>
          <Row>
            <Col md={3}>
              <div className="detail-aside">
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
                  style={{ width: '250px', margin: '1rem auto' }}
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
                <ul className="detail-genres mb-4 border-bottom pb-4">
                  {book.genres.map((genre) => (
                    <li key={genre._id}>
                      <Link to={genre.genre_name_encoded}>
                        {genre.genre_name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="book-edition pb-4 border-bottom">
                  <h6>This edition</h6>
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
                <div className="author d-flex mt-4 border-bottom pb-4">
                  <div className="author-left d-flex ">
                    <div className="author-image">
                      <img
                        src={`http://127.0.0.1:3000${book.author.photo}`}
                        alt=""
                      />
                    </div>
                    <div className="author-details mt-1">
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
            </Col>
          </Row>
        </Container>
      </section>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="size-modal-title"
          aria-describedby="size-modal-description"
          size="sm"
        >
          <ModalClose />
          <div className="shelf-container">
            <h6 className="mb-4">Choose a shelf for this book</h6>
            <Select placeholder="Choose a shelf" onChange={handleAddToShelf}>
              {shelves &&
                shelves.map((shelf) => (
                  <Option value={shelf._id} key={shelf._id}>
                    {shelf.shelf_name}
                  </Option>
                ))}
            </Select>
            <Button
              text="Done"
              variant="outline"
              onClick={() => setOpen(false)}
              sx={{ marginTop: '10px' }}
            />
          </div>
        </ModalDialog>
      </Modal>
    </main>
  );
};

export default BookDetail;
