const Event = require('../models/event');

// Obtenir tous les événements
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Créer un événement
exports.createEvent = async (req, res) => {
  const { title, description, location, startDate, endDate, allDay, recurring, category } = req.body;
  try {
    const newEvent = new Event({
      title,
      description,
      location,
      startDate,
      endDate,
      allDay,
      recurring,
      category,
      createdBy: req.user.id,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Mettre à jour un événement
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event || event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Non autorisé.' });
    }

    Object.assign(event, req.body);
    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  console.log('Requête de suppression reçue. ID :', id); // Debug
  try {
    const event = await Event.findById(id);
    if (!event) {
      console.log('Événement non trouvé pour ID :', id); // Debug
      return res.status(404).json({ message: 'Événement non trouvé.' });
    }
    if (event.createdBy.toString() !== req.user.id) {
      console.log('Utilisateur non autorisé à supprimer cet événement'); // Debug
      return res.status(403).json({ message: 'Non autorisé.' });
    }

    await event.remove();
    console.log('Événement supprimé avec succès'); // Debug
    res.status(200).json({ message: 'Événement supprimé.' });
  } catch (error) {
    console.error('Erreur serveur lors de la suppression :', error.message); // Debug
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

