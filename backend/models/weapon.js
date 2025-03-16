import mongoose from 'mongoose';

const weaponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  dice: {
    type: String,
    required: true,
    default: "1W6"
  },
  initiative: {
    type: Number,
    required: true,
    default: 5
  },
  type: {
    type: String,
    required: true,
    default: 'Sword'
  }
});

export default weaponSchema;