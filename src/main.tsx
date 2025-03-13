import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { CodeReview } from './pages/CodeReview/CodeReview.tsx';
import { createTheme, ThemeProvider } from '@mui/material';
import Header from './components/Header.tsx';

const theme = createTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Header
        username="John Doe"
        title="Dashboard"
        avatarUrl="https://example.com/avatar.jpg" // Optional
      />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/interview/code-review" element={<CodeReview />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
