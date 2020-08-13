import React, { useState, useEffect } from 'react';
import {
  // withRouter,
  // useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { gql } from '@apollo/client';
import { ROOT_QUERY } from '../App.js';
import { Mutation, Query } from 'react-apollo';

const GITHUB_AUTH_MUTATION = gql`
  mutation GithubAuth($code: String!) {
    login: githubAuth(code: $code) {
      token
    }
  }
`;

function AuthContainer() {
  const location = useLocation();
  const history = useHistory();
  const [isSignIn, setSignIn] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    console.log('useEffect!');
    if (location.search.match('code=')) {
      const code = location.search.replace('?code=', '');
      console.log({ code });
      setSignIn(true);
      setCode(code);
    }
  }, [setCode, setSignIn, location]);

  const gotoGithubAuth = () => {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || 'YOUR CLIENT ID';
    window.location = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`;
  };

  const saveLocalStorage = (cache, { data }) => {
    // console.log({ cache, data });
    const { token } = data.login;
    console.log({ token });
    localStorage.setItem('token', token);
    history.push('/home'); // URL 붙어 있는 code 삭제
  };

  return (
    <>
      <h2>github 인증</h2>
      {isSignIn ? (
        <Mutation
          mutation={GITHUB_AUTH_MUTATION}
          variables={{ code }}
          // 가장 나중에 call
          update={saveLocalStorage}
          refetchQueries={{ query: ROOT_QUERY }}
        >
          {(login) => {
            return <button onClick={login}>로그인 하기</button>;
          }}
        </Mutation>
      ) : (
        <button onClick={gotoGithubAuth}>깃허브 동의 하기</button>
      )}
    </>
  );
}

// const Me = () => {
//   const logout = () => localStorage.removeItem('token');
//
//   return (
//     <Query query={ROOT_QUERY}>
//       {(loading, data, error) => {
//         if (error) return <div>{error.message}</div>;
//         return loading ? (
//           <div>Loading...</div>
//         ) : (
//           data.me && <UserInfo me={data.me} logout={logout} />
//         );
//       }}
//     </Query>
//   );
// };
//
// const UserInfo = ({ me, logout }) => {
//   const { name, avatar } = me;
//   return (
//     <>
//       <p>{name}</p>
//       <img src={avatar} alt="avatar" width={48} />
//       <button onClick={logout}>Logout</button>
//     </>
//   );
// };

export default AuthContainer;
