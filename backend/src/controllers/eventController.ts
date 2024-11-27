import { Request, Response } from 'express';
import EventService from '../services/eventService';
import { CreateEventDTO } from '../dtos/CreateEventDTO';
import { UpdateEventDTO } from '../dtos/UpdateEventDTO';

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await EventService.getEvents(req.user?.id);
    res.status(200).json(events);
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

export const createEvent = async (req: Request<{}, {}, CreateEventDTO>, res: Response): Promise<void> => {
  const eventData: CreateEventDTO = {
    ...req.body,
    createdBy: req.user?.id,
  };

  try {
    const savedEvent = await EventService.createEvent(eventData);
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Erreur lors de la création de l’événement:", error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updateData: UpdateEventDTO = req.body;

  try {
    const updatedEvent = await EventService.updateEvent(id, req.user?.id, updateData);
    res.status(200).json(updatedEvent);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(403).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await EventService.deleteEvent(id, req.user?.id);
    res.status(200).json({ message: 'Événement supprimé.' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(403).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  }
};

