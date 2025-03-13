import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  CircularProgress
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import api from '../../services/api';
import { enqueueSnackbar } from 'notistack';

interface FormData {
  name: string;
  resume: File | null;
  assignment: File | null;
}

export const CandidateRegistration = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    resume: null,
    assignment: null
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    
    if (files) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.url;
    } catch (error) {
      enqueueSnackbar('Error uploading file', { variant: 'error' });
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload files and get URLs
      const [resumeUrl, assignmentUrl] = await Promise.all([
        uploadFile(formData.resume!),
        uploadFile(formData.assignment!)
      ]);

      // Register candidate
      await api.post('/candidate/register', {
        name: formData.name,
        resume: resumeUrl,
        assignment: assignmentUrl
      });

      enqueueSnackbar('Candidate registered successfully', { variant: 'success' });
      setFormData({ name: '', resume: null, assignment: null });
    } catch {
      enqueueSnackbar('Error registering candidate', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h5" gutterBottom>
          Candidate Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          
          <Box sx={{ mt: 2 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              fullWidth
            >
              Upload Resume
              <input
                type="file"
                hidden
                name="resume"
                onChange={handleInputChange}
                required
              />
            </Button>
            {formData.resume && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {formData.resume.name}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              fullWidth
            >
              Upload Assignment
              <input
                type="file"
                hidden
                name="assignment"
                onChange={handleInputChange}
                required
              />
            </Button>
            {formData.assignment && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {formData.assignment.name}
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
