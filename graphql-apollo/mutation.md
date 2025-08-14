### Add Post
```
mutation addPost($input: AddPostInput!){
  addPost(data: $input) {
    title
  }
}
```
- variable
```
{
  "input": {
    "title": "test2",
    "body": "test body2",
    "author": "a1",
    "tags": "test",
    "comments": []
  }
}
```


### Update Post
```
mutation updatePost($input: EditPostInput!, $id: ID!){
  updatePost(id: $id, data: $input) {
    title
  }
}
```
- variable
```
{
  "input": {
    "title": "test update",
    "body": "test body2",
    "tags": "test",
    "comments": []
  },
  "id": "p1"
}
```

### Delete Post
```
mutation deletePosta($id: ID!){
  deletePost(id: $id){
    title
  }
}
```
- variable
```
{
  "id": "p2"
}

```