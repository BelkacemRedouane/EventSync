import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the User document
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  profilePicture?: string;
  role: 'user' | 'admin';
  bio?: string;
  preferences: {
    notification: boolean;
    breakFillerCategories: string[];
    autoDetectBreaks: boolean;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  createdEvents: mongoose.Types.ObjectId[];
  participatedEvents: mongoose.Types.ObjectId[];
  tasks: mongoose.Types.ObjectId[];
  accountStatus: {
    isActive: boolean;
    isVerified: boolean;
  };
  lastLogin?: Date;
}

const userSchema = new Schema<IUser>({
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
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
export { IUser };
