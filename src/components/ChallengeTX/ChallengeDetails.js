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
    <div>
      <h3>Challenge Transaction Details</h3>
      <p>Here are the details of the transaction, as well as what the client is intended to be checking to make sure the transaction has been properly created.</p>
      { seqNumber ? <SequenceNumber seqNumber={seqNumber} /> : null }
      { signedBy ? <SignedByServer signedBy={signedBy} serverKey={toml.SIGNING_KEY} /> : null }
      { operations.length > 0 ? <FirstOperation operation={operations[0]} pubkey={props.pubkey} anchor={props.anchor} /> : null }
      { wadOperation ? <WebAuthDomainOperation operation={wadOperation} serverKey={toml.SIGNING_KEY} anchor={props.anchor} /> : null }
      { otherOperations ? <OtherOperations operations={otherOperations} /> : null }
      { cdOperation ? <ClientDomainOperation operation={cdOperation} /> : null }
    </div>
  )
}
