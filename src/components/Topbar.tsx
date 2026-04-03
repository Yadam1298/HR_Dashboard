// src/components/TopBar.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Avatar, Modal, Accordion } from '@luxis-ui/react';
import { useNavigate } from 'react-router-dom';
import { NotificationsIcon } from '../assets/Icons';

interface TopBarProps {
  username: string;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

const TopBar: React.FC<TopBarProps> = ({
  username,
  collapsed,
  setCollapsed,
}) => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  const navigate = useNavigate();

  // Simulate fetching notifications
  useEffect(() => {
    if (notificationModalOpen) {
      setLoadingNotifications(true);
      setTimeout(() => {
        setNotifications([
          {
            id: 'item1',
            header: 'Employee Resignation',
            children: <p>John Doe has submitted his resignation today.</p>,
          },
          {
            id: 'item2',
            header: 'Sick Leave Request',
            children: <p>Jane Smith has requested sick leave for tomorrow.</p>,
          },
          {
            id: 'item3',
            header: 'Client Meeting Reminder',
            children: <p>Meeting with ACME Corp. scheduled at 3 PM today.</p>,
          },
        ]);
        setLoadingNotifications(false);
      }, 2000);
    }
  }, [notificationModalOpen]);

  return (
    <>
      {/* Top bar */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        p={4}
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e0e0e0',
          width: '100%',
        }}
      >
        {/* Hamburger button */}
        <Button
          onClick={() => setCollapsed(!collapsed)}
          size="sm"
          style={{
            background: collapsed ? '#F13E93' : 'white',
            border: '1px solid #e0e0e0',
            padding: '6px',
            borderRadius: 4,
          }}
        >
          <Box display="flex" flexDirection="column" gap="3px">
            {[...Array(3)].map((_, i) => (
              <Box
                key={i}
                w="20px"
                h="2px"
                bg={collapsed ? 'white' : 'black'}
                borderRadius="1px"
              />
            ))}
          </Box>
        </Button>

        {/* User info with notifications */}
        <Box display="flex" alignItems="center" gap={12}>
          {/* Notification Bell with custom CSS badge */}
          <Box style={{ position: 'relative' }}>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setNotificationModalOpen(true)}
            >
              <NotificationsIcon size={24} />
            </Button>
            {/* Custom CSS badge */}
            <span
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                backgroundColor: '#F13E93',
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold',
                padding: '2px 6px',
                borderRadius: '50%',
              }}
            >
              3
            </span>
          </Box>

          {/* Avatar and username */}
          <Avatar
            alt={username}
            fallback={username.charAt(0).toUpperCase()}
            shape="circular"
            size="md"
            src="https://i.pravatar.cc/150?img=3"
          />
          <Button
            shape="default"
            size="md"
            variant="ghost"
            onClick={() => setProfileModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 8px',
            }}
          >
            <Box>
              <span style={{ fontWeight: 600 }}>{username}</span>
            </Box>
          </Button>
        </Box>
      </Box>

      {/* Profile Modal */}
      <Modal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        animation="fade"
        centered
        closeOnBackdropClick
        closeOnEscape
        preventScroll
        showCloseButton
        size="md"
        title="User Profile"
        description="Here you can view your profile information."
        footerButtons={[
          {
            label: 'Close',
            onClick: () => setProfileModalOpen(false),
            variant: 'primary',
          },
          {
            label: 'Logout',
            onClick: () => {
              navigate('/');
              alert('Logged out');
            },
            variant: 'danger',
          },
        ]}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={16}
          p={4}
        >
          <Avatar
            alt="Jane Doe"
            fallback="JD"
            shape="circular"
            size="lg"
            src="https://i.pravatar.cc/150?img=3"
            statusPosition="bottom-right"
            style={{ width: '150px', height: '150px' }}
          />
          <Box>
            <p>
              Username: <strong>{username}</strong>
            </p>
            <p>Contact no: 123-456-7890</p>
            <p>Email: abcd@example.com</p>
            <p>Experience: 5 years</p>
          </Box>
        </Box>
      </Modal>

      {/* Notification Modal */}
      <Modal
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
        animation="fade"
        centered
        closeOnBackdropClick
        closeOnEscape
        preventScroll
        showCloseButton
        size="sm"
        title="Notifications"
        description="Here are your latest notifications."
        footerButtons={[
          {
            label: 'Close',
            onClick: () => setNotificationModalOpen(false),
            variant: 'primary',
          },
        ]}
      >
        {loadingNotifications ? (
          <Accordion
            chevronPosition="right"
            collapsible
            iconType="chevron"
            items={[
              {
                id: 'skeleton1',
                header: 'Loading...',
                children: <p>Loading notification...</p>,
              },
              {
                id: 'skeleton2',
                header: 'Loading...',
                children: <p>Loading notification...</p>,
              },
              {
                id: 'skeleton3',
                header: 'Loading...',
                children: <p>Loading notification...</p>,
              },
            ]}
            loading
            showChevron
            showDivider
            size="md"
            spacing="default"
            variant="default"
          />
        ) : (
          <Accordion
            chevronPosition="right"
            collapsible
            iconType="chevron"
            items={notifications}
            showChevron
            showDivider
            size="md"
            spacing="default"
            variant="default"
          />
        )}
      </Modal>
    </>
  );
};

export default TopBar;
