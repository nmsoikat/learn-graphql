import { Request } from 'express';

export interface GqlContextType {
    req: Request;
    user?: any;
}
