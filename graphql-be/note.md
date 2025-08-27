@Query(() => [User], { nullable: 'items' })
// [User]! — array is required, but items can be null

@Query(() => [User], { nullable: 'itemsAndList' })
// [User] — array and items can be null

@Query(() => [User], { nullable: false })
// Same as no `nullable` — array and items are non-null


Application Startup
  ↓
NestJS creates JwtStrategy instance → constructor runs once
The constructor runs once at application startup and sets up the strategy configuration.

- Authentication Flow:
➡️ Incoming GraphQL request
    ↓
🛡️ GqlAuthGuard.canActivate(context)
    ↓
📞 super.canActivate(context)
    ↓
📞 this.getRequest(context)  ← called internally by super
    ↓
🔐 Passport.authenticate('jwt')
    ↓
🧠 JwtStrategy.validate(payload)
    ↓
✅ req.user set → return true