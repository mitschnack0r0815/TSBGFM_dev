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
  chars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Char', // Reference the Char model
    required: true
  }],
  currentTurn: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('Game', gameSchema);