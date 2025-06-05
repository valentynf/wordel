import { useReducer, type ReactNode } from 'react';
import GameContext, { initialState, reducer } from './GameContext';

function GameContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
