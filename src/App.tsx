// import { useState } from 'react';
import { useState } from 'react';
import Game from './components/Game/Game';
import StartScreen from './components/StartScreen/StartScreen';
import EndScreen from './components/EndScreen/EndScreen';
import type { View } from './types/appTypes';
// import useGameState from './hooks/useGameState';

function App() {
  const [view, setView] = useState<View>('start');
  // const [view] = useGameState();

  return (
    <>
      {view === 'start' && <StartScreen onStart={() => setView('game')} />}
      {view === 'game' && <Game />}
      {view === 'end' && <EndScreen />}
    </>
  );
}

export default App;
