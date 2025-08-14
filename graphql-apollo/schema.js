export const typeDefs = `#graphql
  type Query {
    hello: String,
    authors: [Author]
    posts: [Post]
    comments: [Comment]
    author(id: ID!): Author,
    post(id: ID!): Post
    comment(id: ID!): Comment,
  }
  type Author {
    id: ID!
    name: String!
    posts: [Post!]
    comments: [Comment]
  }
  type Post{
    id: ID!
    title: String!
    author: Author!
    body: String!
    tags: [String],
    comments: [Comment]
  }
  type Comment {
    id: ID!
    message: String!
    author: Author!
  }
  type Mutation {
    addPost(data: AddPostInput!): Post
    updatePost(id: ID!, data: EditPostInput): Post
    deletePost(id: ID!): [Post]
  }
  input AddPostInput {
    title: String!,
    body: String!,
    author: String!,
    tags: [String!]!,
    comments: [String]
  }
  input EditPostInput {
    title: String,
    body: String,
    tags: [String],
    comments: [String]
  }
`