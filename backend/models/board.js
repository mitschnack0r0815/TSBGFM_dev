import mongoose from 'mongoose';
import terrainSchema  from './terrain.js';

const boardSchema = new mongoose.Schema({
  x: {
    type: Number,
    required: true,
    default: 10
  },
  y: {
    type: Number,
    required: true,
    default: 10
  },
  map: [[{
    type: Number,
    required: true,
    default: 1
  }]]
});

export default mongoose.model('Board', boardSchema);
