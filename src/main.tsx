import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { CodeReview } from './pages/CodeReview/CodeReview.tsx';
import { createTheme, ThemeProvider, Box } from '@mui/material';
import Header from './components/Header.tsx';
import CandidateListing from './pages/CandidateListing/CandidateListing.tsx';

const theme = createTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box bgcolor={'#d3d3d329'} height={'100vh'} width={'100vw'}>
          <Header
            username='John Doe'
            title='Dashboard'
            avatarUrl='https://example.com/avatar.jpg'
          />
          <Box padding={'100px'} mt={10}>
            <Routes>
              <Route path='/' element={<App />} />
              <Route path='/interviewer/code-review' element={<CodeReview />} />
              <Route path='/interviewer/candidates' element={<CandidateListing />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
