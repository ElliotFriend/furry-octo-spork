import React from 'react';
import './RequestTX.css';
import { StellarTomlResolver } from 'stellar-sdk';

export default function RequestTX(props) {
  // testnet account
  // GA6US5WSS3TDQ5R2X56PDKYFK6GOHZNFHXBOKRMUCPDAUY6NJ45BRXHK
  // SAZKDRHB7TOL6G3PRFCE3FHTTT6N6YQ3PBBOBBNNIMK4WWMLUFJKONLS

  const handlePubkeyChange = (e) => {
    props.setPubkey(e.target.value)
  }

  const handleAnchorChange = (e) => {
    props.setAnchor(e.target.value)
  }

  const requestTransaction = async (endpoint) => {
    let res = await fetch(`${endpoint}?account=${props.pubkey}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let json = await res.json()
    let transaction = json.transaction
    props.setXDR(transaction)
  }

  const parseTomlFile = async (e) => {
    e.preventDefault()
    let stellarToml = await StellarTomlResolver.resolve(props.anchor)
    await props.setToml(stellarToml)
    await requestTransaction(stellarToml.WEB_AUTH_ENDPOINT)
    document.querySelector('#challenge-tab').click()
  }

  return (
    <div className="container tab-pane fade show active" id="request" role="tabpanel" aria-labelledby="request-tab">
      <div className="row">
        <div className="col">
          <h1>Welcome!</h1>
          <p className="lead">Your journey to JWT enlightenment begins now</p>
          <p>The first thing you'll need to do is request a "challenge transaction" from a SEP-0010 endpoint. Often these are asset anchors. If you don't know which one to use, I suggest you start with the <abbr title="Stellar Development Foundation" className="initialism">SDF</abbr> testanchor.</p>
          <p>This challenge transaction will be generated for a specific stellar account. In the next step, you'll need to sign this transaction, so enter a public key to an account you can sign for. You will be asked to sign with your secret key in the next step.</p>
          <p className="small"><em>Note: This account does not need to be funded on the blockchain in order for a valid JWT to be issued.</em></p>
        </div>
        <div className="col">
          <h3>Request Challenge Transaction</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="publicKey" className="form-label">Public Key</label>
              <input onChange={handlePubkeyChange} type="text" name="publicKey" className="text-center form-control" id="publicKey" placeholder={props.pubkey} />
            </div>
            <div className="mb-3">
              <label htmlFor="anchorURL" className="form-label">Anchor URL</label>
              <input onChange={handleAnchorChange} type="url" name="anchorURL" className="text-center form-control" id="anchorURL" placeholder={props.anchor} />
            </div>
            <button onClick={parseTomlFile} className="btn btn-primary">Request Challenge Transaction</button>
          </form>
        </div>
      </div>
    </div>
  )
};
