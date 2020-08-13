import React from 'react';
import { Mutation } from 'react-apollo';
import { ROOT_QUERY } from '../App';
import UserListItem from 'components/UserListItem';
import { gql } from 'apollo-boost';

const AddFakeUsersMutation = gql`
  mutation AddFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      name
      avatar
    }
  }
`;

function UserList({ totalCount, users, refetchUsers }) {
  return (
    <div>
      <h2>{totalCount} 명 Users</h2>
      <button onClick={() => refetchUsers()}>ReFresh</button>
      {/*Add Fake user - mutation */}
      <Mutation
        mutation={AddFakeUsersMutation}
        variables={{ count: 1 }}
        refetchQueries={[{ query: ROOT_QUERY }]}
      >
        {(addFakeUser) => <button onClick={addFakeUser}>Add FakeUser</button>}
      </Mutation>
      <div>
        {users &&
          users.map((user) => (
            <UserListItem key={user.githubLogin} user={user} />
          ))}
      </div>
    </div>
  );
}

export default UserList;
