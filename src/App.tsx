import Game from './components/Game/Game';
import StartScreen from './components/StartScreen/StartScreen';
import EndScreen from './components/EndScreen/EndScreen';
import { useGameContext } from './hooks/useGameContext';
import { useEffect } from 'react';
import { LOCAL_STORAGE_KEY } from './config';

function App() {
  const { state: gameData } = useGameContext();
  const { view } = gameData;

  useEffect(() => {
    const isEmpty = gameData.rows.every((row) => row.letters.length === 0);
    if (!isEmpty && view === 'game') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameData));
    }
  }, [gameData, view]);

  return (
    <>
      {view === 'start' && <StartScreen />}
      {view === 'game' && <Game />}
      {view === 'end' && <EndScreen />}
    </>
  );
}

export default App;
