import React from 'react';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    picture: {
      data: {
        url: string;
      };
    };
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      <img src={user.picture.data.url} alt="Profile" />
      <h2>Welcome {user.name}</h2>
      Email: {user.email}
    </div>
  );
}

export default UserProfile;