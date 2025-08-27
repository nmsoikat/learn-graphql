import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //  tells Passport-JWT how to extract the token from the incoming request.
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    // called automatically by Passport after the JWT token Verified using secret key.
    // Passport sets the returned object as req.user
    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}

// [jwtFromRequest: ExtractJwt] // More options
// ExtractJwt.fromUrlQueryParameter('token')
// ExtractJwt.fromBodyField('access_token')
// jwtFromRequest: (req) => req.cookies['jwt']