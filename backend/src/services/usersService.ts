import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import { RegisterUserDTO } from '../dtos/RegisterUserDTO';
import { LoginUserDTO } from '../dtos/LoginUserDTO';

class UserService {
  async registerUser(userData: RegisterUserDTO): Promise<IUser> {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà.');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser: IUser = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone,
      bio: userData.bio,
    });

    await newUser.save();
    return newUser;
  }

  async loginUser(loginData: LoginUserDTO): Promise<{ token: string; user: IUser }> {
    const user = await User.findOne({ email: loginData.email });
    if (!user) {
      throw new Error("L'utilisateur n'existe pas.");
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Mot de passe incorrect.');
    }

    const token = jwt.sign(
      { user: { id: user.id, email: user.email, role: user.role } },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return { token, user };
  }

  async getUserProfile(userId: string): Promise<IUser | null> {
    return await User.findById(userId).select('-password'); // Exclude password
  }
}

export default new UserService();