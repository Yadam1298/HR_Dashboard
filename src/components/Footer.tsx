// src/components/Footer.tsx
import { Box, Typography } from '@luxis-ui/react';

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
        <Typography size="sm" style={{ color: '#2F6B3F' }}>
          © 2026 TechCorp Inc.
        </Typography>
      )}

      {collapsed && (
        <Typography size="sm" style={{ color: '#2F6B3F' }}>
          © 2026
        </Typography>
      )}
    </Box>
  );
};

export default Footer;
