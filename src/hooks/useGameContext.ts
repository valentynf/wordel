import { useContext } from 'react';

import GameContext from '../context/GameContext';

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context)
    throw new Error('useGameContext must be used inside GameProvider');
  return context;
}
