import { useParams } from 'react-router-dom';
import ProfileList from '../Components/Profile/ProfileList';
import { useSocials } from '../hooks/useSocials';
import LoadingScreen from '../LoadingScreen';
import Title from '../Components/UI/Title';
import { useSocialHandleFunc } from '../hooks/useSocialHandleFunc';

const Following = () => {
  const { profileId } = useParams();
  const { data, isLoading } = useSocials('following', profileId);
  const [handleUnfollow] = useSocialHandleFunc('unfollow');

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
              Following
            </h6>
          }
        />
        <ul>
          {data.map((friend) => (
            <ProfileList
              profile={friend}
              key={friend._id}
              btnName='unfollow'
              handleFunc={handleUnfollow}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Following;
