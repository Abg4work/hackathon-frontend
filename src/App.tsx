import { Box } from '@mui/material';
import Header from './components/Header.tsx';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { Home } from './pages/Home.tsx';
import { CodeReview } from './pages/CodeReview/CodeReview.tsx';
import CandidateListing from './pages/Candidate/CandidateListing.tsx';
import { CandidateRegistration } from './pages/Candidate/CandidateRegistration.tsx';
import CandidateInfo from './pages/Candidate/CandidateInfo.tsx';

function App() {
  const { pathname } = useLocation();
  console.log(pathname);

  const isNotHomePath = pathname !== '/home';

  return (
    <>
      <Box bgcolor={isNotHomePath ? '#d3d3d329' : ''} height={'100vh'} width={'100vw'}>
        {
          isNotHomePath &&
          <Header
            username='John Doe'
            title='Dashboard'
            avatarUrl='https://example.com/avatar.jpg'
          />
        }
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/code-review' element={<Box padding={'100px'}><CodeReview /></Box>} />
          <Route path='/candidates' element={<Box padding={'100px'}><CandidateListing /></Box>} />
          <Route path='/candidates/register' element={<Box padding={'100px'}><CandidateRegistration /></Box>} />
          <Route path='/candidates/:id' element={<CandidateInfo />} />
          <Route path='*' element={<Navigate to='/home' />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
