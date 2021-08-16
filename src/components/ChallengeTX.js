import React, { useEffect } from 'react';
import './ChallengeTX.css';
import { Utils, Networks, TransactionBuilder } from 'stellar-sdk';

export default function ChallengeTX(props) {
  let readChallengeTx = Utils.readChallengeTx
  let xdr = props.xdr
  let serverKey = "GCUZ6YLL5RQBTYLTTQLPCM73C5XAIUGK2TIMWQH7HPSGWVS2KJ2F3CHS"

  useEffect(() => {
    if (props.xdr) {
      let challengeTransaction = Utils.readChallengeTx(xdr, serverKey, Networks.TESTNET, "testanchor.stellar.org", "testanchor.stellar.org");
      props.setTxDetails({
        seqNumber: challengeTransaction.tx._sequence
      })
    }
  }, [props.xdr])

  return (
    <div className="col order-3">
      <h3>Challenge Transaction XDR</h3>
      <p><code className="bg-light">
        {props.xdr}
      </code></p>
      <p><code className="light">
        Something
      </code></p>
      <button className="btn btn-primary">Sign Transaction</button>
      <h3>Challenge Transaction Details</h3>
      <div className="row">
        <p>1. The Client verifies that the transaction has an invalid sequence number 0</p>
        <div className="col">
          <pre className="bg-light">{props.txDetails.seqNumber}</pre>
        </div>
        <div className="col">
          Sequence Number
        </div>
      </div>
      <div className="row">
        <p>2. The Client verifies that the transaction is signed by the Server Account obtained through discovery flow.</p>
        <div className="col">
          <pre className="bg-light">SOMERANDOMPUBKEY?</pre>
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
          <pre className="bg-light">manage_data(something: something)?</pre>
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
          <pre className="bg-light">manage_data(web_auth_domain: something)?</pre>
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
          <pre className="bg-light">manage_data(something: client_domain|server account)</pre>
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
