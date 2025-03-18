import mongoose from 'mongoose';

import boardSchema from './board.js';
import charSchema from './char.js';

const gameSchema = new mongoose.Schema({
  gameNumber: {
    type: Number,
    required: true,
    default: 0
  },
  board: {
    type: boardSchema,
    required: true
  },
  chars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Char', // Reference the Char model
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('Game', gameSchema);