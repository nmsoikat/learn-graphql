import db from './_db.js'

export const resolvers = {
    Query: {
        hello: () => "Hello world!",
        authors() {
            return db.authors;
        },
        posts() {
            return db.posts
        },
        comments() {
            return db.comments
        },
        author(_, args) {
            return db.authors.find(author => author.id === args.id)
        },
        post(_, args) {
            return db.posts.find(post => post.id === args.id)
        },
        comment(_, args) {
            return db.comments.find(comment => comment.id === args.id)
        },
    },
    Post: {
        author(post) {
            return db.authors.find((author) => author.id === post.author)
        },
        comments(post) {
            return post.comments.map((commentId) => {
                return db.comments.find(comment => comment.id === commentId)
            })
        }
    },
    Author: {
        posts(author) {
            return db.posts.filter(post => post.author === author.id)
        },
        comments(author) {
            return db.comments.filter(comment => comment.author === author.id)
        }
    },
    Comment: {
        author(comment) {
            return db.authors.find((author) => author.id === comment.author)
        }
    },

    Mutation: {
        addPost(_, { data }) {
            let post = {
                ...data,
                id: Math.floor(Math.random() * 10000).toString()
            }
            db.posts.push(post)

            return post
        },
        updatePost(_, { id, data }) {
            db.posts = db.posts.map((post) => {
                if (post.id === id) {
                    return { ...post, ...data }
                }
                return post
            })

            return db.posts.find((post) => post.id === id)
        },
        deletePost(_, { id }) {
            db.posts = db.posts.filter((post) => post.id !== id)
            return db.posts
        },
    }
}