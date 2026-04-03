// src/components/Orders.tsx
import { useState } from 'react';
import {
  ThemeProvider,
  Card,
  Box,
  Modal,
  Timeline,
  Button,
  Toast,
} from '@luxis-ui/react';

interface Order {
  id: number;
  customerName: string;
  projectName: string;
  projectTimeline: {
    label: string;
    description: string;
  }[];
}

const orders: Order[] = [
  {
    id: 1,
    customerName: 'Alice Chen',
    projectName: 'Website Redesign',
    projectTimeline: [
      { label: 'Create Account', description: 'Sign up with your email' },
      { label: 'Verify Email', description: 'Check your inbox' },
      { label: 'Complete Profile', description: 'Add your details' },
      { label: 'Invite Team', description: 'Add team members' },
      { label: 'Go Live', description: 'Start using the platform' },
    ],
  },
  {
    id: 2,
    customerName: 'Bob Martinez',
    projectName: 'Mobile App Development',
    projectTimeline: [
      { label: 'Kickoff', description: 'Initial meeting with client' },
      { label: 'Design', description: 'UI/UX design phase' },
      { label: 'Development', description: 'App development' },
      { label: 'Testing', description: 'QA & bug fixes' },
      { label: 'Launch', description: 'Deploy to app stores' },
    ],
  },
  {
    id: 3,
    customerName: 'Carol Johnson',
    projectName: 'Marketing Campaign',
    projectTimeline: [
      { label: 'Research', description: 'Market research & analysis' },
      { label: 'Plan', description: 'Campaign planning' },
      { label: 'Execution', description: 'Run ads & campaigns' },
      { label: 'Review', description: 'Analyze results' },
      { label: 'Report', description: 'Submit final report' },
    ],
  },
];

const Orders = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [toastConfig, setToastConfig] = useState<{
    show: boolean;
    message: string;
    variant: 'success' | 'error';
  }>({ show: false, message: '', variant: 'success' });

  const handleCustomerClick = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  return (
    <ThemeProvider>
      <Box
        w="100%"
        p={24}
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={16}
      >
        {orders.map((order) => (
          <Card
            key={order.id}
            clickable
            hoverable
            size="md"
            variant="elevated"
            onClick={() => handleCustomerClick(order)}
          >
            <h3 style={{ margin: 0 }}>{order.customerName}</h3>
            <p style={{ margin: '4px 0' }}>{order.projectName}</p>
          </Card>
        ))}
      </Box>

      {/* Modal for project timeline */}
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={selectedOrder?.projectName || ''}
        description={`Project Timeline for ${selectedOrder?.customerName || ''}`}
        centered
        animation="fade"
        showCloseButton
        preventScroll
        size="lg"
      >
        {selectedOrder && (
          <Timeline
            color="success"
            currentStep={2}
            orientation="vertical"
            showCheckmarks
            size="md"
            steps={selectedOrder.projectTimeline}
            variant="default"
          />
        )}
        <Box mt={16} textAlign="right">
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Box>
      </Modal>

      {/* Toast container */}
      {toastConfig.show && (
        <div style={{ position: 'fixed', top: 60, right: 16, zIndex: 9999 }}>
          <Toast
            key={Math.random()}
            animationDuration={300}
            autoClose={5000}
            closeButton
            title={toastConfig.message}
            pauseOnHover
            progressBar
            variant={toastConfig.variant}
            onClose={() => setToastConfig({ ...toastConfig, show: false })}
          />
        </div>
      )}
    </ThemeProvider>
  );
};

export default Orders;
