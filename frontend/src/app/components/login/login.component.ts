import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private httpService: HttpService, private router: Router) {}

  async onLogin() {
    try {
      const response = await this.httpService.post('auth/login', {
        email: this.email,
        password: this.password,
      });
      localStorage.setItem('token', response.token); // Stocke le token
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
    }
  }
  
}
