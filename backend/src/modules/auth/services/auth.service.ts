import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";
import { env } from "../../../config/env";

const SECRET = env.JWT_SECRET;

class AuthService {
  async registerUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await UserRepository.createUser(email, hashedPassword);
  }

  async loginUser(email: string, password: string) {
    const user = await UserRepository.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials.");
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
    return { token };
  }
}

export default AuthService;