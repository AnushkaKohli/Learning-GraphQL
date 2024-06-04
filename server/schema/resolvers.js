import { MovieList, UserList } from "../FakeData.js";
import _ from "lodash";

export const resolvers = {
  Query: {
    // USER RESOLVERS
    users: () => {
      return UserList;
    },
    // parent: contains the result of the previous resolver execution level
    // args: contains the arguments passed to the resolver
    // if you don't need parent, you can use an underscore (_) to ignore it
    user: (parent, args) => {
      const id = args.id;
      // if you were using a database, you would use a query to find the user
      // return UserList.find((user) => user.id === id);
      const user = _.find(UserList, { id: Number(id) }); //id is coming as a string from the query so we need to convert it to a number
      return user;
    },

    // MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const title = args.title;
      const movie = _.find(MovieList, { title: title });
      return movie;
    },
  },
  // Resolver for custom types - whenever we query a user and try to get the information about favourite movies, how do we know which movies are favourite for each user
  // without actually putting the favouriteMovies data in UserList, we are able to fetch it
  User: {
    favouriteMovies: () => {
      // return MovieList.filter((movie) => parent.favouriteMovies.includes(movie.id));
      return _.filter(MovieList, (movie) => movie.year >= 2005);
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      console.log(user);
      UserList.push(user);
      return user;
    },
    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let updatedUser;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          updatedUser = user;
        }
      });
      return updatedUser;
    },
    deleteUser: (parent, args) => {
      const id = args.id;
      let deletedUser;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          deletedUser = user;
          _.remove(UserList, user);
        }
      });
      return deletedUser;
      // _.remove(UserList, (user) => user.id === Number(id));
      // return null;
    },
  },
};
