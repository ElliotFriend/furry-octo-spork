import React, { useState } from 'react';
import './App.css';

import RequestTX from './components/RequestTX/RequestTX';
import ChallengeTX from './components/ChallengeTX/ChallengeTX';
import JWTDisplay from './components/JWTDisplay/JWTDisplay';
import JWTDetails from './components/JWTDetails/JWTDetails';
import Error from './Error'


function App() {
  let [error, setError] = useState('')
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
        { !error ? null : <Error message={error} /> }
        <RequestTX error={error} setError={setError}
                   pubkey={pubkey} setPubkey={setPubkey}
                   homeDomain={homeDomain} setHomeDomain={setHomeDomain}
                   otherHomeDomain={otherHomeDomain} setOtherHomeDomain={setOtherHomeDomain}
                   client={client} setClient={setClient}
                   setClientKey={setClientKey}
                   setToml={setToml}
                   setXDR={setXDR} />
        <ChallengeTX error={error} setError={setError}
                     pubkey={pubkey}
                     homeDomain={homeDomain}
                     otherHomeDomain={otherHomeDomain}
                     client={client}
                     clientKey={clientKey}
                     toml={toml}
                     xdr={xdr} setXDR={setXDR}
                     setJWT={setJWT} />
        <JWTDisplay error={error} setError={setError}
                    jwt={jwt} />
      </div>
    </div>
  );
}

export default App;
