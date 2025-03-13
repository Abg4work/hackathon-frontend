import { DialogTitle, DialogContent, Dialog } from '@mui/material';

const SlotAvailability = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Schedule Interview</DialogTitle>
      <DialogContent>

      </DialogContent>
    </Dialog>
  );
};

export default SlotAvailability;