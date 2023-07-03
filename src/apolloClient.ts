import { config } from 'dotenv';
config();
import { ApolloClient, InMemoryCache } from '@apollo/client';


console.log(process.env.NEXT_PUBLIC_BACKEND)

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND + '/graphql',
  cache: new InMemoryCache(),
});

export default client;
