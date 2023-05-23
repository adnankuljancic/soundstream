const mongoose= require('mongoose');

const songSchema=new mongooe.Schema({
    title: {
        type: String,
        required: true
      },
      artist: {
        type: String,
        required: true
      },
    genre:String,
    audirUrl:String
});

const Song = mongoose.model('Song',songSchema);

model.exports = Song;