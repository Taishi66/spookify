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
    let _token = hash.access_token;
    console.log("token =>>>> ", token);

    if (_token) {
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getPlaylist("37i9dQZEVXcCeFtBHuvCVW?gtm").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });
    }
  }, [token, dispatch]);
  console.log("USER>>>", user);


  return (
    <div className="app">
      {!token && <Login />}
      {token && <Player spotify={spotify} />}
    </div>
  );
}
export default App;
