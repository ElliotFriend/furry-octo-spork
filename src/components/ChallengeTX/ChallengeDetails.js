import React, { useState, useEffect } from 'react'
import { Utils } from 'stellar-sdk';
import './ChallengeTX.css'
import SequenceNumber from '../TXDetails/SequenceNumber'
import SignedByServer from '../TXDetails/SignedByServer'
import FirstOperation from '../TXDetails/FirstOperation'
import WebAuthDomainOperation from '../TXDetails/WebAuthDomainOperation'
import OtherOperations from '../TXDetails/OtherOperations'
import ClientDomainOperation from '../TXDetails/ClientDomainOperation'

export default function ChallengeDetails(props) {
  let xdr = props.xdr
  let toml = props.toml
  let [seqNumber, setSeqNumber] = useState();
  let [signedBy, setSignedBy] = useState();
  let [operations, setOperations] = useState([]);

  useEffect(() => {
    if (xdr && toml) {
      let challengeTransaction = Utils.readChallengeTx(xdr, toml.SIGNING_KEY, toml.NETWORK_PASSPHRASE, props.anchor, props.anchor);
      setSeqNumber(challengeTransaction.tx._sequence)
      if (Utils.verifyTxSignedBy(challengeTransaction.tx, toml.SIGNING_KEY)) {
        setSignedBy(Utils.gatherTxSigners(challengeTransaction.tx, [toml.SIGNING_KEY]))
      }
      setOperations(challengeTransaction.tx._operations)
    }
  }, [xdr])

  let wadOperation = operations.find(item => item.name === 'web_auth_domain')
  let otherOperations = operations.find(item => item.name !== 'web_auth_domain' && item.name !== `${props.anchor} auth`)
  let cdOperation = operations.find(item => item.name === 'client_domain')

  return (
    <div className="col-8">
      <h3>Challenge Transaction Details</h3>
      <p>Here are the details of the transaction, as well as what the client is intended to be checking to make sure the transaction has been properly created.</p>
      { seqNumber ? <SequenceNumber seqNumber={seqNumber} /> : null }
      { signedBy ? <SignedByServer signedBy={signedBy} serverKey={toml.SIGNING_KEY} /> : null }
      { operations.length > 0 ? <FirstOperation operation={operations[0]} pubkey={props.pubkey} anchor={props.anchor} /> : null }
      { wadOperation ? <WebAuthDomainOperation operation={wadOperation} serverKey={toml.SIGNING_KEY} anchor={props.anchor} /> : null }
      { otherOperations ? <OtherOperations operations={otherOperations} /> : null }
      { cdOperation ? <ClientDomainOperation operation={cdOperation} /> : null }
      <div className="row">
        <p className="text-start">1. The Client verifies that the transaction has an invalid sequence number 0</p>
      </div>
      <div className="row">
        <p className="text-start">2. The Client verifies that the transaction is signed by the Server Account obtained through discovery flow.</p>
      </div>
      <div className="row">
        <p className="text-start">3. The Client verifies that the transaction's first operation is a Manage Data operation that has its:</p>
        <ol>
          <li>Source account set to the Client Account</li>
          <li>Key set to <code>&lt;home domain&gt; auth</code> where the home domain is the Home Domain.</li>
          <li>Value set to a nonce value.</li>
        </ol>
      </div>
      <div className="row">
        <p className="text-start">4. The Client verifies that if the transaction has a Manage Data operation with key <code>web_auth_domain</code> that it has:</p>
        <ol>
          <li>Source account set to the Server Account</li>
          <li>Value set to the Server's domain that the client requested the challenge from.</li>
        </ol>
      </div>
      <div className="row">
        <p className="text-start">5. The Client verifies that if the transaction has other operations they are Manage Data operations and that their source account is set to:</p>
        <ol>
          <li>The Client Domain Account if the Manage Data operation key is set to <code>client_domain</code></li>
          <li>Otherwise, the Server Account.</li>
        </ol>
      </div>
      <div className="row">
        <p className="text-start">6. If the client included a client domain in the request, and the transaction has a Manage Data operation with key <code>client_domain</code>, the Client obtains a signature from the Client Domain Account and adds it to the challenge transaction</p>
      </div>
    </div>
  )
}
