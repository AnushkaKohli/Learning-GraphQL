# Frontend Queries

```jsx
query GetAllUsers {
    users {
      id
      name
      username
      nationality
      age
    }
  }
  
query GetUser($userId: ID!) {
  user(id: $userId) {
    name
    age
    favouriteMovies {
      title
      year
    }
  }
}

// {
//     "userId": 1
// }
  
query GetAllMovies {
  movies {
    title
    year
  }
}
  
query GetMovie($movieName: String!){
  movie(title: $movieName) {
    title
    year
  }
}

// {
//     "movieName": "The Dark Knight"
// }
  
// input is the variable in which we will store the argument taken from user which is of type CreateUserInput
mutation CreateUser($input: CreateUserInput!) {
    // in createUser, we use the value entered in $input of type CreateUserInput to pass as input below where input is the name of the variable in type-defs
  createUser(input: $input) {
    id
    name
    age
  }
}

// {
//     "input": {
//         "name": "John Doe",
//         "username": "johndoe",
//         "nationality": "CANADA",  
//         "age": 30,
//     }
// }

mutation UpdateUsername($input: UpdateUsernameInput!) {
  updateUsername(input: $input) {
    id
    username
  }
}

// {
//     "input": {
//         "id": 1,
//         "newUsername": "johndoe123"
//     }
// }

mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    name
  }
}

// {
//     deleteUserId: 1
// }

```
