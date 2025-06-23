import { useReducer, type ReactNode } from 'react';
import GameContext, { reducer } from './GameContext';
import { initialState } from '../config';

function GameContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
