import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getUserData } from '../../store/actions/userAction';
import { Avatar, Rating } from '@mui/material';
import { getUserId } from '../../utils/auth';
import { Link, useRouteLoaderData } from 'react-router-dom';
import PostBtn from './PostBtn';
import Button from '../Btn/Button';
import axios from 'axios';
import './Post.css';

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = useRouteLoaderData('token');
  const [postComments, setPostComments] = useState(post.comments);
  const userId = getUserId();
  const commentRef = useRef(null);
  const dispatch = useDispatch();

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

  const handleRemoveLike = async (postId, user_id) => {
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/posts/${postId}/unlike`,
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

  const handleComment = (postId, user_id) => {
    return async (e) => {
      e.preventDefault();
      const comment = {
        user: user_id,
        text: commentRef.current.value,
      };
      const res = await axios.post(
        `http://127.0.0.1:3000/api/v1/posts/${postId}/add-comment`,
        comment,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const { data } = res;
      setPostComments(data.post.comments);
      commentRef.current.value = '';
    };
  };

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const { user } = useSelector((state) => state.user, shallowEqual);

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
            {!liked ? (
              <Button
                type="button"
                variant="text"
                text={`${liked ? 'Unlike' : 'Like'}`}
                onClick={() => handleLike(post._id, userId)}
              />
            ) : (
              <Button
                type="button"
                variant="text"
                text={`${liked ? 'Unlike' : 'Like'}`}
                onClick={() => handleRemoveLike(post._id, userId)}
              />
            )}{' '}
            | <Button type="button" variant="text" text="Comment" />
          </div>
        </div>
        <div className="post-footer">
          {liked && <div className="post-liked">You liked this</div>}
          {postComments && (
            <ul className="post-comments">
              {postComments.map((comment) => (
                <li key={comment._id}>
                  <div className="comment-body">
                    <Avatar
                      alt={comment.user.name}
                      src={`http://127.0.0.1:3000${comment.user.photo}`}
                    />
                    <div className="comment-user">
                      <h6 className="user-name mb-1">{comment.user.name}</h6>
                      <div className="user-comment">{comment.text}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="post-comment">
            <Avatar
              alt={user.name}
              src={`http://127.0.0.1:3000${user.photo}`}
            />
            <form method="post" onSubmit={handleComment(post._id, userId)}>
              <div className="form-group d-flex" style={{ gap: '2%' }}>
                <textarea
                  name="comment"
                  id="comment"
                  style={{ height: '40px' }}
                  ref={commentRef}
                ></textarea>
                <Button
                  variant="solid"
                  text="comment"
                  sx={{ padding: '3px 10px' }}
                  type="submit"
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
