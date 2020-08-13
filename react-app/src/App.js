import React from 'react';
import { gql } from 'apollo-boost';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContainer from 'components/AuthContainer';
import UserListContainer from 'components/UserListContainer';
import Home from 'components/Home';

export const ROOT_QUERY = gql`
  query {
    totalUsers
    totalPhotos
    users: allUsers {
      ...userInfo
    }
    me {
      ...userInfo
    }
  }

  fragment userInfo on User {
    githubLogin
    name
    avatar
  }
`;

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AuthContainer} />
        <Route path="/users" component={UserListContainer} />
        <Route path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
