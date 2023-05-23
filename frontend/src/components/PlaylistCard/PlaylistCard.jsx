import Card from 'react-bootstrap/Card';
import playlistImage from '../../assets/images/playlist-cover.jpg';

export const PlaylistCard = () => {
      return (
        <Card className='mx-3' style={{ width: '18rem' }}>
          <Card.Img variant="top" src={playlistImage} />
          <Card.Body>
            <Card.Title>Playlist</Card.Title>
            <Card.Text>
              Playlist that you will enjoy listening to!
            </Card.Text>
          </Card.Body>
        </Card>
      );
}