// src/components/DashboardOverview.tsx
import { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  MetricCard,
  UserIcon,
  LayersIcon,
  TrendingUpIcon,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
  Box,
} from '@luxis-ui/react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<any[]>([]);

  // 📊 Pie Chart Data (Employee Distribution)
  const pieData = [
    { label: 'Active', value: 20, color: '#22c55e' },
    { label: 'On Leave', value: 5, color: '#f59e0b' },
    { label: 'Resigned', value: 3, color: '#ef4444' },
  ];

  // 📊 Bar Chart Data (Monthly Hiring)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const hiringData = [2, 4, 3, 5, 6, 4];

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmployees([
        {
          name: 'Alice Johnson',
          position: 'Software Engineer',
          status: 'Active',
        },
        { name: 'Bob Smith', position: 'HR Manager', status: 'On Leave' },
        { name: 'Charlie Lee', position: 'Product Manager', status: 'Active' },
        { name: 'David Kim', position: 'Designer', status: 'Resigned' },
      ]);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      {/* 🔹 METRICS */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          {loading ? (
            <Skeleton height={120} />
          ) : (
            <MetricCard
              theme="modern"
              variant="success"
              title="Total Employees"
              value="28"
              change={2.5}
              trend="up"
              icon={<UserIcon />}
              description="this month"
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          {loading ? (
            <Skeleton height={120} />
          ) : (
            <MetricCard
              theme="modern"
              variant="info"
              title="Active Employees"
              value="20"
              change={1.2}
              trend="up"
              icon={<LayersIcon />}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          {loading ? (
            <Skeleton height={120} />
          ) : (
            <MetricCard
              theme="modern"
              variant="warning"
              title="On Leave"
              value="5"
              change={-0.5}
              trend="down"
              icon={<UserIcon />}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          {loading ? (
            <Skeleton height={120} />
          ) : (
            <MetricCard
              theme="modern"
              title="Attrition Rate"
              value="10%"
              change={1.5}
              trend="up"
              icon={<TrendingUpIcon />}
            />
          )}
        </Grid>
      </Grid>

      {/* 🔹 CHARTS */}
      <Grid container spacing={2} style={{ marginTop: '16px' }}>
        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined" header="Employee Distribution" divider>
            {loading ? (
              <Skeleton height={220} />
            ) : (
              <Box display="flex" justifyContent="center">
                <PieChart
                  series={[
                    {
                      innerRadius: 40,
                      outerRadius: 80,
                      data: pieData,
                      arcLabel: 'value',
                    },
                  ]}
                  width={250}
                  height={220}
                />
              </Box>
            )}
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={8}>
          <Card variant="outlined" header="Monthly Hiring Trend" divider>
            {loading ? (
              <Skeleton height={220} />
            ) : (
              <BarChart
                xAxis={[{ scaleType: 'band', data: months }]}
                series={[{ data: hiringData }]}
                width={500}
                height={220}
              />
            )}
          </Card>
        </Grid>
      </Grid>

      {/* 🔹 TABLE */}
      <Card variant="outlined" style={{ marginTop: '16px' }}>
        <h3>Employee Overview</h3>
        {loading ? (
          <Skeleton height={200} />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((emp, idx) => (
                <TableRow key={idx}>
                  <TableCell style={{ color: '#000' }}>{emp.name}</TableCell>
                  <TableCell style={{ color: '#000' }}>
                    {emp.position}
                  </TableCell>
                  <TableCell>
                    <span
                      style={{
                        color:
                          emp.status === 'Active'
                            ? '#22c55e'
                            : emp.status === 'On Leave'
                              ? '#f59e0b'
                              : '#ef4444',
                        fontWeight: 600,
                      }}
                    >
                      {emp.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </section>
  );
}
