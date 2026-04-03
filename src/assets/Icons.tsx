// src/components/Icons.tsx
import React from 'react';
import {
  FiUser,
  FiLock,
  FiGrid,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiBell,
  FiSettings,
} from 'react-icons/fi';

// User Icon
export const UserIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = 'currentColor',
}) => <FiUser size={size} color={color} />;

// Lock Icon
export const LockIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = 'currentColor',
}) => <FiLock size={size} color={color} />;

// Dashboard Icon
export const DashboardIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = 'currentColor',
}) => <FiGrid size={size} color={color} />;

// Products Icon
export const ProductsIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = 'currentColor',
}) => <FiBox size={size} color={color} />;

// Orders Icon
export const OrdersIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = 'currentColor',
}) => <FiShoppingCart size={size} color={color} />;

// Users Icon
export const UsersIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = 'currentColor',
}) => <FiUsers size={size} color={color} />;

// Analytics Icon
export const AnalyticsIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = 'currentColor',
}) => <FiBarChart2 size={size} color={color} />;

// Settings Icon
export const SettingsIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = 'currentColor',
}) => <FiSettings size={size} color={color} />;

// Notifications Icon
export const NotificationsIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = 'currentColor',
}) => <FiBell size={size} color={color} />;
