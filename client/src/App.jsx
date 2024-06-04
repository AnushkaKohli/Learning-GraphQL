import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function App() {
  // Apollo client is used to connect to the GraphQL server
  const client = new ApolloClient({
    // uri is the endpoint of the GraphQL server
    uri: "http://localhost:4000/graphql",
    // cache is used to store the data fetched from the server
    cache: new InMemoryCache(),
  });
  return (
    // ApolloProvider is used to provide the client to the entire application
    <ApolloProvider client={client}>
      <div>Hello world</div>
    </ApolloProvider>
  );
}

export default App;
