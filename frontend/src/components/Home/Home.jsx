import { CardGroup } from 'react-bootstrap';
import { PlaylistCard } from '../PlaylistCard/PlaylistCard';
export const Home = () => {
  return (
    <div className='container'>
      <h1 className='mt-5'>Welcome to SoundStream!</h1>
      <p className='mb-5'>Select a playlist and enjoy listening.</p>
      <CardGroup>
      <PlaylistCard></PlaylistCard>
      <PlaylistCard></PlaylistCard>
      <PlaylistCard></PlaylistCard>
      </CardGroup>
    </div>

  );
};
