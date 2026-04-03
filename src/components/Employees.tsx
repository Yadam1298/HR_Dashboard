// src/components/Employees.tsx
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
} from '@luxis-ui/react';

const employees = [
  {
    id: 1,
    name: 'Alice Chen',
    email: 'alice@example.com',
    role: 'Engineer',
    department: 'Engineering',
    salary: 120000,
    status: 'active',
  },
  {
    id: 2,
    name: 'Bob Martinez',
    email: 'bob@example.com',
    role: 'Designer',
    department: 'Design',
    salary: 95000,
    status: 'active',
  },
  {
    id: 3,
    name: 'Carol Johnson',
    email: 'carol@example.com',
    role: 'Manager',
    department: 'Product',
    salary: 140000,
    status: 'inactive',
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david@example.com',
    role: 'Analyst',
    department: 'Finance',
    salary: 88000,
    status: 'pending',
  },
  {
    id: 5,
    name: 'Eva Patel',
    email: 'eva@example.com',
    role: 'Lead',
    department: 'Engineering',
    salary: 155000,
    status: 'active',
  },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  active: { bg: '#f0fdf4', color: '#16a34a' },
  inactive: { bg: '#fef2f2', color: '#dc2626' },
  pending: { bg: '#fffbeb', color: '#d97706' },
};

const Employees = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastQueue, setToastQueue] = useState<
    { message: string; variant: 'success' | 'error' }[]
  >([]);
  const [currentToast, setCurrentToast] = useState<{
    message: string;
    variant: 'success' | 'error';
  } | null>(null);

  const allActiveEmployeeIds = employees
    .filter((e) => e.status === 'active')
    .map((e) => e.id);
  const selectedEmployees = employees.filter((emp) =>
    selectedRows.includes(emp.id),
  );

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSelectAllChange = (checked: boolean) => {
    setSelectedRows(checked ? allActiveEmployeeIds : []);
  };

  const enqueueToast = (message: string, variant: 'success' | 'error') => {
    setToastQueue((prev) => [...prev, { message, variant }]);
  };

  // Show next toast if none is showing
  if (!currentToast && toastQueue.length > 0) {
    const [next, ...rest] = toastQueue;
    setCurrentToast(next);
    setToastQueue(rest);
  }

  const handleConfirmPayment = () => {
    setModalOpen(false);
    enqueueToast(
      `Salary payment successful for ${selectedEmployees.map((e) => e.name).join(', ')}`,
      'success',
    );
    setSelectedRows([]);
  };

  const handleCancelPayment = () => {
    setModalOpen(false);
    enqueueToast('Salary payment canceled!', 'error');
  };

  return (
    <ThemeProvider>
      <Box w="100%" p={24} bg="#fff" borderRadius={12} shadow="md">
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
          Employee Payroll
        </h2>

        <TableContainer maxHeight={400}>
          <Table hoverable size="md" variant="simple" stickyHeader>
            <TableHead>
              <TableRow>
                <TableHeaderCell>
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === allActiveEmployeeIds.length
                    }
                    ref={(el) => {
                      if (el)
                        el.indeterminate =
                          selectedRows.length > 0 &&
                          selectedRows.length < allActiveEmployeeIds.length;
                    }}
                    onChange={(e) => handleSelectAllChange(e.target.checked)}
                  />
                </TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
                <TableHeaderCell>Department</TableHeaderCell>
                <TableHeaderCell numeric>Salary</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(emp.id)}
                      onChange={() => toggleRowSelection(emp.id)}
                      disabled={emp.status !== 'active'}
                    />
                  </TableCell>
                  <TableCell style={{ color: '#000' }}>{emp.name}</TableCell>
                  <TableCell style={{ color: '#000' }}>{emp.email}</TableCell>
                  <TableCell style={{ color: '#000' }}>{emp.role}</TableCell>
                  <TableCell style={{ color: '#000' }}>
                    {emp.department}
                  </TableCell>
                  <TableCell numeric style={{ color: '#000' }}>
                    ${emp.salary.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span
                      style={{
                        background: statusColors[emp.status].bg,
                        color: statusColors[emp.status].color,
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 600,
                        padding: '2px 8px',
                      }}
                    >
                      {emp.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setSelectedRows([emp.id]);
                        setModalOpen(true);
                      }}
                      disabled={emp.status !== 'active'}
                    >
                      Pay Salary
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedRows.length > 0 && (
          <Box mt={16}>
            <Button variant="primary" onClick={() => setModalOpen(true)}>
              Pay Selected Salaries ({selectedRows.length})
            </Button>
          </Box>
        )}

        <Modal
          isOpen={modalOpen}
          onClose={handleCancelPayment}
          title="Confirm Salary Payment"
          description={`Are you sure you want to pay salaries to ${selectedEmployees.map((e) => e.name).join(', ')}?`}
          centered
          animation="fade"
          showCloseButton
          preventScroll
          footerButtons={[
            {
              label: 'Cancel',
              onClick: handleCancelPayment,
              variant: 'outline',
            },
            {
              label: 'Confirm Payment',
              onClick: handleConfirmPayment,
              variant: 'primary',
            },
          ]}
          size="md"
        >
          <p>
            This action will transfer the salary to the employee(s) account(s).
            Please confirm to proceed.
          </p>
        </Modal>

        <div style={{ position: 'fixed', top: 60, right: 16, zIndex: 9999 }}>
          {currentToast && (
            <Toast
              id={Date.now()}
              createdAt={Date.now()}
              isVisible={true}
              onDismiss={() => setCurrentToast(null)}
              animationDuration={300}
              autoClose={5000}
              closeButton
              pauseOnHover
              progressBar
              variant={currentToast.variant}
            >
              {currentToast.message}
            </Toast>
          )}
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default Employees;
