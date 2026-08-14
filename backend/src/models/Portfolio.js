import mongoose from 'mongoose';

// A single, versioned document keeps the CMS content atomic and easy to back up.
const portfolioSchema = new mongoose.Schema({
  key: { type: String, default: 'primary', unique: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true, minimize: false });

export const Portfolio = mongoose.model('Portfolio', portfolioSchema);
