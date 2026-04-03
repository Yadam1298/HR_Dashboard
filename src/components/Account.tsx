// src/components/Account.tsx
import { useState } from 'react';
import {
  Box,
  ThemeProvider,
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Badge,
  Avatar,
} from '@luxis-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const activitiesData = [
  { date: '2026-04-01', activity: 'Logged in', status: 'Success' },
  {
    date: '2026-03-30',
    activity: 'Approved leave for employee',
    status: 'Success',
  },
  { date: '2026-03-28', activity: 'Updated company policy', status: 'Success' },
  { date: '2026-03-27', activity: 'Failed login attempt', status: 'Failed' },
  {
    date: '2026-03-25',
    activity: 'Generated payroll report',
    status: 'Success',
  },
];

const leaveData = [
  { month: 'Jan', leaves: 2 },
  { month: 'Feb', leaves: 1 },
  { month: 'Mar', leaves: 3 },
  { month: 'Apr', leaves: 1 },
  { month: 'May', leaves: 0 },
];

const activityOverTime = [
  { date: '2026-01-01', actions: 5 },
  { date: '2026-02-01', actions: 7 },
  { date: '2026-03-01', actions: 6 },
  { date: '2026-04-01', actions: 8 },
];

const Account = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <ThemeProvider>
      <Box w="100%" p={24} display="grid" gap={24}>
        {/* Soft-Rounded Tabs */}
        <Tabs
          value={activeTab}
          onChange={(v) => setActiveTab(v)}
          variant="soft-rounded"
        >
          <TabList>
            <Tab value="Overview">Overview</Tab>
            <Tab value="Activities">Activities</Tab>
            <Tab value="Salary">Salary & Benefits</Tab>
            <Tab value="Leaves">Leaves</Tab>
            <Tab value="Notifications">Notifications</Tab>
          </TabList>

          <TabPanels>
            {/* Overview Panel */}
            <TabPanel value="Overview">
              <Card size="lg" variant="elevated">
                <Box display="flex" alignItems="center" gap={16}>
                  <Avatar src="https://i.pravatar.cc/100" size="lg" />
                  <Box>
                    <h3>John Doe</h3>
                    <p>HR Manager</p>
                    <p>Last login: 2026-04-01 09:45 AM</p>
                    <Badge color="success">Active</Badge>
                  </Box>
                </Box>
              </Card>
            </TabPanel>

            {/* Activities Panel */}
            <TabPanel value="Activities">
              <Card size="lg" variant="elevated">
                <h3>Recent Activities</h3>
                <Table hoverable size="md" variant="simple">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Date</TableHeaderCell>
                      <TableHeaderCell>Activity</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ color: '#000' }}>
                    {activitiesData.map((act, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{act.date}</TableCell>
                        <TableCell>{act.activity}</TableCell>
                        <TableCell>
                          <Badge
                            color={
                              act.status === 'Success' ? 'success' : 'error'
                            }
                          >
                            {act.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Box mt={24}>
                  <h3>Activity Over Time</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={activityOverTime}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="actions"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
            </TabPanel>

            {/* Salary & Benefits Panel */}
            <TabPanel value="Salary">
              <Card size="lg" variant="elevated">
                <h3>Salary & Benefits</h3>
                <Table hoverable size="md" variant="simple">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Type</TableHeaderCell>
                      <TableHeaderCell>Amount</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ color: '#000' }}>
                    <TableRow>
                      <TableCell>Base Salary</TableCell>
                      <TableCell>$5000</TableCell>
                      <TableCell>
                        <Badge color="success">Paid</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bonus</TableCell>
                      <TableCell>$500</TableCell>
                      <TableCell>
                        <Badge color="warning">Pending</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Deductions</TableCell>
                      <TableCell>$100</TableCell>
                      <TableCell>
                        <Badge color="error">Applied</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </TabPanel>

            {/* Leaves Panel */}
            <TabPanel value="Leaves">
              <Card size="lg" variant="elevated">
                <h3>Leaves History</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={leaveData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="leaves" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </TabPanel>

            {/* Notifications Panel */}
            <TabPanel value="Notifications">
              <Card size="lg" variant="elevated">
                <h3>Notifications / Alerts</h3>
                <ul>
                  <li>Salary for April released</li>
                  <li>Policy update on remote work</li>
                  <li>Pending approvals: 3</li>
                  <li>Security alert: New device login</li>
                </ul>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ThemeProvider>
  );
};

export default Account;
