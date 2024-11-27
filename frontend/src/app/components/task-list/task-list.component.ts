import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Nécessaire pour les directives Angular comme *ngFor et *ngIf
import { TaskService } from 'src/app/services/task.service';
import { TaskModalComponent } from "../task-modal/task-modal.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskModalComponent], // Importer CommonModule pour Angular
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = []; // Liste des tâches

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Charger les tâches
  loadTasks() {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
        console.log('Tâches récupérées :', this.tasks);
      },
      (error) => {
        console.error('Erreur lors de la récupération des tâches :', error);
      }
    );
  }

  // Supprimer une tâche
  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        alert('Tâche supprimée avec succès');
        this.loadTasks(); // Recharger les tâches après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de la tâche :', error);
      }
    );
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'urgent':
        return 'urgent';
      case 'moyen':
        return 'moyen';
      case 'faible':
        return 'faible';
      default:
        return '';
    }
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'à faire':
        return 'à-faire';
      case 'en cours':
        return 'en-cours';
      case 'terminé':
        return 'terminé';
      default:
        return '';
    }
  }

  isOpen: boolean = false;
mode: 'create' | 'edit' = 'create';
formData: any = {};

openTaskModal(mode: 'create' | 'edit', task?: any) {
  this.isOpen = true; // Ouvre le modal
  this.mode = mode; // Définit le mode (création ou modification)

  this.formData = task
    ? { ...task } // Préremplir les données pour la modification
    : {
        title: '',
        priority: 'moyen',
        status: 'à faire',
        subTasks: [],
        startDateTime: new Date().toISOString().slice(0, 16), // Date par défaut pour la création
        endDateTime: new Date(new Date().getTime() + 3600000).toISOString().slice(0, 16), // +1h par défaut
      };
}



onSaveTask(task: any) {
  if (this.mode === 'create') {
    this.taskService.createTask(task).subscribe(() => {
      alert('Tâche ajoutée avec succès');
      this.loadTasks(); // Recharge les tâches
      this.isOpen = false; // Ferme le modal
    });
  } else {
    this.taskService.updateTask(task.id, task).subscribe(() => {
      alert('Tâche modifiée avec succès');
      this.loadTasks(); // Recharge les tâches
      this.isOpen = false; // Ferme le modal
    });
  }
}

onCloseModal() {
  this.isOpen = false; // Ferme le modal
}



  
}
