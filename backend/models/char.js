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
    default: 100
  },
  armor: {
    type: Number,
    required: true,
    default: 0
  },
  weapon: {
    type: weaponSchema,
    required: true,
    default: () => ({ name: 'Test', dice: '1W6', initiative: 5, type: 'Sword' })
  },
  position: {
    type: [Number],
    required: true,
    default: () => [0, 0]
  },
});

// Instance method to check if the character has no life left
charSchema.methods.noLifeLeft = function() {
  return this.life <= 0;
};

export default mongoose.model('Char', charSchema);