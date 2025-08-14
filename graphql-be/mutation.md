## Create User
```
mutation CreateNewUser($input: CreateUserInput!){
  createUser(input: $input) {
    id,
    name,
    email
  }
}
```
- Variable
```
{
  "input": {
    "name": "rohim2",
    "email": "rohim2@gmail.com",
    "password": "123456"
  }
}
```


## Login User
```
mutation LoginUser($input: LoginInput!){
  login(input: $input)
}
```
- Variable
```
{
  "input": {
    "email": "korim@gmail.com",
    "password": "123456"
  }
}
```
- Response
```
{
  "data": {
    "login": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtvcmltQGdtYWlsLmNvbSIsInN1YiI6MTksImlhdCI6MTc1MzQ0MjEyM30.8xETNxnSUBIU5kLK2_CGpoyl9o7Vwdw7szNYUry2H4s"
  }
}
```


## Private Query
- HTTP Headers
``
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtvcmltQGdtYWlsLmNvbSIsInN1YiI6MTksImlhdCI6MTc1MzQ0MjEyM30.8xETNxnSUBIU5kLK2_CGpoyl9o7Vwdw7szNYUry2H4s"
}
```