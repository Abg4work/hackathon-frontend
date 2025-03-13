import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { CodeReview } from './pages/CodeReview/CodeReview.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/interview/code-review" element={<CodeReview />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
