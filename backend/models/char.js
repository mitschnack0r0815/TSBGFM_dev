import mongoose from 'mongoose';
import weaponSchema from './weapon.js';

const charSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  life: {
    type: Number,
    required: true,
    default: 10
  },
  armor: {
    type: Number,
    required: true,
    default: 3
  },
  weapons: {
    first: {
      type: weaponSchema,
      required: true
    },
    second: {
      type: weaponSchema,
      required: false
    }
  },
  moveDistance: {
    type: Number,
    required: true,
    default: 3
  },
  position: {
    x: {
      type: Number,
      required: true,
      default: 0
    },
    y: {
      type: Number,
      required: true,
      default: 0
    }
  }
});

export default mongoose.model('Char', charSchema);