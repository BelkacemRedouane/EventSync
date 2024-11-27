import { Request, Response } from 'express';
import UserService from '../services/usersService';
import { RegisterUserDTO } from '../dtos/RegisterUserDTO';
import { LoginUserDTO } from '../dtos/LoginUserDTO';

export const registerUser = async (req: Request<{}, {}, RegisterUserDTO>, res: Response): Promise<void> => {
  const userData: RegisterUserDTO = req.body;

  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
    res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
    return;
  }

  try {
    const newUser = await UserService.registerUser(userData);
    res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Une erreur inattendue est survenue' });
    }
  }
};

export const loginUser = async (req: Request<{}, {}, LoginUserDTO>, res: Response): Promise<void> => {
  const loginData: LoginUserDTO = req.body;

  if (!loginData.email || !loginData.password) {
    res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    return;
  }

  try {
    const { token, user } = await UserService.loginUser(loginData);
    res.status(200).json({ token, user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Une erreur inattendue est survenue' });
    }
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserService.getUserProfile(req.user?.id);
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};


