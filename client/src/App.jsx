import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayData from "./DisplayData";
import MutateData from "./MutateData";
import Home from "./Home";

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/display" element={<DisplayData />} />
          <Route path="/mutate" element={<MutateData />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
