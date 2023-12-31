import { useParams } from 'react-router-dom';
import { useSocials } from '../hooks/useSocials';
import LoadingScreen from '../LoadingScreen';
import ProfileList from '../Components/Profile/ProfileList';
import Title from '../Components/UI/Title';
import { useSocialHandleFunc } from '../hooks/useSocialHandleFunc.js';

const Friends = () => {
  const { profileId } = useParams();
  const { data, isLoading } = useSocials('friends', profileId);
  const [handleUnfriend] = useSocialHandleFunc('unfriend');

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <div className='friends-wrapper'>
        <Title
          element={
            <h6
              className='border-bottom pb-2 mb-2'
              style={{
                fontWeight: 700,
                fontSize: '14px',
              }}>
              Friends
            </h6>
          }
        />
        <ul>
          {data?.map((friend) => (
            <ProfileList
              key={friend._id}
              profile={friend}
              btnName='unfriend'
              handleFunc={handleUnfriend}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Friends;
