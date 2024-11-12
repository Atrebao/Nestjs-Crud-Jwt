import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/constant';

/**
 * 
 * JwtStrategy :

C'est la logique de validation du jeton. Il définit comment le jeton JWT sera extrait, décodé, et validé.
JwtStrategy est configuré pour examiner l'en-tête de la requête, vérifier la signature du JWT, et s'assurer que le jeton est valide.
Il décode les informations contenues dans le JWT (par exemple, userId, roles) et les retourne pour être utilisées par la suite dans la requête.
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}