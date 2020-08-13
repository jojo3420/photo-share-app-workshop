import React from 'react';
import UserList from 'components/UserList';
import { ROOT_QUERY } from '../App';
import { Query, Mutation } from 'react-apollo';

function UserListContainer() {
  return (
    // fetch user list  - query
    <Query query={ROOT_QUERY}>
      {(result) => {
        // console.log({ result });
        const { loading, error, data, refetch } = result;
        if (error) return <div>{error.message}</div>;

        return loading ? (
          <div>Loading...</div>
        ) : (
          Array.isArray(data.users) && (
            <UserList
              users={data.users}
              totalCount={data.totalUsers}
              refetchUsers={refetch}
            />
          )
        );
      }}
    </Query>
  );
}

export default UserListContainer;
