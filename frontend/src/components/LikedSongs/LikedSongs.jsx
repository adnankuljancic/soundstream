import "./LikedSongs.css";
import { Player } from "../Player/Player"
export const LikedSongs = () => {
  const songs = [
    {
      name: 'Shape of You',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      name: 'Dance Monkey',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      name: 'Blinding Lights',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
  ];
  
  return (
    <div>
      <div className='py-4'>
        <h1 className='ms-5'>Liked songs</h1>
      </div>
      <Player songs={songs}/>

    </div>
  );
};