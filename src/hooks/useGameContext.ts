import { useContext } from 'react';
import { GameContext } from '../context/GameContextProvider';

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context)
    throw new Error('useGameContext must be used inside GameContextProvider');
  return context;
}
