import 'reflect-metadata';
import cron from 'node-cron';
import express from 'express';
import cors from 'cors';
import { createConnection, getConnectionOptions } from 'typeorm';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { CountryResolver } from './resolvers/CountryResolver';
import { parseApiData } from './worker';

(async () => {
  const app = express();
  app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));
  app.use(cors());
  const options = await getConnectionOptions(process.env.MODE || 'database');
  await createConnection({ ...options, name: 'default' });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CountryResolver],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
    playground: true,
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
    console.log(`playground started at http://localhost:${port}/playground`);
    console.log(`voyager started at http://localhost:${port}/voyager`);
  });

  parseApiData();
  if (process.env.MODE === 'production') {
    cron.schedule('*/10 * * * *', () => parseApiData());
  }
})();
