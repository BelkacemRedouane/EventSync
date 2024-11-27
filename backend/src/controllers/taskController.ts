import { Request, Response } from 'express';
import Task from '../models/task';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({ createdBy: req.user?.id })
      .populate('event')
      .lean();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, startDateTime, endDateTime, priority, event, subTasks } = req.body;

  if (!req.user || !req.user.id) {
    res.status(401).json({ message: 'Utilisateur non authentifié.' });
    return;
  }

  if (!title) {
    res.status(400).json({ message: 'Le titre est obligatoire.' });
    return;
  }

  if (!startDateTime || new Date(startDateTime) <= new Date()) {
    res.status(400).json({ message: 'La date et l’heure de début doivent être dans le futur.' });
    return;
  }

  if (!endDateTime || new Date(endDateTime) <= new Date(startDateTime)) {
    res.status(400).json({ message: 'La date et l’heure de fin doivent être postérieures à la date de début.' });
    return;
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    } else {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task || task.createdBy.toString() !== req.user?.id) {
      res.status(403).json({ message: 'Non autorisé.' });
      return;
    }

    Object.assign(task, req.body);
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task || task.createdBy.toString() !== req.user?.id) {
      res.status(403).json({ message: 'Non autorisé.' });
      return;
    }

    await task.deleteOne();
    res.status(200).json({ message: 'Tâche supprimée.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
