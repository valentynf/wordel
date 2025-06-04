import { createContext } from 'react';
import type { GameState, GameStateReducerAction } from '../types/appTypes';
import type { Dispatch } from 'react';

const GameContext = createContext<
  { state: GameState; dispatch: Dispatch<GameStateReducerAction> } | undefined
>(undefined);

export default GameContext;
