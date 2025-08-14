<p align="center">
  <img src="https://graphql.org/img/logo.svg" width="100" alt="GraphQL Logo" />
</p>

# 🚀 Apollo GraphQL Tech Session

Welcome to the **Apollo GraphQL Tech Session** repository!  
This project demonstrates how to build and work with **GraphQL servers and clients**, including backend and frontend integration using Apollo.

---

## 📁 Project Structure

This repo includes **three separate folders**, each representing a standalone service:
```
├── graphql-apollo → Basic Apollo Server (Node.js)
├── graphql-be → GraphQL backend server (e.g. NestJS)
├── graphql-fe → Frontend app using Apollo Client (NextJS)
```


---

## 🔧 Getting Started

To run any server:

1. Navigate into the folder:
```bash
  cd graphql-apollo   # or graphql-be / graphql-fe
  npm install
```
2. Run server:
```bash
  # graphql-apollo
  npm start 

   # graphql-fe 
  npm run dev

  # graphql-be (api)
  npm run start:dev 
```

3. Open Browser:
```bash
  # graphql-apollo
  http://localhost:5000

   # graphql-fe 
  http://localhost:3000

  # graphql-be (api)
  http://localhost:4000/graphql
```


[Postman collection](./GraphQL-Workshop.postman_collection_1.json)