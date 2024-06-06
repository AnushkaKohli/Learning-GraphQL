import { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// useQuery is a hook provided by Apollo Client to fetch data from the API i.e to make a query
// useMutation is a hook provided by Apollo Client to make a mutation

// useLazyQuery is a hook provided by Apollo Client to fetch data from the API i.e to make a query but it is not executed immediately

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      title
      year
    }
  }
`;

const QUERY_GET_MOVIE = gql`
  query GetMovie($movieName: String!) {
    movie(title: $movieName) {
      title
      year
    }
  }
`;

const QUERY_GET_USER = gql`
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
`;

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState("");
  const [idSearched, setIdSearched] = useState("");

  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  // fetchMovie function is used to execute the query when the button is clicked
  const [fetchMovie, { data: movieDataSearched, error: movieDataError }] =
    useLazyQuery(QUERY_GET_MOVIE);
  // ------------Aliter-----------
  // const [fetchMovie, { data: movieDataSearched, error: movieDataError }] = useLazyQuery(QUERY_GET_MOVIE, { variables: { movieName: movieSearched } });

  const [fetchUser, { data: userDataSearched, error: userDataError }] =
    useLazyQuery(QUERY_GET_USER, {
      variables: {
        userId: idSearched,
      },
    });

  const navigate = useNavigate();

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <button onClick={() => navigate("/mutate")}>Mutate</button>
      <button onClick={() => navigate("/")}>Home</button>
      {/* Users List */}
      <h1>List of users: </h1>
      {data &&
        data.users.map((user) => {
          return (
            <div key={user.id}>
              <h3>Name: {user.name}</h3>
              <p>ID: {user.id}</p>
              <p>Username: {user.username}</p>
              <p>Age: {user.age}</p>
              <p>Nationality: {user.nationality}</p>
            </div>
          );
        })}
      {error && <h3>There was an error fetching all the users.</h3>}

      {/* Movies List */}
      <h1>List of movies: </h1>
      {movieData &&
        movieData.movies.map((movie) => {
          return (
            <div key={movie.title}>
              <h3>Title: {movie.title}</h3>
              <p>Year: {movie.year}</p>
            </div>
          );
        })}

      {/* Get single movie */}
      <div>
        <label>Movie Title: </label>
        <input
          type="text"
          placeholder="The Matrix"
          value={movieSearched}
          onChange={(e) => setMovieSearched(e.target.value)}
        />
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                movieName: movieSearched,
              },
            });
          }}
        >
          Fetch Movie
        </button>
        <div>
          {movieDataSearched && (
            <div>
              <h3>Movie name: {movieDataSearched.movie.title}</h3>
              <p>Year: {movieDataSearched.movie.year}</p>
            </div>
          )}
          {movieDataError && (
            <h3>There was an error fetching the movie data</h3>
          )}
        </div>
      </div>

      {/* Get single user */}
      <div>
        <label>User ID: </label>
        <input
          type="number"
          placeholder="1"
          value={idSearched}
          onChange={(e) => setIdSearched(e.target.value)}
        />
        <button onClick={fetchUser}>Fetch User</button>
        <div>
          {userDataSearched && (
            <div>
              <h3>Name: {userDataSearched.user.name}</h3>
              <p>Age: {userDataSearched.user.age}</p>
              {userDataSearched.user.favouriteMovies.map((movie) => {
                return (
                  <div key={movie.title}>
                    <p>Favourite movie title: {movie.title}</p>
                    <p>Favourite movie year: {movie.year}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          {userDataError && <h3>There was an error fetching the user data</h3>}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
