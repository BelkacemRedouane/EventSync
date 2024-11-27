import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  // Routes sans Layout (exemple : Authentification)
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Routes avec Layout
  {
    path: '',
    component: LayoutComponent, // Le LayoutComponent agit comme un conteneur
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'tasks', component: TaskListComponent },
      { path: 'events', component: CalendarComponent },
    ],
  },

  // Redirection par défaut
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];
