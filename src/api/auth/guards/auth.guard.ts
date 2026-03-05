import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { TokenExpiredError } from 'jsonwebtoken';
import { errorMessages } from 'src/errors/custom';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const bearerToken = request.headers.authorization.split(' ')[1];
      const payload = await this.jwtService.verifyAsync(bearerToken, {
        secret: process.env.JWT_SECRET,
      });

      request.user = payload
      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new UnauthorizedException(errorMessages.auth.expiredToken);
      throw new UnauthorizedException(errorMessages.auth.invlidToken);
    }
  }
}
