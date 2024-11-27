import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = '';
  bio: string = '';

  constructor(private httpService: HttpService, private router: Router) {}

  async onRegister(): Promise<void> {
    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await this.httpService.post('auth/register', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phone: this.phone,
        bio: this.bio,
      });

      alert('Compte créé avec succès ! Connectez-vous.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erreur d\'inscription :', error);
      alert('Une erreur est survenue. Vérifiez vos informations.');
    }
  }
}
