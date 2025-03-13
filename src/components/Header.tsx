import { AppBar, Avatar, Box, Toolbar, Typography } from '@mui/material';

interface HeaderProps {
  username: string;
  title: string;
  avatarUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ username, title, avatarUrl }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar 
          src={avatarUrl} 
          alt={username}
          sx={{ marginRight: 2 }}
        >
          {/* If no avatar URL is provided, show first letter of username */}
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {username}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 