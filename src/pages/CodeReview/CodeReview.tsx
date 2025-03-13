import Editor from '@monaco-editor/react';
import { Box, Button, Paper } from '@mui/material';
import { Download, Chat } from '@mui/icons-material';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export const CodeReview = () => {
  const [review, setReview] = useState('');
  return (
    <div>
      <Box display="flex" alignItems="center" gap="2rem" width="100vw" marginBlock={2}>
        <Button variant="contained" startIcon={<Download />} color="primary">
            Download code
        </Button>
        <Button variant="contained" startIcon={<Chat />} color="secondary">
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
            width: 'calc(50vw - 1rem)', 
            height: '50vh', 
            overflow: 'scroll',
            backgroundColor: 'background.paper'
          }}
        >
          <ReactMarkdown>{review}</ReactMarkdown>
        </Paper>
      </Box>
      <Box display="flex" alignItems="center" gap="2rem" marginBlock={2}>
        <Button variant="contained" color="error">
            Reject Candidate
        </Button>
        <Button variant="contained" color="success">
            Accept Candidate
        </Button>
      </Box>
    </div>
  );
};
