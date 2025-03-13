import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router';

interface Candidate {
  id: string;

  name: string;

  email: string;

  status: 'Pending' | 'Interviewed' | 'Rejected' | 'Hired';
}

const CandidateListing: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock data - replace this with your actual data fetching logic
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'Pending'
    }
  ];

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (candidateId: string) => {
    navigate(`/candidates/${candidateId}`);
  };

  const redirectToSlotManagement = () => {
    navigate(`/slot-management`);
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid xs={12} textAlign={'right'} mb={2}>
          <Button variant='contained' onClick={redirectToSlotManagement}>My Interview Slots</Button>
        </Grid>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Grid xs={12}>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Candidate Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Application Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {candidates
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((candidate) => (
                      <TableRow
                        key={candidate.id}
                        hover
                        onClick={() => handleRowClick(candidate.id)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>{candidate.name}</TableCell>
                        <TableCell>{candidate.email}</TableCell>
                        <TableCell>{candidate.status}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={candidates.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Paper>
      </Grid>

    </>
  );
};

export default CandidateListing;