import mongoose, { Document, Schema } from 'mongoose';

interface ISubTask {
  title: string;
  status: 'à faire' | 'en cours' | 'terminé';
}

interface ITask extends Document {
  title: string;
  description?: string;
  priority: 'urgent' | 'moyen' | 'faible';
  startDateTime: Date;
  endDateTime: Date;
  status: 'à faire' | 'en cours' | 'terminé';
  createdBy: mongoose.Types.ObjectId;
  event?: mongoose.Types.ObjectId;
  subTasks: ISubTask[];
  repeat?: 'quotidien' | 'hebdomadaire' | 'mensuel' | null;
  dependencies: mongoose.Types.ObjectId[];
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['urgent', 'moyen', 'faible'], default: 'moyen' },
  startDateTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (value: Date) {
        return value.getTime() > Date.now();
      },
      message: "La date et l'heure de début doivent être dans le futur.",
    },
  },
  endDateTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (value: Date) {
        return value > this.startDateTime;
      },
      message: 'La date et l’heure de fin doivent être postérieures à la date de début.',
    },
  },
  status: { type: String, enum: ['à faire', 'en cours', 'terminé'], default: 'à faire' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  subTasks: [
    {
      title: { type: String, required: true },
      status: { type: String, enum: ['à faire', 'en cours', 'terminé'], default: 'à faire' },
    },
  ],
  repeat: { type: String, enum: ['quotidien', 'hebdomadaire', 'mensuel', null], default: null },
  dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

export default mongoose.model<ITask>('Task', taskSchema);
