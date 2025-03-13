import { AppBar, Avatar, Box, Toolbar, Typography, Grid } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router';

interface HeaderProps {
  username: string;

  title: string;

  avatarUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ username, title, avatarUrl }) => {
  const navigate = useNavigate();
  return (
    <AppBar position='static'>
      <Grid container justifyContent={'space-between'}>
        <Grid item xs={6}>
          <PeopleIcon sx={{ cursor: 'pointer', width: '50px', height: '50px', marginLeft: 2, marginTop: 0.5 }} onClick={() => {
            navigate('/home');
            localStorage.removeItem('role')
          }} />
        </Grid>
        <Grid item xs={6} textAlign={'right'}>
          <Toolbar sx={{ float: 'right' }}>
            <Avatar
              src={avatarUrl}
              alt={title}
              sx={{ marginRight: 2 }}
            >
              {/* If no avatar URL is provided, show first letter of username */}
              {title.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant='h6' component='div'>
                {title}
              </Typography>
              <Typography variant='subtitle2' component='div'>
                {username}
              </Typography>
            </Box>
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header; 