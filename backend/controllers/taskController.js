const Task = require('../models/task');


// Récupérer les tâches et sous-tâches de l'utilisateur connecté
exports.getTasks = async (req, res) => {
  try {
    // Rechercher toutes les tâches créées par l'utilisateur connecté
    const tasks = await Task.find({ createdBy: req.user.id })
      .populate('event') // Si les tâches sont liées à des événements
      .lean(); // Convertir les documents Mongoose en objets JavaScript purs

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};


// Créer une tâche
exports.createTask = async (req, res) => {
  const { title, description, startDateTime, endDateTime, priority, event, subTasks } = req.body;

  // Vérification utilisateur
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Utilisateur non authentifié.' });
  }

  // Validation des champs
  if (!title) {
    return res.status(400).json({ message: 'Le titre est obligatoire.' });
  }

  if (!startDateTime || new Date(startDateTime) <= new Date()) {
    return res.status(400).json({
      message: 'La date et l’heure de début doivent être dans le futur.',
    });
  }

  if (!endDateTime || new Date(endDateTime) <= new Date(startDateTime)) {
    return res.status(400).json({
      message: 'La date et l’heure de fin doivent être postérieures à la date de début.',
    });
  }

  try {
    const newTask = new Task({
      title,
      description,
      startDateTime,
      endDateTime,
      priority,
      event,
      subTasks,
      createdBy: req.user.id,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Erreur lors de la création de la tâche :', error.message);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};



// Mettre à jour une tâche
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task || task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Non autorisé.' });
    }

    Object.assign(task, req.body);
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task || task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Non autorisé.' });
    }

    await task.remove();
    res.status(200).json({ message: 'Tâche supprimée.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
