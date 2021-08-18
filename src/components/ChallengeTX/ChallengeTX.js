import React, { useState, useEffect } from 'react';
import './ChallengeTX.css';
import { Utils, TransactionBuilder, Keypair } from 'stellar-sdk';

export default function ChallengeTX(props) {
  // testnet account
  // GA6US5WSS3TDQ5R2X56PDKYFK6GOHZNFHXBOKRMUCPDAUY6NJ45BRXHK
  // SAZKDRHB7TOL6G3PRFCE3FHTTT6N6YQ3PBBOBBNNIMK4WWMLUFJKONLS
  let xdr = props.xdr
  let [seqNumber, setSeqNumber] = useState();
  let [signedBy, setSignedBy] = useState();
  let [operations, setOperations] = useState();
  let [secretKey, setSecretKey] = useState('SAZKDRHB7TOL6G3PRFCE3FHTTT6N6YQ3PBBOBBNNIMK4WWMLUFJKONLS');
  // let [webAuthDomainOp, setWadOp] = useState();

  useEffect(() => {
    if (props.xdr) {
      let challengeTransaction = Utils.readChallengeTx(xdr, props.serverKey, props.networkPassphrase, props.anchor, props.anchor);
      // console.log(challengeTransaction);
      setSeqNumber(challengeTransaction.tx._sequence)
      if (Utils.verifyTxSignedBy(challengeTransaction.tx, props.serverKey)) {
        setSignedBy(Utils.gatherTxSigners(challengeTransaction.tx, [props.serverKey]))
        // console.log(new Buffer.from(challengeTransaction.tx._signatures[0]._attributes.signature).toString('base64'))
        // console.log(Utils.gatherTxSigners(challengeTransaction.tx, [serverKey]))
      }
      setOperations(challengeTransaction.tx._operations)
    }
  }, [props.xdr])

  const handleChange = (e) => {
    setSecretKey(e.target.value)
  }

  const signTransaction = async () => {
    if (props.xdr && secretKey) {
      let kp = Keypair.fromSecret(secretKey)
      let transaction = TransactionBuilder.fromXDR(props.xdr, props.networkPassphrase)
      transaction.sign(kp)
      let jwt = await submitTransaction(transaction.toXDR())
      props.setJWT(jwt)
    }
  }

  const submitTransaction = async (transactionXDR) => {
    let res = await fetch(`${props.authEndpoint}`, {
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
    <div>
      <h3>Challenge Transaction XDR</h3>
      <pre className="user-select-all text-break text-wrap">
        {props.xdr}
      </pre>
      <div className="mb-3">
        <label htmlFor="secretKey" className="form-label">Secret Key</label>
        <input onChange={handleChange} type="password" className="form-control" id="secretKey" name="secretKey" />
      </div>
      <button onClick={signTransaction} className="btn btn-primary">Sign Transaction</button>
      <h3>Challenge Transaction Details</h3>
      <div className="row">
        <p>1. The Client verifies that the transaction has an invalid sequence number 0</p>
        <div className="col">
          <pre className="bg-light">{seqNumber}</pre>
        </div>
        <div className="col">
          Sequence Number
        </div>
      </div>
      <div className="row">
        <p>2. The Client verifies that the transaction is signed by the Server Account obtained through discovery flow.</p>
        <div className="col">
          <pre className="bg-light">{signedBy}</pre>
        </div>
        <div className="col">
          Signed by
        </div>
      </div>
      <div className="row">
        <p>
          3. The Client verifies that the transaction's first operation is a Manage Data operation that has its:
          <ol>
            <li>Source account set to the Client Account</li>
            <li>Key set to <code>&lt;home domain&gt; auth</code> where the home domain is the Home Domain.</li>
            <li>Value set to a nonce value.</li>
          </ol>
        </p>
        <div className="col">
          <pre className="bg-light">{operations ? `${operations[0].type}\n${operations[0].source}\n${operations[0].name}\n${operations[0].value}` : null}</pre>
        </div>
        <div className="col">
          First Operation
        </div>
      </div>
      <div className="row">
        <p>
          4. The Client verifies that if the transaction has a Manage Data operation with key <code>web_auth_domain</code> that it has:
          <ol>
            <li>Source account set to the Server Account</li>
            <li>Value set to the Server's domain that the client requested the challenge from.</li>
          </ol>
        </p>
        <div className="col">
          <pre className="bg-light">{!operations ? null : operations[1] ? `${operations[1].type}\n${operations[1].source}\n${operations[1].name}\n${operations[1].value}` : null}</pre>
        </div>
        <div className="col">
          web_auth_domain Operation
        </div>
      </div>
      <div className="row">
        <p>
          5. The Client verifies that if the transaction has other operations they are Manage Data operations and that their source account is set to:
          <ol>
            <li>The Client Domain Account if the Manage Data operation key is set to <code>client_domain</code></li>
            <li>Otherwise, the Server Account.</li>
          </ol>
        </p>
        <div className="col">
          <pre className="bg-light">{!operations ? null : operations.length >= 3 ? "Something here" : null}</pre>
        </div>
        <div className="col">
          Other Operations
        </div>
      </div>
      <div className="row">
        <p>6. If the client included a client domain in the request, and the transaction has a Manage Data operation with key <code>client_domain</code>, the Client obtains a signature from the Client Domain Account and adds it to the challenge transaction</p>
        <div className="col">
          <pre className="bg-light">manage_data(client_domain, sig from client_domain account)</pre>
        </div>
        <div className="col">
          client_domain signature
        </div>
      </div>
    </div>
  )
}
