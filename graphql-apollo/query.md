#### All posts
```
query {
  posts {
    id,
    title,
    body,
    tags
  }
}
```

#### Sing Post
```
query getPost($postId: ID!){
  post(id: $postId) {
    id,
    title
  }
}
```
- variable
```
{
  "postId": "p1"
}
```


#### Post -> Author, Comments
```
query {
  posts {
    id,
    title,
    body,
    tags,
    author {
      id,
      name
    },
    comments {
      id,
      message
    }
  }
}
```

#### Author -> Posts -> Comments
```
query {
  authors {
    id,
    name,
    posts {
      id,
      title,
      comments {
        id,
        message
      }
    }
  }
}
```

### Comments -> Author
```
query {
  comments {
    id,
    author {
      id,
      name
    }
  }
}
```