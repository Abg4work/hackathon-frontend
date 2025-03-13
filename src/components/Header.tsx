import { AppBar, Avatar, Box, Toolbar, Typography, Grid } from '@mui/material';

interface HeaderProps {
  username: string;

  title: string;

  avatarUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ username, title, avatarUrl }) => {
  return (
    <AppBar position='static'>
      <Grid container justifyContent={'space-between'}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6} textAlign={'right'}>
          <Toolbar sx={{ float: 'right' }}>
            <Avatar
              src={avatarUrl}
              alt={username}
              sx={{ marginRight: 2 }}
            >
              {/* If no avatar URL is provided, show first letter of username */}
              {username.charAt(0).toUpperCase()}
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