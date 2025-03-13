import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  SelectChangeEvent
} from '@mui/material';
import { CloudUpload, Delete, CheckCircle } from '@mui/icons-material';
import api from '../../services/api';
import { enqueueSnackbar } from 'notistack';
import { API_ROUTE } from '../../constants/apiRoutes';

interface Skill {
  name: string;
  skillLevel: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
}

interface FormData {
  name: string;
  email: string;
  yearsOfExperience: string;
  skills: Skill[];
  resume: File | null;
  assignment: File | null;
}

export const CandidateRegistration = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    yearsOfExperience: '',
    skills: [],
    resume: null,
    assignment: null
  });
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState<Skill>({ name: '', skillLevel: 'BEGINNER' });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    
    if (files) {
      setFormData(prev => ({
        ...prev,
        [name!]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name!]: value
      }));
    }
  };

  const handleSkillNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleSkillLevelChange = (e: SelectChangeEvent) => {
    setNewSkill(prev => ({
      ...prev,
      skillLevel: e.target.value as 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'
    }));
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill({ name: '', skillLevel: 'BEGINNER' });
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const uploadFile = async (file: File, id: string, fileType: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    console.log(file.name, fileType)
    
    try {
      const response = await api.post(`${API_ROUTE.fileUpload}?fileType=${fileType}&candidateId=${id}`, formData, {
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

  const uploadBothFiles = async (id: string) => {
    try {
      await uploadFile(formData.resume!, id, 'RESUME')
      await uploadFile(formData.assignment!, id, 'CODE')
      setFormData({ 
        name: '', 
        email: '', 
        yearsOfExperience: '', 
        skills: [], 
        resume: null,
        assignment: null,
      });
    } catch (error) {
      enqueueSnackbar('Error uploading file', { variant: 'error' });
      throw error;
    } finally {
      setLoading(false);
      setIsSuccess(true);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload files and get URLs
      const response = await api.post(API_ROUTE.registerCandidate, {
        name: formData.name,
        email: formData.email,
        experience: formData.yearsOfExperience,
        skills: formData.skills,
      });

      if(response.status === 200) {
        enqueueSnackbar('Candidate registered successfully', { variant: 'success' });

        uploadBothFiles(response.data);
      } else {
        enqueueSnackbar('Error registering candidate', { variant: 'error' });
      }
    } catch {
      enqueueSnackbar('Error registering candidate', { variant: 'error' });
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Registration Successful!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Thank you for registering. We will review your application and get back to you soon.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h5" gutterBottom>
          Candidate Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Years of Experience"
            name="yearsOfExperience"
            type="number"
            value={formData.yearsOfExperience}
            onChange={handleInputChange}
            margin="normal"
            required
          />

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Skills
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Skill Name"
                  name="name"
                  value={newSkill.name}
                  onChange={handleSkillNameChange}
                />
              </Grid>
              <Grid item xs={5}>
                <FormControl fullWidth>
                  <InputLabel>Level</InputLabel>
                  <Select
                    name="skillLevel"
                    value={newSkill.skillLevel}
                    label="Level"
                    onChange={handleSkillLevelChange}
                  >
                    <MenuItem value="BEGINNER">Beginner</MenuItem>
                    <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
                    <MenuItem value="EXPERT">Expert</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  onClick={addSkill}
                  disabled={!newSkill.name.trim()}
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            {formData.skills.map((skill, index) => (
              <Box key={index} sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">
                  {skill.name} - {skill.skillLevel}
                </Typography>
                <IconButton size="small" onClick={() => removeSkill(index)}>
                  <Delete />
                </IconButton>
              </Box>
            ))}
          </Box>
          
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
