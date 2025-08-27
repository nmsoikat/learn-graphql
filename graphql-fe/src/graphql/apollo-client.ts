import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client';

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (token) {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    return forward(operation);
});

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
});

export default client;



// Previous CODE
// import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//     // uri: 'http://localhost:4000/graphql', // Your NestJS backend
//     link: new HttpLink({
//         uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
//         //credentials: 'include', // include cookies if backend sets httpOnly cookies
//     }),
//     cache: new InMemoryCache(),
// });

// export default client;


//* ApolloLink is part of the Apollo Client library.
// ApolloLink is used to create custom middleware for Apollo Client.

// Operation: The GraphQL request (query, variables, context)
// Forward: Function that passes request to the next link

// * HttpLink is the transport link — it actually sends the request to your GraphQL server
// HttpLink does not call forward()

// link: This property defines the request pipeline. Any middleware you want to run before the request is sent