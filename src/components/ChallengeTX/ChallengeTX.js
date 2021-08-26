import React, { useState, useEffect } from 'react';
import './ChallengeTX.css';
import { TransactionBuilder, Keypair } from 'stellar-sdk';
import ChallengeDetails from './ChallengeDetails'
import ChallengeDescription from './ChallengeDescription'

export default function ChallengeTX(props) {
  // testnet account
  // GA6US5WSS3TDQ5R2X56PDKYFK6GOHZNFHXBOKRMUCPDAUY6NJ45BRXHK
  // SAZKDRHB7TOL6G3PRFCE3FHTTT6N6YQ3PBBOBBNNIMK4WWMLUFJKONLS
  let xdr = props.xdr
  let toml = props.toml
  let [secretKey, setSecretKey] = useState('SAZKDRHB7TOL6G3PRFCE3FHTTT6N6YQ3PBBOBBNNIMK4WWMLUFJKONLS');

  const handleChange = (e) => {
    setSecretKey(e.target.value)
  }

  const signTransaction = async () => {
    if (xdr && secretKey) {
      let kp = Keypair.fromSecret(secretKey)
      let transaction = TransactionBuilder.fromXDR(xdr, toml.NETWORK_PASSPHRASE)
      transaction.sign(kp)
      let jwt = await submitTransaction(transaction.toXDR())
      await props.setJWT(jwt)
      document.querySelector("#jwt-tab").click()
    }
  }

  const submitTransaction = async (transactionXDR) => {
    let res = await fetch(`${toml.WEB_AUTH_ENDPOINT}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "transaction": transactionXDR
      })
    })
    let json = await res.json()
    return json.token
  }

  return (
    <div className="container tab-pane fade" id="challenge" role="tabpanel" aria-labelledby="challenge-tab">
      <div className="row">
        <div className="col-12 col-lg-4 mb-4">
          <h1>Way to go!</h1>
          <p>Now, let's take a look at what we got from the server. You can see the XDR formatted challenge transaction, and the details of that transaction here. When you're comfortable that everything appears to be in order, enter your Stellar secret key below to send the signed transaction to the server, so you can receive your JWT.</p>
          <h3>Challenge Transaction XDR</h3>
          {
            props.client === ""
            ? null
            : props.client === "sep10-client.elliotfriend.com"
            ? <p><small><em>Note: You have used <code>sep10-client.elliotfriend.com</code> as your <code>client_domain</code>. The XDR below has already been signed by the necessary signing key.</em></small></p>
            : <p><small><em>Note: You have used a <code>client_domain</code>, and you must get the required signature yourself and copy/paste the resulting XDR below.</em></small></p>
          }
          <pre className="px-3 user-select-all text-break text-wrap mb-3">
            {xdr}
          </pre>
          <div className="mb-3">
            <label htmlFor="secretKey" className="form-label">Secret Key</label>
            <input onChange={handleChange} type="password" className="text-center form-control" id="secretKey" name="secretKey" />
          </div>
          <button onClick={signTransaction} className="btn btn-primary">Authenticate with Server</button>
        </div>
        <div className="col-12 col-lg-8">
          { props.xdr
              ? <ChallengeDetails pubkey={props.pubkey}
                                  anchor={props.anchor}
                                  client={props.client}
                                  clientKey={props.clientKey}
                                  xdr={props.xdr}
                                  toml={props.toml} />
              : null
          }
          <ChallengeDescription />
        </div>
      </div>
    </div>
  )
}
