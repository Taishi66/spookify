import React, { useEffect, useState } from 'react'
import './App.css'
import Login from '../src/components/pages/login/Login'
import { getTokenFromUrl } from './lib/spotify'

function App() {

  const [token, setToken] = useState(null);


  //run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    console.log("token =>>>> ", token);

    if (_token) {
      setToken(_token);
    }
  });


  return (
    //BEM
    <div className="app">
      {
        token ? (
          <h1>I'm logged in </h1>
          // <Player />
        ) : [
          <Login />
        ]
      }
      <Login />
    </div >
  );
}

export default App;
