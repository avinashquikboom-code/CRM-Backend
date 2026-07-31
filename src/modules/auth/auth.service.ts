import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../config/database';
import { AuthUser } from '../../middlewares/auth.middleware';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'super-secret-refresh-key-change-in-production';

export class AuthService {
  static async register(data: any) {
    const existingCompany = await prisma.company.findUnique({
      where: { code: data.companyCode },
    });
    if (existingCompany) {
      throw { statusCode: 400, message: 'Company code already exists' };
    }

    const existingUser = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (existingUser) {
      throw { statusCode: 400, message: 'User email already exists' };
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const result = await prisma.$transaction(async (tx: any) => {
      const company = await tx.company.create({
        data: {
          name: data.companyName,
          code: data.companyCode,
        },
      });

      const user = await tx.user.create({
        data: {
          companyId: company.id,
          email: data.email,
          passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'COMPANY_ADMIN',
        },
      });

      return { company, user };
    });

    const tokens = this.generateTokens({
      id: result.user.id,
      email: result.user.email,
      companyId: result.user.companyId,
      role: result.user.role,
    });

    await this.saveRefreshToken(result.user.id, tokens.refreshToken);

    return {
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        role: result.user.role,
        companyId: result.user.companyId,
      },
      company: result.company,
      tokens,
    };
  }

  static async login(data: any) {
    const user = await prisma.user.findFirst({
      where: { email: data.email },
      include: { company: true },
    });

    if (!user) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    if (user.status !== 'ACTIVE') {
      throw { statusCode: 403, message: 'Account is inactive' };
    }

    const tokens = this.generateTokens({
      id: user.id,
      email: user.email,
      companyId: user.companyId,
      role: user.role,
    });

    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        companyId: user.companyId,
      },
      company: user.company,
      tokens,
    };
  }

  static async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;
      const storedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw { statusCode: 401, message: 'Invalid or expired refresh token' };
      }

      const tokens = this.generateTokens({
        id: storedToken.user.id,
        email: storedToken.user.email,
        companyId: storedToken.user.companyId,
        role: storedToken.user.role,
      });

      await prisma.refreshToken.delete({ where: { id: storedToken.id } });
      await this.saveRefreshToken(storedToken.user.id, tokens.refreshToken);

      return tokens;
    } catch (err) {
      throw { statusCode: 401, message: 'Invalid refresh token' };
    }
  }

  private static generateTokens(user: AuthUser) {
    const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });
    const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  private static async saveRefreshToken(userId: string, token: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }
}
