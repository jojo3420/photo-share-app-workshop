import React from 'react';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import { withRouter, useHistory } from 'react-router-dom';

const GET_ME = gql`
  query ME {
    me {
      githubLogin
      name
      avatar
    }
  }
`;

function Me() {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_ME);
  // console.log({ data });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data.me)
    return (
      <div>
        <p>user is null</p>
        <button onClick={() => history.push('/')}>인증 하기</button>
      </div>
    );

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  const { githubLogin, name, avatar } = data.me;
  return (
    <div key={githubLogin}>
      <p>{githubLogin}</p>
      <p>{name}</p>
      <img src={avatar} width={84} />
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default withRouter(Me);
