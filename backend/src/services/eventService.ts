import Event, { IEvent } from '../models/event';
import { CreateEventDTO } from '../dtos/CreateEventDTO';
import { UpdateEventDTO } from '../dtos/UpdateEventDTO';

class EventService {
  async getEvents(userId: string): Promise<IEvent[]> {
    return await Event.find({ createdBy: userId });
  }

  async createEvent(eventData: CreateEventDTO): Promise<IEvent> {
    const newEvent = new Event(eventData);
    return await newEvent.save();
  }

  async updateEvent(eventId: string, userId: string, updateData: UpdateEventDTO): Promise<IEvent | null> {
    const event = await Event.findById(eventId);
    if (!event || event.createdBy.toString() !== userId) {
      throw new Error('Non autorisé ou événement non trouvé.');
    }

    Object.assign(event, updateData);
    return await event.save();
  }

  async deleteEvent(eventId: string, userId: string): Promise<void> {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error('Événement non trouvé.');
    }
    if (event.createdBy.toString() !== userId) {
      throw new Error('Non autorisé.');
    }

    await event.deleteOne();
  }
}

export default new EventService();
