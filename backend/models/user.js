const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    profilePicture: { type: String, default: '' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    bio: { type: String, maxlength: 500 },
    preferences: {
      notification: { type: Boolean, default: true },
      breakFillerCategories: { type: [String], default: ['détente', 'productivité', 'lecture'] },
      autoDetectBreaks: { type: Boolean, default: true },
    },
    socialLinks: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
    },
    createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    participatedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    accountStatus: {
      isActive: { type: Boolean, default: true },
      isVerified: { type: Boolean, default: false },
    },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
