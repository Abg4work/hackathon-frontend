import { Paper, Typography, Box, Grid2 } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import LaptopIcon from '@mui/icons-material/Laptop';
import { useNavigate } from 'react-router';

export enum ROLE {
  CANDIDATE="CANDIDATE",
  INTERVIEWER="INTERVIEWER",
  HR="HR"
}

function getContentForCard(item: number) {
  switch (item) {
    case 1:
      return (<Box>
        <GroupIcon fontSize={'large'} />
        <Typography variant={'h5'}>I am an HR</Typography>
      </Box>);
    case 2:
      return (<Box>
        <LaptopIcon fontSize={'large'} />
        <Typography variant={'h5'}>I am an Interviewer</Typography>
      </Box>);
    case 3:
      return (<Box>
        <PersonIcon fontSize={'large'} />
        <Typography variant={'h5'}>I am a Candidate</Typography>
      </Box>);
    default:
      break;
  }
}

export const Home = () => {
  const navigate = useNavigate();
  const handleClick = (index: number) => {
    switch (index) {
      case 1:
        navigate(`/candidates`);
        localStorage.setItem('role', ROLE.HR);
        break;
      case 2:
        navigate(`/candidates`);
        localStorage.setItem('role', ROLE.INTERVIEWER);
        break;
      case 3:
        navigate(`/candidates/register`);
        localStorage.setItem('role', ROLE.CANDIDATE);
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ marginTop: 10 }}>
      <Grid2 container sx={{ display: 'flex', justifyContent: 'center' }} gap={5}>
        <Paper
          onClick={() => handleClick(1)}
          sx={{
            width: '300px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
            textAlign: 'center',
            cursor: 'pointer',
            transition: '0.3s',
            '&:hover': {
              backgroundColor: 'primary.light',
              transform: 'scale(1.05)'
            }
          }}
          elevation={3}
        >
          {getContentForCard(1)}
        </Paper>

        {/*    position: relative;
         top: 50%;
         transform: translate(-50%, -50%);
         left: 50%;
         }*/}
        <Paper
          onClick={() => handleClick(2)}
          sx={{
            width: '300px',
            height: '200px',
            padding: 3,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: '0.3s',
            '&:hover': {
              backgroundColor: 'primary.light',
              transform: 'scale(1.05)'
            }
          }}
          elevation={3}
        >
          {getContentForCard(2)}
        </Paper>

        <Paper
          onClick={() => handleClick(3)}
          sx={{
            width: '300px',
            height: '200px',
            padding: 3,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: '0.3s',
            '&:hover': {
              backgroundColor: 'primary.light',
              transform: 'scale(1.05)'
            }
          }}
          elevation={3}
        >
          {getContentForCard(3)}
        </Paper>
      </Grid2>

    </Box>
  );
};
