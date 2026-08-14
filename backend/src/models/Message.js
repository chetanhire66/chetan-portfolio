import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, trim: true, default: '' },
  message: { type: String, required: true, trim: true },
  status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' },
}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema);
