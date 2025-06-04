// import { useState } from 'react';
import { useState } from 'react';
import Game from './components/Game/Game';
import StartScreen from './components/StartScreen/StartScreen';
import EndScreen from './components/EndScreen/EndScreen';

type View = 'start' | 'game' | 'end';

function App() {
  const [view, setView] = useState<View>('start');

  return (
    <>
      {view === 'start' && <StartScreen onStart={() => setView('game')} />}
      {view === 'game' && <Game />}
      {view === 'end' && <EndScreen />}
    </>
  );
}

export default App;
