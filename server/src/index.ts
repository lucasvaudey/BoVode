import * as dotenv from "dotenv";
import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { MyContext } from "./types/MyContext";
import { json } from "body-parser";
import cors from "cors";
import { PostResolver } from "./resolvers/PostResolver";

const main = async () => {
  dotenv.config();
  const app = express();

  const server = new ApolloServer<MyContext>({
    introspection: process.env.PROD,
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver],
    }),
  });

  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );
  app.listen(5000, () => {
    console.log(`🚀 Server ready at localhost:5000`);
  });
};
try {
  main();
} catch (e) {
  console.log(e);
}
