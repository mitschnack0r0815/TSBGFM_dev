import mongoose from 'mongoose';

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
});

export default boardSchema;