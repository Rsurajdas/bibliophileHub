import Button from '../Btn/Button';
import PropTypes from 'prop-types';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../Context/UserProvider';
import LoadingScreen from '../../LoadingScreen';

const SearchProfileList = ({ profile }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  const { user, isLoading } = useUser();

  const token = useRouteLoaderData('token');

  useEffect(() => {
    const isFollowing = user.following.some(
      (userObj) => userObj._id === profile._id
    );
    setIsFollowing(isFollowing);
  }, [profile._id, user.following]);

  useEffect(() => {
    const isFriend = user.friends.some(
      (userObj) => userObj._id === profile._id
    );
    setIsFriend(isFriend);
  }, [profile._id, user.friends]);

  const handleFollowToggle = async (id) => {
    try {
      const action = isFollowing ? 'unfollow' : 'follow';
      const res = await fetch(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/${action}/${id}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      await res.json();
      setIsFollowing(!isFollowing);
      // window.location.reload(true);
      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <li>
      <div className='friend-item'>
        <div className='friend-left'>
          <div className='friend-img'>
            <img src={profile.photo} alt={profile.name} />
          </div>
          <div className='friend-detail ps-2'>
            <h6
              className=''
              style={{
                fontWeight: 700,
                fontSize: '14px',
                margin: '0',
              }}>
              <Link to={`/profile/${profile._id}`}>{profile.name}</Link>
            </h6>
            <div className=''>{profile.email}</div>
          </div>
        </div>
        <div className='friend-right'>
          <Button
            text={isFriend ? 'unfriend' : 'add friend'}
            variant='solid'
            sx={{
              display: 'block',
              marginBottom: '10px',
            }}
          />
          <Button
            text={isFollowing ? 'following' : 'follow'}
            variant='solid'
            sx={{
              display: 'block',
              backgroundColor: '#207e20',
              marginLeft: 'auto',
            }}
            onClick={() => handleFollowToggle(profile._id)}
          />
        </div>
      </div>
      <ToastContainer position='bottom-left' />
    </li>
  );
};

SearchProfileList.propTypes = {
  profile: PropTypes.object,
};

export default SearchProfileList;
