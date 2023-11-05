import { useState, useEffect } from 'react';
import { Link, useRouteLoaderData, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Spin, message } from 'antd';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Button from './../Components/Btn/Button';
import Capitalize from 'lodash.capitalize';
import PostBtn from '../Components/Post/PostBtn';
import parse from 'html-react-parser';
import Title from './../Components/UI/Title';
import Rating from '@mui/material/Rating';
import SelectSelf from '../Components/Shelf/SelectShelf';
import LoadingScreen from '../LoadingScreen';
import { getUserId } from '../utils/auth';
import { useShelves } from '../hooks/useShelves';
import 'react-toastify/dist/ReactToastify.css';
import './../Components/Post/Post.css';
import './../Components/Btn/Button.css';

const BookDetail = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isShelved, setIsShelved] = useState(false);
  const [saveRating, setSavRating] = useState(0);
  const [open, setOpen] = useState(false);
  const token = useRouteLoaderData('token');
  const { id } = useParams();
  const userId = getUserId();
  const { shelves } = useShelves();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    data,
    isLoading: bookLoading,
    isFetching,
  } = useQuery({
    queryKey: ['book-detail', id, token],
    queryFn: () => {
      return axios.get(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/books/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    },
    select: (data) => data.data.data,
  });

  const {
    data: user,
    isLoading: userLoading,
    isFetching: userFetching,
  } = useQuery({
    queryKey: ['get-user', userId, token],
    queryFn: () => {
      return axios.get(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/get-user/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    },
    select: (data) => data.data.data.user,
  });

  const items = data?.book.buy_links.map((item) => {
    return {
      key: item._id,
      label: (
        <a target="_blank" rel="noopener noreferrer" href={item.url}>
          {item.name}
        </a>
      ),
    };
  });

  useEffect(() => {
    const following = user?.following.some(
      (userObj) => userObj._id === data?.book.author._id
    );
    setIsFollowing(following);
  }, [data?.book.author._id, user?.following]);

  useEffect(() => {
    const isBookInShelf = shelves?.some((shelf) => {
      return shelf.books.some((bookObj) => bookObj.book === data?.book._id);
    });

    setIsShelved(isBookInShelf);
  }, [data?.book._id, shelves]);

  useEffect(() => {
    if (data?.review[0]?.rating) {
      setSavRating(data?.review[0].rating);
    } else {
      setSavRating(0);
    }
  }, [data?.review]);

  const { mutate: handleRating } = useMutation({
    mutationFn: async ({ newValue }) => {
      const ratingData = {
        rating: newValue,
      };
      if (!saveRating) {
        return await axios.post(
          `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/books/${id}/reviews`,
          ratingData,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
      } else {
        return axios.patch(
          `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/books/${id}/reviews`,
          ratingData,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
      }
    },
    onSuccess: (data) => {
      setSavRating(data.data.data.review.rating);
      messageApi.open({
        type: 'success',
        content: `${data.data.data.review.rating} star rating is saved`,
      });
      queryClient.invalidateQueries({
        queryKey: ['book-detail', id, token],
      });
    },
    onError: (err) => {
      messageApi.open({
        type: 'error',
        content: err.message,
      });
    },
  });
  const { mutate: followToggle } = useMutation({
    mutationFn: async ({ id }) => {
      const action = isFollowing ? 'unfollow' : 'follow';
      return axios.post(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/${action}/${id}`,
        null,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      setIsFollowing((prevState) => !prevState);
      queryClient.invalidateQueries({
        queryKey: ['book-detail', id, token],
      });
    },
  });
  const { isLoading: isAdding, mutate: addToShelf } = useMutation({
    mutationFn: async ({ id }) => {
      await axios.post(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/shelf/add-book/${id}/${data?.book._id}`,
        null,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      setIsShelved(true);
      queryClient.invalidateQueries({
        queryKey: ['book-detail', id, token],
      });
    },
  });

  if (bookLoading || userLoading) return <LoadingScreen />;

  return (
    <main>
      {contextHolder}
      <section style={{ padding: '20px 0' }}>
        <Container>
          <Row>
            <Col md={3}>
              <div className="detail-aside text-center">
                <div className="detail-img ">
                  <img src={data?.book.book_image} alt={data?.book.title} />
                </div>
                <PostBtn
                  sx={{ width: '250px', margin: '2rem auto 1rem' }}
                  bookId={data?.book._id}
                  isShelved={isShelved}
                  isFetching={isAdding}
                  setOpen={setOpen}
                />
                <div
                  className="btn-wrapper"
                  style={{ width: '250px', margin: '1rem auto 0.5rem' }}
                >
                  <a
                    href={data?.book.amazon_product_url}
                    style={{ width: '250px', borderRadius: '2.5rem' }}
                    className="button button-outline text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy on Amazon IN
                  </a>
                </div>
                <Dropdown
                  menu={{
                    items,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      More Links
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
                <div className="book-rating" style={{ marginTop: '0.3rem' }}>
                  <Rating
                    size="large"
                    onChange={(e, newValue) => handleRating({ newValue })}
                    value={saveRating}
                  />
                </div>
              </div>
            </Col>
            <Col md={9}>
              <div className="detail-content">
                <h1 className="detail-title">
                  {Capitalize(data?.book.title.toLowerCase())}
                </h1>
                <div className="detail-author">{data?.book.author.name}</div>
                <Rating
                  name="read-only"
                  value={data?.averageRating}
                  readOnly
                  size="large"
                  sx={{ padding: '8px', margin: '-8px -8px 0 -8px' }}
                />
                <div className="detail-content">
                  {parse(data?.book.description)}
                </div>
                <ul
                  className="detail-genres mb-4 border-bottom pb-4 mt-3"
                  style={{ fontSize: '13px' }}
                >
                  {data?.book.genres.map((genre) => (
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
                    <dd>by {data?.book.publisher}</dd>
                  </div>
                  <div className="edition-item">
                    <dt>ISBN</dt>
                    <dd>
                      {data?.book.primary_isbn13} (ISBN10:{' '}
                      {data?.book.primary_isbn10})
                    </dd>
                  </div>
                </div>
                <div className="author  mt-4 border-bottom pb-4">
                  <Title element={<h5 className="mb-3">About the author</h5>} />
                  <div className="d-flex align-items-center">
                    <div className="author-left d-flex align-items-center">
                      <div className="author-image">
                        <Avatar
                          alt={data?.book.author.name}
                          src={data?.book.author.photo}
                          sx={{ width: '100%', height: '100%' }}
                        />
                      </div>
                      <Spin spinning={userFetching || isFetching}>
                        <div className="author-details">
                          <h6>{data?.book.author.name}</h6>
                          <div className="">
                            {data?.book.author.followers.length} followers
                          </div>
                        </div>
                      </Spin>
                    </div>
                    <div className="author-right">
                      <Button
                        type="button"
                        variant="solid"
                        text={isFollowing ? 'Following' : 'Follow'}
                        onClick={() =>
                          followToggle({ id: data?.book.author._id })
                        }
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
        handleShelf={addToShelf}
        open={open}
        loading={isAdding}
      />
    </main>
  );
};

export default BookDetail;
