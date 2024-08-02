import { Injectable } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class AuthService {
   private readonly secret: string = process.env.jwt_secret;

   generate(user: string): string {
      try {
         return JWT.sign(
            { username: user },
            this.secret,
            { expiresIn: '1h' }
         );
      } catch (e: any) {
         return null;
      }
   }

   validate(token: string): string | JWT.JwtPayload {
      try {
         return JWT.verify(token, this.secret);
      } catch(e: any) {
         return null;
      }
   }
}

