import { useRef } from "react";
import './AudioCard.css';
const AudioCard = ({ song ,onRemove}) => {
    const { _id,title, artist, genre, audioUrl } = song;
  
    const audioRef = useRef(null);

  
    return (
    <div className="card" >
<div className="card-header d-flex justify-content-end sm ">
{onRemove && <button className="btn btn-danger" onClick={()=>onRemove(_id)}>Remove</button>}
</div>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">
      Artist: {artist}
    </p>
    <p className="card-text">
      Genre: {genre}
    </p>
    <div>
        <audio className="audioPlayer" ref={audioRef} src={audioUrl} controls />
      </div>
  </div>
</div>

    );
  };
  
  export default AudioCard;