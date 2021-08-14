import React, { useState } from 'react';
import './App.css';
import RequestTX from './components/RequestTX';
import ChallengeTX from './components/ChallengeTX';
import JWTDisplay from './components/JWTDisplay';
import JWTDetails from './components/JWTDetails';

function App() {
  let [pubkey, setPubkey] = useState('GA6US5WSS3TDQ5R2X56PDKYFK6GOHZNFHXBOKRMUCPDAUY6NJ45BRXHK')
  let [anchor, setAnchor] = useState('https://testanchor.stellar.org/auth')
  let [xdr, setXDR] = useState('')

  return (
    <div className="App container p-4">
      <div className="row row-cols-2">
        <RequestTX pubkey={pubkey} setPubkey={setPubkey}
                   anchor={anchor} setAnchor={setAnchor}
                   setXDR={setXDR} />
        <ChallengeTX xdr={xdr} />
        <JWTDisplay />
        <JWTDetails />
      </div>
    </div>
  );
}

export default App;
