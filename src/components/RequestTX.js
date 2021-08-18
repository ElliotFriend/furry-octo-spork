import React from 'react';
import './RequestTX.css';
import { StellarTomlResolver } from 'stellar-sdk';

export default function RequestTX(props) {
  // testnet account
  // GA6US5WSS3TDQ5R2X56PDKYFK6GOHZNFHXBOKRMUCPDAUY6NJ45BRXHK
  // SAZKDRHB7TOL6G3PRFCE3FHTTT6N6YQ3PBBOBBNNIMK4WWMLUFJKONLS
  const requestTransaction = async (endpoint) => {
    // e.preventDefault()
    let res = await fetch(`${endpoint}?account=${props.pubkey}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let json = await res.json()
    let transaction = json.transaction
    // console.log(transaction)
    props.setXDR(transaction)
  }

  const parseTomlFile = async (e) => {
    e.preventDefault()
    let stellarToml = await StellarTomlResolver.resolve(props.anchor)
    // console.log(stellarToml)
    await props.setAuthEndpoint(stellarToml.WEB_AUTH_ENDPOINT)
    await props.setServerKey(stellarToml.SIGNING_KEY)
    await props.setNetworkPassphrase(stellarToml.NETWORK_PASSPHRASE)
    requestTransaction(stellarToml.WEB_AUTH_ENDPOINT)
  }

  const handleChange = (e) => {
    props.setAnchor(e.target.value)
  }

  return (
    <div className="col order-1">
      <h3>Request Challenge Transaction</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="publicKey" className="form-label">Public Key</label>
          <input type="text" name="publicKey" className="form-control" id="publicKey" placeholder={props.pubkey} />
        </div>
        <div className="mb-3">
          <label htmlFor="anchorURL" className="form-label">Anchor URL</label>
          <input onChange={handleChange} type="url" name="anchorURL" className="form-control" id="anchorURL" placeholder={props.anchor} />
        </div>
        <button onClick={parseTomlFile} className="btn btn-primary">Request Transaction</button>
      </form>
    </div>
  )
};
