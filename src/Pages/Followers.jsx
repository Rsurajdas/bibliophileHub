import { useParams } from 'react-router-dom';
import ProfileList from '../Components/Profile/ProfileList';
import { useSocials } from '../hooks/useSocials';
import LoadingScreen from '../LoadingScreen';
import Title from '../Components/UI/Title';

const Followers = () => {
  const { profileId } = useParams();
  const { data, isLoading } = useSocials('followers', profileId);

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <div className="friends-wrapper">
        <Title
          element={
            <h6
              className="border-bottom pb-2 mb-2"
              style={{
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              Followers
            </h6>
          }
        />
        <ul>
          {data.map((friend) => (
            <ProfileList
              key={friend._id}
              profile={friend}
              btnName="following"
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Followers;
