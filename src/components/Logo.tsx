import { Avatar } from '@luxis-ui/react';
import React from 'react';

const Logo = ({ collapsed }) => {
  const username = localStorage.getItem('username') || 'User';
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        alt={username}
        fallback="?"
        shape="circular"
        size="md"
        statusPosition="bottom-right"
      />

      {!collapsed && (
        <h1
          style={{ marginLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}
        >
          HR Dashboard
        </h1>
      )}
    </div>
  );
};

export default Logo;
