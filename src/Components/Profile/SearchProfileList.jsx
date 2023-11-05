import PropTypes from 'prop-types';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, shallowEqual } from 'react-redux';
import { Avatar } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { message, Button } from 'antd';

const SearchProfileList = ({ profile }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const { user } = useSelector((state) => state.user, shallowEqual);
  const [messageApi, contextHolder] = message.useMessage();

  const token = useRouteLoaderData('token');

  useEffect(() => {
    const following = user.following.some(
      (userObj) => userObj._id === profile._id
    );
    setIsFollowing(following);
  }, [profile._id, user.following]);

  useEffect(() => {
    const friend = user.friends.some((user) => user === profile._id);
    setIsFriend(friend);
  }, [profile._id, user.friends]);

  useEffect(() => {
    const sentRequest = user.request_sent.some((user) => user === profile._id);
    setIsRequestSent(sentRequest);
  }, [profile._id, user.request_sent]);

  const { isLoading, mutate: handleFollow } = useMutation({
    mutationFn: async ({ id }) => {
      const action = isFollowing ? 'unfollow' : 'follow';
      return await axios.post(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/${action}/${id}`,
        null,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      setIsFollowing((prevState) => !prevState);
      messageApi.open({
        type: 'success',
        content: data.data.message,
      });
    },
    onError: (err) => {
      messageApi.open({
        type: 'error',
        content: err.message,
      });
    },
  });

  const { isLoading: loading, mutate: handleFriendRequest } = useMutation({
    mutationFn: async ({ id }) => {
      const action = isRequestSent
        ? 'cancel-request'
        : isFriend
        ? 'unfriend'
        : 'send-request';
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
    onSuccess: (data) => {
      if (isFriend) {
        setIsFriend((prevState) => !prevState);
      } else {
        setIsRequestSent((prevState) => !prevState);
      }
      messageApi.open({
        type: 'success',
        content: data.data.message,
      });
    },
    onError: (err) => {
      messageApi.open({
        type: 'error',
        content: err.message,
      });
    },
  });

  return (
    <>
      {contextHolder}
      <li>
        <div className="friend-item">
          <div className="friend-left">
            <div className="friend-img">
              <Avatar src={profile.photo} alt={profile.name} size="large" />
            </div>
            <div className="friend-detail ps-2">
              <h6
                className=""
                style={{
                  fontWeight: 700,
                  fontSize: '14px',
                  margin: '0',
                }}
              >
                <Link to={`/profile/${profile._id}`}>{profile.name}</Link>
              </h6>
              <div className="">{profile.email}</div>
            </div>
          </div>
          <div className="friend-right">
            <Button
              type="primary"
              className="button-solid"
              onClick={() => handleFriendRequest({ id: profile._id })}
              loading={loading}
            >
              {isRequestSent ? 'cancel' : isFriend ? 'unfriend' : 'add friend'}
            </Button>
            <Button
              className="button-outline"
              onClick={() => handleFollow({ id: profile._id })}
              loading={isLoading}
            >
              {isFollowing ? 'following' : 'follow'}
            </Button>
          </div>
        </div>
      </li>
    </>
  );
};

SearchProfileList.propTypes = {
  profile: PropTypes.object,
};

export default SearchProfileList;
