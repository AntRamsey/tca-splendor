import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';

import {
  HashRouter
  , Routes
  , Route
} from 'react-router-dom'

import { 
  GameResult
  , calculateLeaderboard
 } from './front-end-model'


const hardcodedGameResults: GameResult[] = [
  {
      winner: "Tom"
      , players: ["Tom", "Taylor"]
  }
  , {
      winner: "Taylor"
      , players: ["Jack", "Taylor"]
  }
  , {
      winner: "Taylor"
      , players: ["Tom", "Taylor", "Jack"]
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
  }
  , {
      winner: "Joe"
      , players: ["X", "Joe"]
  }
  , {
      winner: "Jack"
      , players: ["X", "Joe", "Jack"]
  }
];


const App = () => {

  const [results, setGameResults] = useState(hardcodedGameResults);

  const addGameResult = (r: GameResult) => {
    setGameResults([
      ...results
      , r
    ]);
  };

  return (
    <div className="App m-3">
      <h1>
        TCA Splendor
      </h1>
      <h2>
        Companion App
      </h2>
      <hr />
      <HashRouter>
        <Routes>
          <Route 
            path='/' 
            element={
              <Home 
                leaderboardData={calculateLeaderboard(results)}
              />
            } 
          />
          <Route path='/setup' element={<Setup />} />
          <Route
            path='/play'
            element={
              <Play 
                addGameResultFunc={addGameResult}
              />
            } 
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
