// src/components/Footer.tsx
import React from 'react';
import { Box } from '@luxis-ui/react';

const Footer = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <Box
      p={2}
      display="flex"
      alignItems="center"
      justifyContent={collapsed ? 'center' : 'space-between'}
      bg="#FFF6F6"
      h={collapsed ? '40px' : '50px'}
      w="100%"
    >
      {!collapsed && (
        <h1 size="sm" style={{ color: '#2F6B3F' }}>
          © 2026 TechCorp Inc.
        </h1>
      )}

      {collapsed && (
        <h1 size="sm" style={{ color: '#2F6B3F' }}>
          © 2026
        </h1>
      )}
    </Box>
  );
};

export default Footer;
