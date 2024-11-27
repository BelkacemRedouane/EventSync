import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { catchError, from, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = '/tasks';

  constructor(private http: HttpService) {}

  getTasks(): Observable<any[]> {
    // Conversion de Promise en Observable avec `from`
    return from(this.http.get(this.apiUrl));
  }

  createTask(task: any): Observable<any> {
    return from(this.http.post(this.apiUrl, task)).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de la tâche :', error.message);
        return throwError(() => new Error(error.response?.data?.message || 'Erreur serveur.'));
      })
    );
  }

  updateTask(taskId: string, updatedData: any): Observable<any> {
    return from(this.http.put(`${this.apiUrl}/${taskId}`, updatedData));
  }

  deleteTask(taskId: string): Observable<any> {
    return from(this.http.delete(`${this.apiUrl}/${taskId}`));
  }
}
