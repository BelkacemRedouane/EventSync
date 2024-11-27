import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="modal-backdrop" *ngIf="isOpen">
      <div class="modal">
        <h2>{{ mode === 'create' ? 'Créer un événement' : 'Modifier un événement' }}</h2>
        <form (ngSubmit)="onSubmit()">
          <div>
            <label for="title">Titre</label>
            <input
              type="text"
              id="title"
              [(ngModel)]="formData.title"
              name="title"
              required
            />
          </div>
          <div>
            <label for="start">Date de début</label>
            <input
              type="datetime-local"
              id="start"
              [(ngModel)]="formData.startDate"
              name="start"
              required
            />
          </div>
          <div>
            <label for="end">Date de fin</label>
            <input
              type="datetime-local"
              id="end"
              [(ngModel)]="formData.endDate"
              name="end"
            />
          </div>
          <div class="modal-actions">
            <button type="button" (click)="closeModal()">Annuler</button>
            <button type="submit">{{ mode === 'create' ? 'Créer' : 'Modifier' }}</button>
            <button
              *ngIf="mode === 'edit'"
              type="button"
              (click)="onDelete()"
              class="delete-button"
            >
              Supprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .delete-button {
        background-color: #ff4d4f;
        color: white;
        border: none;
        padding: 8px 16px;
        margin-left: 10px;
        cursor: pointer;
        border-radius: 4px;
      }
      .delete-button:hover {
        background-color: #d9363e;
      }
    `,
  ],
})
export class EventModalComponent {
  @Input() isOpen: boolean = false;
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() formData: any = { title: '', startDate: '', endDate: '' };
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>(); // Émet l'ID de l'événement à supprimer

  onSubmit() {
    this.save.emit(this.formData);
  }

  onDelete() {
    console.log('Suppression déclenchée'); // Debug
    this.delete.emit(this.formData.id);
  }
  

  closeModal() {
    this.close.emit();
  }
}
