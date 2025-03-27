import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
    trim: true
  },
  faction: {
    type: String,
    required: true,
    trim: true
  },
  charList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CharList', 
    required: true
  }],
  initiative: {
    type: Number,
    required: true,
    default: 0
  },
  extraDice: {
    type: Number,
    required: true,
    default: 2
  },
});

const charListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default: 1
  },
});

const CharList = mongoose.model('CharList', charListSchema);

export const Player = mongoose.model('Player', playerSchema);
export default Player;