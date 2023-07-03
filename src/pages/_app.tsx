import { ApolloProvider } from '@apollo/client';
import client from '../apolloClient';
import { Container } from '@mui/material';
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm">
        <Component {...pageProps} />
      </Container>
    </ApolloProvider>
  );
};

export default MyApp;

