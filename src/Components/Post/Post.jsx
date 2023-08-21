import { useState } from 'react';
import { Avatar, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import PostBtn from './PostBtn';
import Button from '../Btn/Button';
import './Post.css';

const Post = () => {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <div className="post">
        <div className="post-avatar">
          <Avatar
            alt="Remy Sharp"
            src="https://randomuser.me/api/portraits/men/86.jpg"
          />
        </div>
        <div className="post-header">
          <div className="post-by mb-2">
            <p style={{ margin: 0 }}>
              <Link to="profile">Manisha</Link> rated a book
            </p>
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              readOnly
              size="small"
            />
          </div>
          <div className="post-details">
            <div className="post-img">
              <img src="/images/9780375726262.jpg" alt="post img" />
            </div>
            <div className="post-content">
              <h4>
                <Link to="post-detail">Hang the Moon</Link>
              </h4>
              <div className="post-author">
                by <Link to="author">Jeannette Walls</Link>
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
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  quam dolore laborum sunt corporis! Modi incidunt facilis
                  nostrum, exercitationem dolorem nobis, id quis fugit debitis
                  dignissimos quidem nihil placeat velit quaerat nesciunt rerum.
                  Ad possimus fuga voluptatum qui vero itaque, natus nulla
                  beatae quidem mollitia quasi hic nisi autem dignissimos?
                </p>
              </div>
            </div>
          </div>
          <div className="post-activity">
            <Button
              type="button"
              variant="text"
              text={`${liked ? 'Unlike' : 'Like'}`}
              onClick={() => setLiked((l) => !l)}
            />{' '}
            | <Button type="button" variant="text" text="Comment" />
          </div>
        </div>
        <div className="post-footer">
          {liked && <div className="post-liked">You liked this</div>}
          <div className="post-comment">
            <Avatar
              alt="Remy Sharp"
              src="https://randomuser.me/api/portraits/men/86.jpg"
            />
            <form>
              <div className="form-group">
                <textarea
                  name="comment"
                  id="comment"
                  style={{ height: '40px' }}
                ></textarea>
                <Button
                  type="solid"
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

export default Post;
