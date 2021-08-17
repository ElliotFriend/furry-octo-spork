import React, { useState } from 'react';
import './App.css';
import RequestTX from './components/RequestTX';
import ChallengeTX from './components/ChallengeTX';
import JWTDisplay from './components/JWTDisplay';
import JWTDetails from './components/JWTDetails';

function App() {
  let [pubkey, setPubkey] = useState('GA6US5WSS3TDQ5R2X56PDKYFK6GOHZNFHXBOKRMUCPDAUY6NJ45BRXHK')
  let [anchor, setAnchor] = useState('testanchor.stellar.org')
  let [authEndpoint, setAuthEndpoint] = useState('')
  let [serverKey, setServerKey] = useState()
  let [networkPassphrase, setNetworkPassphrase] = useState('');
  let [xdr, setXDR] = useState('')

  return (
    <div className="App container p-4">
      <div className="row row-cols-2">
        <RequestTX pubkey={pubkey} setPubkey={setPubkey}
                   anchor={anchor} setAnchor={setAnchor}
                   setAuthEndpoint={setAuthEndpoint}
                   setServerKey={setServerKey}
                   setNetworkPassphrase={setNetworkPassphrase}
                   setXDR={setXDR} />
        <ChallengeTX xdr={xdr}
                     networkPassphrase={networkPassphrase}
                     anchor={anchor}
                     serverKey={serverKey} />
        <JWTDisplay />
        <JWTDetails />
      </div>
    </div>
  );
}

export default App;
