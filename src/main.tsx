// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import GameContextProvider from './context/GameContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <GameContextProvider>
    <App />
  </GameContextProvider>
  // </StrictMode>
);
