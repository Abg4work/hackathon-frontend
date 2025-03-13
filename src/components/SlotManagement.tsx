import {
  DialogTitle,
  DialogContent,
  Dialog,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { useState } from 'react';
import { API_ROUTE } from '../constants/apiRoutes.ts';
import api from '../services/api.ts';
import { enqueueSnackbar } from 'notistack';

const slots = [
  '09AM - 11AM',
  '11AM - 01PM',
  '02PM - 04PM',
  '04PM - 06PM'
];

const SlotManagement = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [selectedDays, setSelectedDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  });
  const [slot, setSlot] = useState('');

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDays({
      ...selectedDays,
      [event.target.name]: event.target.checked
    });
  };

  const formatInterviewSlots = (availability: { [key: string]: boolean }, slotTime: string) => {
    const formattedSlots: { interviewSlots: { slotTime: any; slotDay: string; }[] } = {
      interviewSlots: []
    };

    for (const [day, isAvailable] of Object.entries(availability)) {
      if (isAvailable) {
        formattedSlots.interviewSlots.push({
          slotTime: slotTime,
          slotDay: day
        });
      }
    }

    return formattedSlots;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    api.post(`${API_ROUTE.saveSlots}/123`, formatInterviewSlots(selectedDays, slot)).then((_data) => {
        enqueueSnackbar('Slots saved successfully!', {
          variant: 'success',
          autoHideDuration: 3000
        });
        onClose();
      }
    );
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Please select your interview slot availability</DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit} sx={{ maxWidth: 400, m: 2 }}>
          <FormGroup sx={{ mb: 3 }}>
            <FormControlLabel
              control={<Checkbox checked={selectedDays.monday} onChange={handleDayChange} name='monday' />}
              label='Monday'
            />
            <FormControlLabel
              control={<Checkbox checked={selectedDays.tuesday} onChange={handleDayChange} name='tuesday' />}
              label='Tuesday'
            />
            <FormControlLabel
              control={<Checkbox checked={selectedDays.wednesday} onChange={handleDayChange} name='wednesday' />}
              label='Wednesday'
            />
            <FormControlLabel
              control={<Checkbox checked={selectedDays.thursday} onChange={handleDayChange} name='thursday' />}
              label='Thursday'
            />
            <FormControlLabel
              control={<Checkbox checked={selectedDays.friday} onChange={handleDayChange} name='friday' />}
              label='Friday'
            />
            <FormControlLabel
              control={<Checkbox checked={selectedDays.saturday} onChange={handleDayChange} name='saturday' />}
              label='Saturday'
            />
            <FormControlLabel
              control={<Checkbox checked={selectedDays.sunday} onChange={handleDayChange} name='sunday' />}
              label='Sunday'
            />
          </FormGroup>

          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Slot Time</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={slot}
              label='Slot Time'
              onChange={(event: SelectChangeEvent<string>) => setSlot(event.target.value)}
            >
              {
                slots.map(slot => (
                  <MenuItem value={slot}>{slot}</MenuItem>
                ))
              }
            </Select>
          </FormControl>

          <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
            Save Slots
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SlotManagement;