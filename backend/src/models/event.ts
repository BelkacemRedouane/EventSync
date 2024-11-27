import mongoose, { Document, Schema } from 'mongoose';

interface IEvent extends Document {
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  recurring?: 'quotidien' | 'hebdomadaire' | 'mensuel' | null;
  category: 'professionnel' | 'personnel' | 'autre';
  priority: 'élevé' | 'moyen' | 'faible';
  createdBy: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
}

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  allDay: { type: Boolean, default: false },
  recurring: { type: String, enum: ['quotidien', 'hebdomadaire', 'mensuel', null], default: null },
  category: { type: String, enum: ['professionnel', 'personnel', 'autre'], default: 'autre' },
  priority: { type: String, enum: ['élevé', 'moyen', 'faible'], default: 'moyen' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model<IEvent>('Event', eventSchema);
export { IEvent };