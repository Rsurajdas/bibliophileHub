import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { Avatar } from '@mui/material';
import { getUserId } from '../../utils/auth';
import { Link, useRouteLoaderData } from 'react-router-dom';
import Button from '../Btn/Button';
import axios from 'axios';
import './Post.css';
import { useSelector, shallowEqual } from 'react-redux';

const Post = ({ post }) => {
  const { user } = useSelector((state) => state.user, shallowEqual);
  const [liked, setLiked] = useState(false);
  const token = useRouteLoaderData('token');
  const [postComments, setPostComments] = useState(post.comments);
  const userId = getUserId();
  const commentRef = useRef(null);

  const handleLike = async (postId, user_id) => {
    try {
      const action = liked ? 'unlike' : 'like';
      const res = await fetch(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/posts/${postId}/${action}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setLiked(data.post.likes.includes(user_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleComment = (postId, user_id) => {
    return async (e) => {
      e.preventDefault();
      const comment = {
        user: user_id,
        text: commentRef.current.value,
      };
      const res = await axios.post(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/posts/${postId}/add-comment`,
        comment,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const { data } = res;
      setPostComments(data.post.comments);
      commentRef.current.value = '';
    };
  };

  useEffect(() => {
    const isLiked = post.likes.some((userObj) => userObj._id === userId);
    setLiked(isLiked);
  }, [post.likes, userId]);

  return (
    <>
      <div className='post'>
        <div className='post-avatar'>
          <Link to={`/profile/${post.user._id}`}>
            <Avatar alt={post.user.name} src={post.user.photo} />
          </Link>
        </div>
        <div className='post-header'>
          <div className='post-by mb-2'>
            <p style={{ margin: 0 }}>{post.text}</p>
          </div>
          <div className='post-details'>
            <div className='post-img'>
              <img src={post.book.book_image} alt={post.book.title} />
            </div>
            <div className='post-content'>
              <h4>
                <Link to={`/book/${post.book._id}`}>{post.book.title}</Link>
              </h4>
              <div className='post-author'>
                by <Link to='author'>{post.book.author.name}</Link>
              </div>
              {/* <div className="post-cta">
                <PostBtn />{' '}
                <div className="post-rating">
                  Rate this :{' '}
                  <Rating
                    name="half-rating-read"
                    defaultValue={0}
                    size="small"
                  />
                </div>
              </div> */}
              <div className='post-description'>
                <p>{post.book.description}</p>
              </div>
            </div>
          </div>
          <div className='post-activity'>
            <Button
              type='button'
              variant='text'
              text={`${liked ? 'Unlike' : 'Like'}`}
              onClick={() => handleLike(post._id, userId)}
            />{' '}
            |{' '}
            <Button
              type='button'
              variant='text'
              text='Comment'
              onClick={() => commentRef.current.focus()}
            />
          </div>
        </div>
        <div className='post-footer'>
          {liked && <div className='post-liked'>You liked this</div>}
          {postComments && (
            <ul className='post-comments'>
              {postComments.map((comment) => (
                <li key={comment._id}>
                  <div className='comment-body'>
                    <Avatar
                      alt={comment.user.name}
                      src={`${comment.user.photo}`}
                    />
                    <div className='comment-user'>
                      <h6 className='user-name mb-1'>
                        <Link to={`/profile/${comment.user._id}`}>
                          {comment.user.name}
                        </Link>
                      </h6>
                      <div className='user-comment'>{comment.text}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className='post-comment'>
            <Avatar alt={user.name} src={user.photo} />
            <form method='post' onSubmit={handleComment(post._id, userId)}>
              <div className='form-group d-flex' style={{ gap: '2%' }}>
                <textarea
                  name='comment'
                  id='comment'
                  style={{ height: '40px' }}
                  ref={commentRef}></textarea>
                <Button
                  variant='solid'
                  text='comment'
                  sx={{ padding: '3px 10px' }}
                  type='submit'
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
