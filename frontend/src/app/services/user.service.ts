import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: any;

  constructor(private httpService: HttpService) {}

  async getUser(): Promise<any> {
    if (!this.user) {
      try {
        this.user = await this.httpService.get('auth/profile');
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        throw error;
      }
    }
    return this.user;
  }

  clearUser(): void {
    this.user = null;
  }
}
