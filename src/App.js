import React, { useState } from 'react';
import './App.css';

import RequestTX from './components/RequestTX/RequestTX';
import ChallengeTX from './components/ChallengeTX/ChallengeTX';
import JWTDisplay from './components/JWTDisplay/JWTDisplay';
import JWTDetails from './components/JWTDetails/JWTDetails';


function App() {
  let [pubkey, setPubkey] = useState('GA6US5WSS3TDQ5R2X56PDKYFK6GOHZNFHXBOKRMUCPDAUY6NJ45BRXHK')
  let [homeDomain, setHomeDomain] = useState('testanchor.stellar.org')
  let [otherHomeDomain, setOtherHomeDomain] = useState('')
  let [client, setClient] = useState('')
  let [clientKey, setClientKey] = useState('')
  let [toml, setToml] = useState()
  let [xdr, setXDR] = useState('')
  let [jwt, setJWT] = useState('')

  return (
    <div className="App flex-shrink-0">
      <div className="py-5 container tab-content" id="myTabContent">
        <RequestTX pubkey={pubkey} setPubkey={setPubkey}
                   homeDomain={homeDomain} setHomeDomain={setHomeDomain}
                   otherHomeDomain={otherHomeDomain} setOtherHomeDomain={setOtherHomeDomain}
                   client={client} setClient={setClient}
                   setClientKey={setClientKey}
                   setToml={setToml}
                   setXDR={setXDR} />
        <ChallengeTX pubkey={pubkey}
                     homeDomain={homeDomain}
                     otherHomeDomain={otherHomeDomain}
                     client={client}
                     clientKey={clientKey}
                     toml={toml}
                     xdr={xdr}
                     setJWT={setJWT} />
        <JWTDisplay jwt={jwt} />
      </div>
    </div>
  );
}

export default App;
