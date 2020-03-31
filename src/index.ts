import 'reflect-metadata';
import cron from 'node-cron';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { CountryResolver } from './resolvers/CountryResolver';
import { parseApiData } from './worker';

(async () => {
  const app = express();

  const options = await getConnectionOptions(process.env.MODE || 'database');
  await createConnection({ ...options, name: 'default' });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CountryResolver],
      validate: true
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });

  parseApiData();
  if (process.env.MODE === 'production') {
    cron.schedule('*/10 * * * *', () => parseApiData());
  }
})();
