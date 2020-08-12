import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App.js';

import { request, gql } from 'graphql-request';

const query = gql`
  query UserList {
    userList: allUsers {
      githubLogin
      name
      avatar
    }
  }
`;

const mutation = gql`
  mutation FakeAddUser($count: Int!) {
    addFakeUsers(count: $count) {
      name
      avatar
    }
  }
`;
const endpoint = `http://localhost:4000/graphql`;

function App({ userList }) {
  return (
    <div>
      <h1>userList</h1>
      {userList &&
        userList.map((user) => {
          return (
            <div key={user.githubLogin}>
              <img src={user.avatar} alt="avatar" width={100} />
              {user.name}
            </div>
          );
        })}
      <div style={{ margin: '1rem', padding: '1rem' }}>
        <button onClick={addFakeUser}>Add User</button>
      </div>
    </div>
  );
}

const requestAndRender = () => {
  request(endpoint, query)
    .then((res) => render(res))
    .catch(console.error);
};

const render = ({ userList = [] }) => {
  console.log({ userList });
  ReactDOM.render(<App userList={userList} />, document.getElementById('root'));
};

const addFakeUser = () => {
  request(endpoint, mutation, { count: 1 })
    .then(console.log)
    .catch(console.error);

  requestAndRender();
};

requestAndRender();

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );
