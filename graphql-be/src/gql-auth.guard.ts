import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            'isPublic',
            [context.getHandler(), context.getClass()],
        );
        if (isPublic) {
            return true; // Allow access without checking JWT
        }

        // Otherwise run default JWT validation
        // return super.canActivate(context);

        // This will run the JWT strategy and populate req.user
        const canActivateResult = await super.canActivate(context);
        const result =
            typeof canActivateResult === 'boolean'
                ? canActivateResult
                : await lastValueFrom(canActivateResult);

        // Inject user into context
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        ctx.getContext().user = req.user;

        return result;
    }
}


// Why it's needed: Because the default AuthGuard('jwt') expects a traditional HTTP request,
// but GraphQL wraps it differently. This override adapts it to GraphQL.

// getRequest() is called automatically by NestJS when you extend AuthGuard.


// | Expression                     | Meaning                                               |
// | ------------------------------ | ----------------------------------------------------- |
// | `context.getHandler()`         | The resolver **method** (e.g. `login`, `getProfile`)  |
// | `context.getClass()`           | The resolver **class** (e.g. `AuthResolver`)          |
// | `'isPublic'`                   | The metadata key set by `@Public()`                   |
// | `getAllAndOverride<boolean>()` | Returns `true` if key is found on method **or** class |


// You now always return a Promise<boolean>, not Promise<Observable<boolean>>.
// lastValueFrom() is used to unwrap any Observable<boolean> if returned by super.canActivate().