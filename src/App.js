import React, { useEffect } from 'react'
import './App.css'
import Login from '../src/components/pages/login/Login'
import Player from '../src/components/pages/player/Player'
import { getTokenFromUrl } from './lib/spotify'
import SpotifyWebApi from 'spotify-web-api-js'
import { useDataLayerValue } from "./DataLayer"

const spotify = new SpotifyWebApi();

function App() {

  const [{ user, token }, dispatch] = useDataLayerValue();

  //run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    console.log("token =>>>> ", token);

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user
        });
      })
    }
    console.log("TOKEN>>>>", token);
  }, [dispatch, token]);
  console.log("USER>>>", user);


  return (
    //BEM
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div >
  );
}

export default App;
