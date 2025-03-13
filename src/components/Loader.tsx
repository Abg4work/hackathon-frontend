import { Dialog, DialogContent, CircularProgress } from '@mui/material';

export const Loader = ({ isOpen }: { isOpen: boolean; }) => {
  return <Dialog open={isOpen} onClose={() => {
  }}>
    <DialogContent>
      <CircularProgress />
    </DialogContent>
  </Dialog>;
};