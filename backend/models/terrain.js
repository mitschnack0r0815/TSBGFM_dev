import mongoose from 'mongoose';

const terrainSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['none', 'water', 'land', 'forest', 'mountain'],
    required: true
  }
})

export default mongoose.model('Terrain', terrainSchema);