import Editor from '@monaco-editor/react';
import { Box, Button, Paper } from '@mui/material';
import { Download, Chat } from '@mui/icons-material';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import api from '../../services/api';
import { API_ROUTE } from '../../constants/apiRoutes';
import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router';
import { Loader } from '../../components/Loader';
export const CodeReview = () => {
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const candidateId = useParams().id;


  const handleReviewCode = async () => {
    setIsLoading(true);
    const response = await api.get(API_ROUTE.reviewCode + `/${candidateId}`);

    if(response.status === 200) {
      setReview(response.data);
    } else {
      enqueueSnackbar('Error reviewing code', { variant: 'error' });
    }
    setIsLoading(false);
  };

  const handleDownloadCode = async () => {
    try {
        const response = await api.get(`${API_ROUTE.downloadCode}/${candidateId}`, {
            responseType: 'blob' // Ensure response is treated as a Blob
        });
        
        if (response.status === 200) {
            const file = new Blob([response.data], { type: response.headers['content-type'] || 'application/zip' });
            const url = URL.createObjectURL(file);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'code.zip';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            URL.revokeObjectURL(url); // Cleanup
        }
    } catch (error) {
        console.error('Error downloading file:', error);
    }
  };

  const handleAcceptCandidate = async () => {
    await api.post(`${API_ROUTE.acceptCandidate}/${candidateId}`);
  };

  const handleRejectCandidate = async () => {
    await api.post(`${API_ROUTE.rejectCandidate}/${candidateId}`);
  };

  return (
    <div>
      {isLoading && <Loader isOpen={isLoading} />}
      <Box display="flex" alignItems="center" width="100%" marginBlock={2}>
        <Button variant="contained" startIcon={<Download />} color="primary" sx={{marginRight: 2}} onClick={handleDownloadCode}>
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
            paddingLeft: 1,
            paddingRight: 1,
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
