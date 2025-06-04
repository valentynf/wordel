import Game from './components/Game/Game';
import StartScreen from './components/StartScreen/StartScreen';
import EndScreen from './components/EndScreen/EndScreen';
import { useGameContext } from './context/useGameContext';

function App() {
  const { state: gameData } = useGameContext();
  const { view } = gameData;

  return (
    <>
      {view === 'start' && <StartScreen />}
      {view === 'game' && <Game />}
      {view === 'end' && <EndScreen />}
    </>
  );
}

export default App;
