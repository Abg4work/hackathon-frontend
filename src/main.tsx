import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { CodeReview } from './pages/CodeReview/CodeReview.tsx';
import { createTheme, ThemeProvider, Box } from '@mui/material';
import Header from './components/Header.tsx';
import CandidateListing from './pages/Candidate/CandidateListing.tsx';
import CandidateInfo from './pages/Candidate/CandidateInfo.tsx';
import { SnackbarProvider } from 'notistack';
import { CandidateRegistration } from './pages/Candidate/CandidateRegistration.tsx';
import { Home } from './pages/Home.tsx';

const theme = createTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Box bgcolor={'#d3d3d329'} height={'100vh'} width={'100vw'}>
            <Header
              username='John Doe'
              title='Dashboard'
              avatarUrl='https://example.com/avatar.jpg'
            />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/code-review' element={<Box padding={'100px'}><CodeReview /></Box>} />
              <Route path='/candidates' element={<Box padding={'100px'}><CandidateListing /></Box>} />
              <Route path='/candidates' element={<Box padding={'100px'}><CandidateListing /></Box>} />
              <Route path='/candidates/register' element={<Box padding={'100px'}><CandidateRegistration /></Box>} />
              <Route path='/candidates/:id' element={<CandidateInfo />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>
);
