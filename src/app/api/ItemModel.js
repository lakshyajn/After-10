// models/Item.js
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  addOns: {
    type: [String], // Assuming add-ons are an array of strings
    default: [],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.Item || mongoose.model('Item', itemSchema);