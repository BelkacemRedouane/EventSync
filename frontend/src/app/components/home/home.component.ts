import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  message: string = '';

  constructor(private httpService: HttpService) {}

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.httpService.get('');
      this.message = response; // Assurez-vous que la route '/' du backend renvoie un message
    } catch (error) {
      console.error('Erreur lors de la connexion au backend', error);
    }
  }
}
