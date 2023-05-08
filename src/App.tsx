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
  , SetupInfo
  , calculateLeaderboard
  , getPreviousPlayers
  , getShortestGameDuration
  , getLongestGameDuration
  , getAverageGameDurationByPlayerCount
  , getMostCardsEver
 } from './front-end-model'


const hardcodedGameResults: GameResult[] = [
  {
      winner: "Tom"
      , players: ["Tom", "Taylor"]
      , start: "2023-04-22T11:38:23.442Z"
      , end: "2023-04-22T11:40:23.442Z"
      , mostCardsOwned: 12
  }
  , {
      winner: "Taylor"
      , players: ["Jack", "Taylor"]
      , start: "2023-04-22T11:38:23.442Z"
      , end: "2023-04-22T11:40:23.442Z"
      , mostCardsOwned: 11
  }
  , {
      winner: "Taylor"
      , players: ["Tom", "Taylor", "Jack"]
      , start: "2023-04-22T11:38:23.442Z"
      , end: "2023-04-22T11:40:23.442Z"
      , mostCardsOwned: 16
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
      , start: "2023-04-22T11:38:23.442Z"
      , end: "2023-04-22T11:40:23.442Z"
      , mostCardsOwned: 12
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
      , start: "2023-04-22T11:38:23.442Z"
      , end: "2023-04-22T11:40:23.442Z"
      , mostCardsOwned: 9
  }
  , {
      winner: "Joe"
      , players: ["X", "Joe"]
      , start: "2023-04-22T11:38:23.442Z"
      , end: "2023-04-22T11:40:23.442Z"
      , mostCardsOwned: 10
  }
  , {
      winner: "Jack"
      , players: ["X", "Joe", "Jack"]
      , start: "2023-04-22T11:38:23.442Z"
      , end: "2023-04-22T11:48:23.442Z"
      , mostCardsOwned: 15
  }
];


const App = () => {

  const [results, setGameResults] = useState(hardcodedGameResults);

  const [setupInfo, setSetupInfo] = useState<SetupInfo>({
    start: ""
    , chosenPlayers: []
    , scoreToWin: 15
  });

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
                shortestGameDuration={getShortestGameDuration(results)}
                longestGameDuration={getLongestGameDuration(results)}
                averageGameDurationData={getAverageGameDurationByPlayerCount(results)}
                mostCardsEver={getMostCardsEver(results)}
              />
            } 
          />
          <Route 
            path='/setup'
            element={
            <Setup
              previousPlayers={getPreviousPlayers(results)}
              setSetupInfo={setSetupInfo}
            />} 
          />
          <Route
            path='/play'
            element={
              <Play 
                addGameResultFunc={addGameResult}
                setupInfo={setupInfo}
              />
            } 
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
