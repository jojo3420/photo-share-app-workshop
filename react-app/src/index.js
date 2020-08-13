import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`,
  request: (operation) => {
    // console.log({ operation });
    operation.setContext((context) => {
      // console.log({ context });
      return {
        headers: {
          ...context.headers,
          token: localStorage.getItem('token'),
        },
      };
    });
  },
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
