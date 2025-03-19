import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import App from './App.tsx';
import theme from './theme.ts';
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>,
)
