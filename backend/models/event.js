const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
