import { Link } from 'react-router-dom';
import Button from '../Btn/Button';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { Avatar } from '@mui/material';

const ProfileList = ({ profile, btnName, handleFunc }) => {
  return (
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
            text={btnName}
            variant="solid"
            onClick={() => handleFunc(profile._id)}
          />
        </div>
      </div>
    </li>
  );
};

ProfileList.propTypes = {
  profile: PropTypes.object,
  btnName: PropTypes.string,
  handleFunc: PropTypes.func,
};

export default ProfileList;
