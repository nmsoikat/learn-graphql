@Query(() => [User], { nullable: 'items' })
// [User]! — array is required, but items can be null

@Query(() => [User], { nullable: 'itemsAndList' })
// [User] — array and items can be null

@Query(() => [User], { nullable: false })
// Same as no `nullable` — array and items are non-null