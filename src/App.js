import React, { useState } from 'react';
import './App.css';

import RequestTX from './components/RequestTX/RequestTX';
import ChallengeTX from './components/ChallengeTX/ChallengeTX';
import JWTDisplay from './components/JWTDisplay/JWTDisplay';
import JWTDetails from './components/JWTDetails/JWTDetails';


function App() {
  let [pubkey, setPubkey] = useState('GA6US5WSS3TDQ5R2X56PDKYFK6GOHZNFHXBOKRMUCPDAUY6NJ45BRXHK')
  let [anchor, setAnchor] = useState('testanchor.stellar.org')
  let [toml, setToml] = useState()
  let [xdr, setXDR] = useState('')
  let [jwt, setJWT] = useState('')

  return (
    <div className="App">
      <div className="py-5 mb-5 container tab-content" id="myTabContent">
        <RequestTX pubkey={pubkey} setPubkey={setPubkey}
                   anchor={anchor} setAnchor={setAnchor}
                   setToml={setToml}
                   setXDR={setXDR} />
        <ChallengeTX anchor={anchor}
                     toml={toml}
                     xdr={xdr}
                     setJWT={setJWT} />
        <JWTDisplay jwt={jwt} />
      </div>
    </div>
  );
}

export default App;
