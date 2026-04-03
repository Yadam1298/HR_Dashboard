// src/components/Inventory.tsx
import { useState } from 'react';
import {
  Box,
  ThemeProvider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableHeaderCell,
  Button,
  Toast,
} from '@luxis-ui/react';

const inventoryData = [
  {
    id: 1,
    item: 'Laptop',
    category: 'Electronics',
    quantity: 15,
    status: 'in-stock',
    lastUpdated: '2026-03-30',
  },
  {
    id: 2,
    item: 'Office Chair',
    category: 'Furniture',
    quantity: 30,
    status: 'in-stock',
    lastUpdated: '2026-03-28',
  },
  {
    id: 3,
    item: 'Projector',
    category: 'Electronics',
    quantity: 5,
    status: 'low-stock',
    lastUpdated: '2026-03-25',
  },
  {
    id: 4,
    item: 'Stationery Set',
    category: 'Supplies',
    quantity: 50,
    status: 'in-stock',
    lastUpdated: '2026-03-29',
  },
  {
    id: 5,
    item: 'Printer',
    category: 'Electronics',
    quantity: 0,
    status: 'out-of-stock',
    lastUpdated: '2026-03-20',
  },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  'in-stock': { bg: '#f0fdf4', color: '#16a34a' },
  'low-stock': { bg: '#fffbeb', color: '#d97706' },
  'out-of-stock': { bg: '#fef2f2', color: '#dc2626' },
};

const Inventory = () => {
  const [toastQueue, setToastQueue] = useState<
    { message: string; variant: 'success' | 'error' }[]
  >([]);
  const [currentToast, setCurrentToast] = useState<{
    message: string;
    variant: 'success' | 'error';
  } | null>(null);

  const enqueueToast = (message: string, variant: 'success' | 'error') => {
    setToastQueue((prev) => [...prev, { message, variant }]);
  };

  if (!currentToast && toastQueue.length > 0) {
    const [next, ...rest] = toastQueue;
    setCurrentToast(next);
    setToastQueue(rest);
  }

  const handleRestock = (itemName: string) => {
    enqueueToast(`${itemName} has been restocked successfully!`, 'success');
  };

  return (
    <ThemeProvider>
      <Box w="100%" p={24} bg="#fff" borderRadius={12} shadow="md">
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
          HR Inventory Dashboard
        </h2>

        <TableContainer maxHeight={400}>
          <Table hoverable size="md" variant="simple" stickyHeader>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Item</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell numeric>Quantity</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Last Updated</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {inventoryData.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell style={{ color: '#000' }}>{inv.item}</TableCell>
                  <TableCell style={{ color: '#000' }}>
                    {inv.category}
                  </TableCell>
                  <TableCell numeric style={{ color: '#000' }}>
                    {inv.quantity}
                  </TableCell>
                  <TableCell>
                    <span
                      style={{
                        background: statusColors[inv.status].bg,
                        color: statusColors[inv.status].color,
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 600,
                        padding: '2px 8px',
                      }}
                    >
                      {inv.status}
                    </span>
                  </TableCell>
                  <TableCell style={{ color: '#000' }}>
                    {inv.lastUpdated}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="primary"
                      disabled={inv.status === 'in-stock'}
                      onClick={() => handleRestock(inv.item)}
                    >
                      Restock
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Toast container */}
        <div style={{ position: 'fixed', top: 60, right: 16, zIndex: 9999 }}>
          {currentToast && (
            <Toast
              key={Math.random()}
              animationDuration={300}
              autoClose={5000}
              closeButton
              title={currentToast.message}
              pauseOnHover
              progressBar
              variant={currentToast.variant}
              onClose={() => setCurrentToast(null)}
            />
          )}
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default Inventory;
