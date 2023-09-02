import { Link, useRouteLoaderData } from 'react-router-dom';
import Button from '../Btn/Button';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileList = ({ profile, btnName }) => {
  const [isActive, setIsActive] = useState(false);
  const token = useRouteLoaderData('token');

  const handleRemove = async (action, user_id) => {
    try {
      const res = await fetch(`https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/${action}/${user_id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      await res.json();
      setIsActive(false);
      window.location.reload(true);
      toast.success(res.message);
    } catch (err) {
      toast.success(err.message);
    }
  };
  return (
    <li>
      <div className="friend-item">
        <div className="friend-left">
          <div className="friend-img">
            <img src={`${profile.photo}`} alt={profile.name} />
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
            text={btnName}
            variant="solid"
            onClick={() => handleRemove(btnName, profile._id)}
          />
        </div>
      </div>
      <ToastContainer position="bottom-left" />
    </li>
  );
};

ProfileList.propTypes = {
  profile: PropTypes.object,
  btnName: PropTypes.string,
};

export default ProfileList;
