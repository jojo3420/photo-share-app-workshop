import React from 'react';

function UserListItem({ user }) {
  const { avatar, name } = user;
  return (
    <div>
      <img src={avatar} alt="profile image" width={84} />
      <p>{name}</p>
    </div>
  );
}

export default UserListItem;
