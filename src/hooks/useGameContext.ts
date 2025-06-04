import { useContext } from 'react';

import GameContext from '../context/GameContext';

// const GameContext = createContext<
//   { state: GameState; dispatch: Dispatch<GameStateReducerAction> } | undefined
// >(undefined);

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context)
    throw new Error('useGameContext must be used inside GameProvider');
  return context;
}
