import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { registerSchema, loginSchema, refreshTokenSchema } from './auth.schema';
import { ResponseUtil } from '../../utils/response.util';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = registerSchema.parse(req.body);
      const result = await AuthService.register(validated);
      return ResponseUtil.created(res, 'User and Company registered successfully', result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = loginSchema.parse(req.body);
      const result = await AuthService.login(validated);
      return ResponseUtil.success(res, 'Logged in successfully', result);
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = refreshTokenSchema.parse(req.body);
      const result = await AuthService.refreshToken(validated.refreshToken);
      return ResponseUtil.success(res, 'Tokens refreshed successfully', result);
    } catch (error) {
      next(error);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      return ResponseUtil.success(res, 'Current user retrieved', { user: req.user });
    } catch (error) {
      next(error);
    }
  }
}
