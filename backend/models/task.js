const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['urgent', 'moyen', 'faible'], default: 'moyen' },
  startDateTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > Date.now();
      },
      message: 'La date et l’heure de début doivent être dans le futur.',
    },
  },
  endDateTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.startDateTime;
      },
      message: 'La date et l’heure de fin doivent être postérieures à la date de début.',
    },
  },
  status: { type: String, enum: ['à faire', 'en cours', 'terminé'], default: 'à faire' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assurez-vous que ce champ est défini comme requis
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

module.exports = mongoose.model('Task', taskSchema);
