import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-header',
  standalone: true, // Si applicable
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any = null;

  constructor(private httpService: HttpService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.httpService.get('auth/profile');
    } catch (error) {
      console.error('Erreur lors de la récupération de l’utilisateur :', error);
      this.user = null; // Reset user on error
    }
  }
  

  logout(): void {
    localStorage.removeItem('token'); // Supprime le token
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }
}
