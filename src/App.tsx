import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import localforage from 'localforage';


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

const App = () => {

  //State Hooks...

  const [results, setGameResults] = useState<GameResult[]>([]);

  const [setupInfo, setSetupInfo] = useState<SetupInfo>({
    start: ""
    , chosenPlayers: []
    , scoreToWin: 15
  });

  const [emailKeyInput, setEmailKeyInput] = useState('');
  const [emailKeySaved, setEmailKeySaved] = useState('');

  //useEffect Hook...

  useEffect(
    () => {
      const loadEmailKey = async () => {
        try {

          const ek = String(await localforage.getItem("emailKey")) ?? "";
          setEmailKeyInput(ek);
          setEmailKeySaved(ek);
        }
        catch (err) {
          console.error(err);
        }
      };

      loadEmailKey();
    }
    , []
  );

  //Helper Functions...
  
  const addGameResult = (r: GameResult) => {
    setGameResults([
      ...results
      , r
    ]);
  };

  const saveEmailKey = async () => {
    try {
      await localforage.setItem(
        "emailKey"
        , emailKeyInput
      );

      setEmailKeySaved(emailKeyInput);
    }
    catch (err) {
      console.error(err);
    }
  }

  // JSX...

  return (
    <div className="App m-3">
      <h1>
        TCA Splendor
      </h1>
      <h2>
        Companion App
      </h2>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control 
            type="text" 
            placeholder="Enter your email to save..."
            value={emailKeyInput}
            onChange={(e) => setEmailKeyInput(e.target.value)}
        />
        <Button
            onClick={saveEmailKey}
        >
            Save
        </Button>
      </Form.Group>

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
