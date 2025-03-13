import React, { useState, useEffect } from 'react';
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
import api from '../../services/api.ts';
import { API_ROUTE } from '../../constants/apiRoutes.ts';
import { HttpStatusCode } from 'axios';
import { Loader } from '../../components/Loader.tsx';
import SlotManagement from '../../components/SlotManagement.tsx';
import { ROLE } from '../Home.tsx';
import { humanize } from '../../utils/formatter.ts';

enum INTERVIEW_STATUS {
  APPLICATION_SUBMITTED,
  CODE_REVIEWED,
  CODE_PAIRED,
  TECHNICAL_REVIEW_I,
  TECHNICAL_REVIEW_II,
  SELECTED,
  REJECTED
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  interviewStatus: INTERVIEW_STATUS;
}

const CandidateListing: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInterviewSlotModalOpen, setIsInterviewSlotModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.get(API_ROUTE.candidateListing).then((response) => {
      if (response.status === HttpStatusCode.Ok) {
        setCandidates(response.data);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) return <Loader isOpen={isLoading} />;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (candidateId: string) => {
    navigate(`/candidates/${candidateId}`);
  };

  return (
    <>
      <SlotManagement open={isInterviewSlotModalOpen} onClose={() => setIsInterviewSlotModalOpen(false)} />
      <Grid container spacing={0}>
        {
          localStorage.getItem('role') === ROLE.INTERVIEWER &&
          <Grid xs={12} textAlign={'right'} mb={2}>
            <Button variant='contained' onClick={() => setIsInterviewSlotModalOpen(true)}>My Interview Slots</Button>
          </Grid>
        }
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Grid xs={12}>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Candidate Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
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
                        <TableCell>{humanize(candidate.interviewStatus.toString())}</TableCell>
                      </TableRow>
                    ))}
                  {
                    !candidates.length ? (
                      <TableRow
                      >
                        <TableCell colSpan={3} sx={{ textAlign: 'center' }}>No records found</TableCell>
                      </TableRow>
                    ) : ('')
                  }
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