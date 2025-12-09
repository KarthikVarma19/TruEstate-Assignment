import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { SalesProvider } from './context/salesContext.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SalesProvider>
        <App />
      </SalesProvider>
    </BrowserRouter>
  </StrictMode>
);
