// src/components/Clients.tsx
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
  Modal,
  Toast,
  Rating,
} from '@luxis-ui/react';

const clientsData = [
  {
    id: 1,
    name: 'Acme Corp',
    project: 'Website Redesign',
    payment: 5000,
    rating: 4,
    completed: true,
    status: 'active',
  },
  {
    id: 2,
    name: 'Globex Inc',
    project: 'Mobile App',
    payment: 12000,
    rating: 5,
    completed: false,
    status: 'pending',
  },
  {
    id: 3,
    name: 'Initech',
    project: 'Backend API',
    payment: 8000,
    rating: 3,
    completed: true,
    status: 'active',
  },
  {
    id: 4,
    name: 'Umbrella Corp',
    project: 'AI Chatbot',
    payment: 15000,
    rating: 2,
    completed: false,
    status: 'inactive',
  },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  active: { bg: '#f0fdf4', color: '#16a34a' },
  inactive: { bg: '#fef2f2', color: '#dc2626' },
  pending: { bg: '#fffbeb', color: '#d97706' },
};

const Clients = () => {
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

  const handlePaymentDone = (clientName: string) => {
    enqueueToast(`Payment recorded for ${clientName}`, 'success');
  };

  return (
    <ThemeProvider>
      <Box w="100%" p={24} bg="#fff" borderRadius={12} shadow="md">
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
          Clients & Projects
        </h2>

        <TableContainer maxHeight={400}>
          <Table hoverable size="md" variant="simple" stickyHeader>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Client Name</TableHeaderCell>
                <TableHeaderCell>Project</TableHeaderCell>
                <TableHeaderCell numeric>Payment ($)</TableHeaderCell>
                <TableHeaderCell>Project Rating</TableHeaderCell>
                <TableHeaderCell>Project Completed</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {clientsData.map((client) => (
                <TableRow key={client.id}>
                  <TableCell style={{ color: '#000' }}>{client.name}</TableCell>
                  <TableCell style={{ color: '#000' }}>
                    {client.project}
                  </TableCell>
                  <TableCell numeric style={{ color: '#000' }}>
                    ${client.payment.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Rating
                      color="warning"
                      max={5}
                      size="md"
                      value={client.rating}
                    />
                  </TableCell>
                  <TableCell style={{ color: '#000' }}>
                    {client.completed ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>
                    <span
                      style={{
                        background: statusColors[client.status].bg,
                        color: statusColors[client.status].color,
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 600,
                        padding: '2px 8px',
                      }}
                    >
                      {client.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="primary"
                      disabled={client.status !== 'active'}
                      onClick={() => handlePaymentDone(client.name)}
                    >
                      Record Payment
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

export default Clients;
