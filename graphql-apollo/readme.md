✅ What is GraphQL?
A query language for APIs that lets clients request exact data they need from the server.

✅ Why need GraphQL?
GraphQL is needed to fetch only the exact data you want in a single request, making APIs faster and more flexible.

## SQL vs GQL
| Feature       | SQL                             | GraphQL (GQL)           |
| ------------- | ------------------------------- | ----------------------- |
| Purpose       | Query structured data from a DB | Query data from APIs    |
| Used by       | Back-end/database systems       | Front-end/API consumers |
| Language Type | Relational DB query language    | API query language      |
| Example Use   | `SELECT * FROM users`           | `{ users { id name } }` |


## 
| Part           | Purpose                                   |
| -------------- | ----------------------------------------- |
| `typeDefs`     | Define **what data** can be queried       |
| `resolvers`    | Define **how to get the data**            |
| `ApolloServer` | Ties it all together                      |
| Sandbox        | Lets you test your GraphQL queries easily |


## Scalar Types (basic built-in types)
| Type      | Description                              |
| --------- | ---------------------------------------- |
| `Int`     | Integer                                  |
| `Float`   | Floating-point number                    |
| `String`  | UTF-8 string                             |
| `Boolean` | `true` or `false`                        |
| `ID`      | Unique identifier (serialized as string) |


## Layers Example (Node.js + TypeORM + Apollo)
[Client]
   ↓
[GraphQL API (Apollo Server)]
   ↓
[Resolvers → ORM]
   ↓
[Database (e.g., PostgreSQL)]
