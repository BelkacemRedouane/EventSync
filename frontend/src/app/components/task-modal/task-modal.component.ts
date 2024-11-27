import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent {
  @Input() isOpen: boolean = false; // Indique si le modal est ouvert
  @Input() mode: 'create' | 'edit' = 'create'; // Mode (création ou modification)
  @Input() formData: any = { title: '', priority: 'moyen', status: 'à faire' }; // Données du formulaire
  @Output() save = new EventEmitter<any>(); // Événement déclenché pour sauvegarder
  @Output() close = new EventEmitter<void>(); // Événement déclenché pour fermer

  errorMessage: string = '';

  // Méthode pour émettre l'événement de sauvegarde
  onSave(): void {
    this.errorMessage = ''; // Réinitialiser l'erreur avant la validation
    if (!this.formData.title) {
      this.errorMessage = 'Le titre est obligatoire.';
      return;
    }
    if (!this.formData.startDateTime || !this.formData.endDateTime) {
      this.errorMessage = 'Les dates de début et de fin sont obligatoires.';
      return;
    }
    if (new Date(this.formData.startDateTime) <= new Date()) {
      this.errorMessage = 'La date et l’heure de début doivent être dans le futur.';
      return;
    }
    if (new Date(this.formData.endDateTime) <= new Date(this.formData.startDateTime)) {
      this.errorMessage = 'La date et l’heure de fin doivent être postérieures à la date de début.';
      return;
    }

    // Émission de l'événement pour sauvegarder
    this.save.emit(this.formData);
  }

  // Méthode pour fermer le modal
  onClose(): void {
    this.errorMessage = ''; // Réinitialiser l'erreur
    this.close.emit();
  }
}
