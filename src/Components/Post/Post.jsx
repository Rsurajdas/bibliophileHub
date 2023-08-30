import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Avatar, Rating } from '@mui/material';
import { getUserId } from '../../utils/auth';
import { Link, useRouteLoaderData } from 'react-router-dom';
import PostBtn from './PostBtn';
import Button from '../Btn/Button';
import './Post.css';

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = useRouteLoaderData('token');
  const userId = getUserId();

  const handleLike = async (postId, user_id) => {
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/posts/${postId}/like`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setIsLoading(false);
    setLiked(data.post.likes.includes(user_id));
  };

  useEffect(() => {
    setLiked(post.likes.includes(userId));
  }, [post.likes, userId]);

  return (
    <>
      <div className="post">
        <div className="post-avatar">
          <Avatar
            alt={post.user.name}
            src={`http://127.0.0.1:3000${post.user.photo}`}
          />
        </div>
        <div className="post-header">
          <div className="post-by mb-2">
            <p style={{ margin: 0 }}>{post.text}</p>
          </div>
          <div className="post-details">
            <div className="post-img">
              <img src={post.book.book_image} alt={post.book.title} />
            </div>
            <div className="post-content">
              <h4>
                <Link to={`/book/${post.book._id}`}>{post.book.title}</Link>
              </h4>
              <div className="post-author">
                by <Link to="author">{post.book.author.name}</Link>
              </div>
              <div className="post-cta">
                <PostBtn />{' '}
                <div className="post-rating">
                  Rate this :{' '}
                  <Rating
                    name="half-rating-read"
                    defaultValue={0}
                    size="small"
                  />
                </div>
              </div>
              <div className="post-description">
                <p>{post.book.description}</p>
              </div>
            </div>
          </div>
          <div className="post-activity">
            <Button
              type="button"
              variant="text"
              text={`${liked ? 'Unlike' : 'Like'}`}
              onClick={() => handleLike(post._id, userId)}
            />{' '}
            | <Button type="button" variant="text" text="Comment" />
          </div>
        </div>
        <div className="post-footer">
          {liked && <div className="post-liked">You liked this</div>}
          <div className="post-comment">
            <Avatar
              alt={post.user.name}
              src={`http://127.0.0.1:3000${post.user.photo}`}
            />
            <form>
              <div className="form-group">
                <textarea
                  name="comment"
                  id="comment"
                  style={{ height: '40px' }}
                ></textarea>
                <Button
                  variant="solid"
                  text="comment"
                  sx={{ padding: '3px 10px' }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
