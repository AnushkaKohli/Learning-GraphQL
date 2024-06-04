import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/type-def.js";
import { resolvers } from "./schema/resolvers.js";

/* The `new ApolloServer({ typeDefs, resolvers });` statement is creating a new instance of the ApolloServer class from the Apollo Server library. It is initializing the server with the provided type definitions (`typeDefs`) and resolver functions (`resolvers`). 

Type definitions define the shape of the GraphQL schema, while resolvers are functions that define how to fetch the data for each field in the schema. 

This configuration allows the Apollo Server to understand the GraphQL schema and resolve queries and mutations based on the provided resolvers. */
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
