import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from 'src/app/services/event.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventModalComponent } from '../event-modal/event-modal.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [FullCalendarModule, EventModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  formData: any = {
    id: '',
    title: '',
    startDate: '',
    endDate: '',
    allDay: false,
    description: '',
    location: '',
    category: 'autre',
    recurring: null,
  };

  isOpen: boolean = false;
  mode: 'create' | 'edit' = 'create';

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };
  

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(events => {
      this.calendarOptions.events = events.map(event => ({
        id: event._id,
        title: event.title,
        start: event.startDate,
        end: event.endDate,
        allDay: event.allDay,
      }));
    });
  }

  handleDateClick(arg: any) {
    this.formData = {
      title: '',
      startDate: arg.dateStr,
      endDate: '',
      allDay: false,
      description: '',
      location: '',
      category: 'autre',
      recurring: null,
    };
    this.isOpen = true;
    this.mode = 'create';
  }
  
  handleEventClick(arg: any) {
    const event = arg.event;
    this.formData = {
      id: event.id,
      title: event.title,
      startDate: event.start?.toISOString().slice(0, 16),
      endDate: event.end?.toISOString().slice(0, 16),
      allDay: event.allDay,
      description: '',
      location: '',
      category: 'autre',
      recurring: null,
    };
    this.isOpen = true;
    this.mode = 'edit';
  }
  

  onSave(eventData: any) {
    if (this.mode === 'create') {
      this.eventService.createEvent(eventData).subscribe(() => {
        alert('Événement créé avec succès');
        this.loadEvents();
        this.isOpen = false;
      });
    } else if (this.mode === 'edit') {
      this.eventService.updateEvent(eventData.id, eventData).subscribe(() => {
        alert('Événement modifié avec succès');
        this.loadEvents();
        this.isOpen = false;
      });
    }
  }
  
  onDelete(eventId: string) {
    console.log('ID reçu pour suppression :', eventId);
  
    if (!eventId) {
      console.error('ID de l\'événement non défini !');
      return;
    }
  
    this.eventService.deleteEvent(eventId).subscribe(() => {
      console.log('Événement supprimé avec succès');
      alert('Événement supprimé avec succès');
      this.loadEvents();
      this.isOpen = false;
    }, error => {
      console.error('Erreur lors de la suppression :', error);
      alert('Échec de la suppression de l\'événement');
    });
  }
  
  onClose() {
    this.isOpen = false;
  }
}
