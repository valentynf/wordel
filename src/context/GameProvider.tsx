import { useReducer, type ReactNode } from 'react';
import { reducer, initialState } from '../state/gameReducer';
import GameContext from './GameContext';

function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
