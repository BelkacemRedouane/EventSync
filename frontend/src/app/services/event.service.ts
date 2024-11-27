import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { from } from 'rxjs'; // Utilisé pour convertir une Promise en Observable

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = '/events';

  constructor(private http: HttpService) {}

  getEvents(): Observable<any[]> {
    return from(this.http.get(this.apiUrl)); // Conversion Promise -> Observable
  }

  createEvent(event: any): Observable<any> {
    return from(this.http.post(this.apiUrl, event)); // Conversion Promise -> Observable
  }

  updateEvent(eventId: string, updatedData: any): Observable<any> {
    return from(this.http.put(`${this.apiUrl}/${eventId}`, updatedData)); // Conversion Promise -> Observable
  }

  deleteEvent(eventId: string): Observable<any> {
    console.log('Appel API pour suppression ID :', eventId); // Debug
    return from(this.http.delete(`${this.apiUrl}/${eventId}`)); // Conversion Promise -> Observable
  }
  
}
