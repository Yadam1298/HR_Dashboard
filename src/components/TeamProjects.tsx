// src/components/TeamProjects.tsx

import {
  Box,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableFooter,
  TableEmptyState,
  ThemeProvider,
} from '@luxis-ui/react';

const TeamProjects = () => {
  const users = [
    { src: 'https://i.pravatar.cc/150?img=1', fallback: 'A1', alt: 'User 1' },
    { src: 'https://i.pravatar.cc/150?img=2', fallback: 'A2', alt: 'User 2' },
    { src: 'https://i.pravatar.cc/150?img=3', fallback: 'A3', alt: 'User 3' },
    { src: undefined, fallback: 'JD', alt: 'Jane Doe' },
  ];

  const projects = [
    {
      id: 1,
      name: 'HR Management System',
      team: users,
      status: 'In Progress',
      tasks: 24,
    },
    {
      id: 2,
      name: 'Payroll Automation',
      team: users.slice(0, 3),
      status: 'Completed',
      tasks: 18,
    },
    {
      id: 3,
      name: 'Employee Analytics',
      team: users.slice(1, 4),
      status: 'Pending',
      tasks: 12,
    },
  ];

  return (
    <ThemeProvider>
      <Box bg="#fff" p={24} borderRadius={12} shadow="md" w="100%">
        {/* Header */}
        <Box
          mb={16}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Team Projects</h2>
        </Box>

        {/* Table */}
        <TableContainer maxHeight={350}>
          <Table variant="simple" hoverable stickyHeader>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Project</TableHeaderCell>
                <TableHeaderCell>Team</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell numeric>Tasks</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {projects.length === 0 ? (
                <TableEmptyState
                  colSpan={4}
                  message="No projects found"
                  description="Start by creating a new project."
                />
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    {/* Project Name */}
                    <TableCell style={{ color: '#000' }}>
                      {project.name}
                    </TableCell>

                    {/* Team Avatars */}
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        {project.team.map((u, i) => (
                          <Box key={i} ml={i === 0 ? 0 : -10}>
                            <Avatar
                              src={u.src}
                              fallback={u.fallback}
                              alt={u.alt}
                              size="md"
                              shape="circular"
                              style={{
                                border: '2px solid white',
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Box
                        px={10}
                        py={4}
                        borderRadius={8}
                        style={{
                          background:
                            project.status === 'Completed'
                              ? '#e6f4ea'
                              : project.status === 'In Progress'
                                ? '#fff4e5'
                                : '#fdecea',
                          color:
                            project.status === 'Completed'
                              ? '#2e7d32'
                              : project.status === 'In Progress'
                                ? '#ed6c02'
                                : '#d32f2f',
                          fontSize: 12,
                          fontWeight: 600,
                          display: 'inline-block',
                        }}
                      >
                        {project.status}
                      </Box>
                    </TableCell>

                    {/* Tasks */}
                    <TableCell numeric style={{ color: '#000' }}>
                      {project.tasks}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>

            {/* Footer */}
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} style={{ fontWeight: 600 }}>
                  Total Tasks
                </TableCell>
                <TableCell numeric style={{ fontWeight: 700 }}>
                  {projects.reduce((sum, p) => sum + p.tasks, 0)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
};

export default TeamProjects;
