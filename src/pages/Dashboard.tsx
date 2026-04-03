// src/components/Dashboard.tsx
import { useEffect, useState } from 'react';
import { Box, SideMenu } from '@luxis-ui/react';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import TopBar from '../components/Topbar';

import {
  DashboardIcon,
  ProductsIcon,
  OrdersIcon,
  UsersIcon,
  AnalyticsIcon,
  SettingsIcon,
} from '../assets/Icons';
import DashboardOverview from '../components/DashboardOverview';
import TeamProjects from '../components/TeamProjects';
import Employees from '../components/Employees';
import Clients from '../components/Clients';
import Inventory from '../components/Inventory';
import Orders from '../components/Orders';
import Analytics from '../components/Analytics';
import Account from '../components/Account';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || 'User');
  }, []);

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon /> },
    {
      label: 'Person Relations',
      icon: <UsersIcon />,
      items: [
        { label: 'Employees', icon: <UsersIcon /> },
        { label: 'Clients', icon: <UsersIcon /> },
        { label: 'Inventory', icon: <ProductsIcon />, badge: 12 },
      ],
    },
    { label: 'Orders', icon: <OrdersIcon />, badge: 5 },
    { label: 'Team Projects', icon: <UsersIcon /> },
    { label: 'Analytics', icon: <AnalyticsIcon /> },
    {
      label: 'Account',
      icon: <SettingsIcon />,
    },
  ];

  // Recursive function to add onClick to all items including children
  const addOnClick = (items: any[]) =>
    items.map((item) => {
      const newItem = {
        ...item,
        active: activeTab === item.label,
        onClick: () => setActiveTab(item.label),
      };
      if (item.items) {
        newItem.items = addOnClick(item.items);
      }
      return newItem;
    });

  // Map activeTab to actual component or placeholder JSX
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardOverview />;
      case 'Employees':
        return <Employees />;
      case 'Clients':
        return <Clients />;
      case 'Inventory':
        return <Inventory />;
      case 'Orders':
        return <Orders />;
      case 'Team Projects':
        return <TeamProjects />;
      case 'Analytics':
        return <Analytics />;
      case 'Account':
        return <Account />;

      default:
        return <Box p={4}>Select a tab from the side menu.</Box>;
    }
  };

  return (
    <Box>
      {/* Sidebar (Fixed Left) */}
      <Box position="fixed" left="0" top="0" h="100vh" zIndex={1000}>
        <SideMenu
          collapsed={collapsed}
          collapsedWidth="80px"
          width="260px"
          header={<Logo collapsed={collapsed} />}
          footer={<Footer collapsed={collapsed} />}
          items={addOnClick(menuItems)}
        />
      </Box>

      {/* Topbar (Fixed Top) */}
      <Box
        position="fixed"
        top="0"
        left={collapsed ? '80px' : '260px'}
        right="0"
        h="70px"
        bg="white"
        zIndex={999}
      >
        <TopBar
          username={username}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </Box>

      {/* Main Content (Scrollable Only Here) */}
      <Box
        ml={collapsed ? '80px' : '260px'} // space for sidebar
        mt="70px" // space for topbar
        p={6}
        h="calc(100vh - 70px)"
        style={{ overflowY: 'auto' }}
        bg="#f0f2f5"
      >
        {renderActiveTab()}
      </Box>
    </Box>
  );
};

export default Dashboard;
