import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  id : {
    type: Number,
    required: true,
    unique: true
  },
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
  units: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit', // Reference the Char model
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

export const Player = mongoose.model('Player', playerSchema);
export default Player;