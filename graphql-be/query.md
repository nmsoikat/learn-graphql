### User with post
```
query GetUserWithPosts($id: ID!) {
  userPosts(id: $id) {
    id
    name
    posts {
      id
      title
      body
      tags
    }
  }
}
```