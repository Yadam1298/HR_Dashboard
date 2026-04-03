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
  { department: 'Engineering', count: 12 },
  { department: 'Design', count: 5 },
  { department: 'Product', count: 4 },
  { department: 'Finance', count: 3 },
];

const projectData = [
  { status: 'Completed', count: 18 },
  { status: 'In Progress', count: 7 },
  { status: 'Not Started', count: 3 },
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
  const departmentOptions = ['All', ...employeeData.map((d) => d.department)];

  return (
    <ThemeProvider>
      <Box
        w="100%"
        p={24}
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap={24}
      >
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
                      fill={COLORS[index % COLORS.length]}
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
                      d.department === selectedDepartment,
                  )
                  .map((d) => (
                    <TableRow key={d.department}>
                      <TableCell style={{ color: '#000' }}>
                        {d.department}
                      </TableCell>
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
