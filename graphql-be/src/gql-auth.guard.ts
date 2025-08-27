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

    // This makes Passport work with GraphQL
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }

    async canActivate(context: ExecutionContext) {
        //1. Check method and class has isPublic properties
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            'isPublic',
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) {
            return true; // Allow access without checking JWT
        }

        //2. Otherwise run default JWT validation
        // return super.canActivate(context);

        // This will run the JWT strategy and populate req.user
        const canActivateResult = await super.canActivate(context); // Returns true if authentication succeeds; throws otherwise
        const result = (typeof canActivateResult === 'boolean') ? canActivateResult : await lastValueFrom(canActivateResult);

        //3. Add user into GQL context.
        // Inject user into context manually
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        ctx.getContext().user = req.user;

        return result;
    }
}


// * getRequest() is called automatically by NestJS when you extend AuthGuard.
// The default AuthGuard('jwt') expects a traditional HTTP request,
// but GraphQL wraps it differently. This override adapts it to GraphQL.

// * [getRequest] Breakdown:
// 1. ExecutionContext
// This is a generic wrapper NestJS provides that abstracts the current request context, whether it's HTTP, GraphQL, WebSocket, etc.

// 2. GqlExecutionContext.create(context)
// Converts the generic ExecutionContext into a GraphQL-specific context so you can access the GraphQL-related objects.

// 3. ctx.getContext().req
// This extracts the original request object (like the HTTP request) from the GraphQL context.

// Why need: This lets Passport extract the JWT from req.headers.authorization even inside GraphQL.



// * Reflector: You need the Reflector in NestJS to read metadata set by decorators (like @Public()) — especially inside guards, interceptors, or pipes.
// | Expression                     | Meaning                                               |
// | ------------------------------ | ----------------------------------------------------- |
// | `context.getHandler()`         | The resolver **method** (e.g. `login`, `getProfile`)  |
// | `context.getClass()`           | The resolver **class** (e.g. `AuthResolver`)          |
// | `'isPublic'`                   | The metadata key set by `@Public()`                   |
// | `getAllAndOverride<boolean>()` | Returns `true` if key is found on method **or** class |


// * lastValueFrom() is used to unwrap any Observable<boolean> if returned by super.canActivate().
// You now always return a Promise<boolean>, not Promise<Observable<boolean>>.

//* super.canActivate(context)
// That triggers: passport.authenticate('jwt', callback)
// Passport: extract JWT and verify
// If the JWT is valid: Passport automatically calls your JwtStrategy.validate(payload)