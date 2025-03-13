import Editor from '@monaco-editor/react';
import { Box, Button, Paper } from '@mui/material';
import { Download, Chat } from '@mui/icons-material';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import api from '../../services/api';
import { API_ROUTE } from '../../constants/apiRoutes';
import { enqueueSnackbar } from 'notistack';

export const CodeReview = () => {
  const [review, setReview] = useState('');

  const handleReviewCode = async () => {
    const response = await api.post(API_ROUTE.reviewCode, {
      code: review,
    });

    if(response.status === 200) {
      setReview(response.data.review);
    } else {
      enqueueSnackbar('Error reviewing code', { variant: 'error' });
    }
  };

  const handleDownloadCode = async () => {
    await api.post(API_ROUTE.downloadCode);
  };

  const handleAcceptCandidate = async () => {
    await api.post(API_ROUTE.acceptCandidate);
  };

  const handleRejectCandidate = async () => {
    await api.post(API_ROUTE.rejectCandidate);
  };

  return (
    <div>
      <Box display="flex" alignItems="center" width="100%" marginBlock={2} onClick={handleDownloadCode}>
        <Button variant="contained" startIcon={<Download />} color="primary" sx={{marginRight: 2}}>
            Download code
        </Button>
        <Button variant="contained" startIcon={<Chat />} color="secondary" onClick={handleReviewCode}>
            Review code with AI
        </Button>
      </Box>
      <Box display="flex" gap={2} width="100vw">
        <Editor
          height="50vh"
          width="calc(50vw - 1rem)"
          theme='vs-dark'
          defaultLanguage="markdown"
          value={review}
          onChange={(value) => setReview(value || '')}
          defaultValue="# Enter your review here"
        />
        <Paper 
          elevation={3} 
          sx={{ 
            width: 'calc(45vw - 1rem)',
            height: '50vh', 
            overflow: 'scroll',
            backgroundColor: 'background.paper'
          }}
        >
          <ReactMarkdown>{review}</ReactMarkdown>
        </Paper>
      </Box>
      <Box display="flex" alignItems="center" mt={3}>
        <Button variant="contained" color="error" onClick={handleRejectCandidate} sx={{marginRight: 2}}>
            Reject Candidate
        </Button>
        <Button variant="contained" color="success" onClick={handleAcceptCandidate}>
            Accept Candidate
        </Button>
      </Box>
    </div>
  );
};
