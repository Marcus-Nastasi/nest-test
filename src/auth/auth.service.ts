import { Injectable } from '@nestjs/common';

import * as JWT from 'jsonwebtoken';

@Injectable()
export class AuthService {
   private readonly secret = process.env.jwt_secret;

   generate(user: string): string {
      return JWT.sign(
         { username: user, sub: user },
         this.secret,
         { expiresIn: '10m' }
      );
   }

   validate(token: string): string | JWT.JwtPayload {
      try {
         return JWT.verify(token, this.secret);
      } catch(e: any) {
         return null;
      }
   }
}

