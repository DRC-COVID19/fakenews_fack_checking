import mongoose from 'mongoose';

const Category = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);
