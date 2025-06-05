import { createContext, type Dispatch } from 'react';
import type { GameState, GameStateReducerAction } from '../types/appTypes';

const GameContext = createContext<
  { state: GameState; dispatch: Dispatch<GameStateReducerAction> } | undefined
>(undefined);

export default GameContext;
