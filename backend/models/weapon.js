import mongoose from 'mongoose';

const weaponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  strength: {
    type: Number,
    required: true,
    default: 4
  },
  range: {
    type: Number,
    required: true,
    default: 1
  },
  attacks: {
    type: Number,
    required: true,
    default: 2
  },
  attackPower: {
    type: Number,
    required: true,
    default: 1
  },
  critPower: {
    type: Number,
    required: true,
    default: 2
  },
});

export default weaponSchema;