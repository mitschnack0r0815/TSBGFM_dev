import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  gameNumber: {
    type: Number,
    required: true,
    default: 0
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board', // Reference the Board model
    required: true
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player', // Reference the Char model
    required: true
  }],
  currentTurn: {
    type: Number,
    required: true,
    default: 0
  },
  turnList: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('Game', gameSchema);