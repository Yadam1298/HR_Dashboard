// src/components/Analytics.tsx
import { useState } from 'react';
import {
  Box,
  ThemeProvider,
  Card,
  Select,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from '@luxis-ui/react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const employeeData = [
  { label: 'Engineering', count: 12 },
  { label: 'Design', count: 5 },
  { label: 'Product', count: 4 },
  { label: 'Finance', count: 3 },
];

const projectData = [
  { status: 'Completed', count: 18, color: '#0088FE' },
  { status: 'In Progress', count: 7, color: '#00C49F' },
  { status: 'Not Started', count: 3, color: '#FFBB28' },
];

const revenueData = [
  { month: 'Jan', revenue: 50000 },
  { month: 'Feb', revenue: 70000 },
  { month: 'Mar', revenue: 60000 },
  { month: 'Apr', revenue: 90000 },
  { month: 'May', revenue: 120000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

  // Safe options array for Select
  const departmentOptions = [
    { label: 'All', value: 'All' },
    ...employeeData.map((d) => ({
      label: d.label,
      value: d.label,
    })),
  ];
  return (
    <ThemeProvider>
      <Box w="100%" p={24} display="grid" gap={24}>
        {/* Revenue Line Chart */}
        <Card size="lg" variant="elevated">
          <Box>
            <h3>Total Revenue</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>

        {/* Project Status Pie Chart */}
        <Card size="lg" variant="elevated">
          <Box>
            <h3>Project Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={projectData}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {projectData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color || COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Card>

        {/* Employees per Department Bar Chart */}
        <Card size="lg" variant="elevated">
          <Box>
            <h3>Employees per Department</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={employeeData}>
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Card>

        {/* Department Table with Filtering */}
        <Card size="lg" variant="elevated">
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={16}
            >
              <h3>Department Employees</h3>
              <Select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                options={departmentOptions} // <-- use options prop instead of children
              />
            </Box>

            <Table hoverable size="md" variant="simple">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Department</TableHeaderCell>
                  <TableHeaderCell numeric>Employee Count</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeData
                  .filter(
                    (d) =>
                      selectedDepartment === 'All' ||
                      d.label === selectedDepartment,
                  )
                  .map((d) => (
                    <TableRow key={d.label}>
                      <TableCell style={{ color: '#000' }}>{d.label}</TableCell>
                      <TableCell numeric style={{ color: '#000' }}>
                        {d.count}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default Analytics;
