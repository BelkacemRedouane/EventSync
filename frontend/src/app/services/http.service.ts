import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private axiosInstance: AxiosInstance;

  constructor() {
    // Initialisation de l'instance Axios avec la base URL
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/api', // Base URL de l'API
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Ajouter un intercepteur pour inclure le token JWT automatiquement
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
  }

  /**
   * Méthode GET pour récupérer les données
   * @param endpoint - Chemin relatif de l'API
   * @returns Promesse des données récupérées
   */
  async get(endpoint: string, params: any = {}): Promise<any> {
    try {
      const response = await this.axiosInstance.get(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Méthode POST pour créer une ressource
   * @param endpoint - Chemin relatif de l'API
   * @param data - Données à envoyer
   * @returns Promesse des données créées
   */
  async post(endpoint: string, data: any): Promise<any> {
    try {
      const response = await this.axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Méthode PUT pour mettre à jour une ressource
   * @param endpoint - Chemin relatif de l'API
   * @param data - Données mises à jour
   * @returns Promesse des données mises à jour
   */
  async put(endpoint: string, data: any): Promise<any> {
    try {
      const response = await this.axiosInstance.put(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Méthode DELETE pour supprimer une ressource
   * @param endpoint - Chemin relatif de l'API
   * @returns Promesse de confirmation de suppression
   */
  async delete(endpoint: string): Promise<any> {
    try {
      const response = await this.axiosInstance.delete(endpoint);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Méthode PATCH pour des mises à jour partielles
   * @param endpoint - Chemin relatif de l'API
   * @param data - Données partielles à mettre à jour
   * @returns Promesse des données mises à jour partiellement
   */
  async patch(endpoint: string, data: any): Promise<any> {
    try {
      const response = await this.axiosInstance.patch(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Gestion centralisée des erreurs
   * @param error - Erreur attrapée
   */
  private handleError(error: any): void {
    console.error('Erreur HTTP :', error);
    if (error.response) {
      // Affiche le message d'erreur renvoyé par le backend
      console.error('Erreur serveur :', error.response.data.message);
    } else {
      console.error('Erreur réseau ou autre problème :', error.message);
    }
    throw error;
  }
}
