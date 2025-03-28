import mongoose from 'mongoose';
import weaponSchema from './weapon.js';

const unitSchema = new mongoose.Schema({
  id : {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  faction: {
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

export default mongoose.model('Unit', unitSchema);