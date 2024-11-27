import mongoose, { Document, Schema } from 'mongoose';

interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  type: 'event' | 'task' | 'break';
  title: string;
  message: string;
  isRead: boolean;
  eventId?: mongoose.Types.ObjectId;
  taskId?: mongoose.Types.ObjectId;
  importance: 'faible' | 'moyen' | 'élevé';
  actionURL?: string;
}

const notificationSchema = new Schema<INotification>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['event', 'task', 'break'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  importance: { type: String, enum: ['faible', 'moyen', 'élevé'], default: 'moyen' },
  actionURL: { type: String },
}, { timestamps: true });

export default mongoose.model<INotification>('Notification', notificationSchema);
