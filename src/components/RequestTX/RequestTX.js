import React from 'react';
import './RequestTX.css';
import { StellarTomlResolver, TransactionBuilder, Keypair, Server } from 'stellar-sdk';
import Error from '../../Error'
import requestChallengeTx from '../../lib/requestChallengeTx'
import getClientDomainSigningKey from '../../lib/getClientDomainSigningKey'
import signChallengeTx from '../../lib/signChallengeTx'


const RequestTX = (props) => {
  // testnet account
  // GA6US5WSS3TDQ5R2X56PDKYFK6GOHZNFHXBOKRMUCPDAUY6NJ45BRXHK
  // SAZKDRHB7TOL6G3PRFCE3FHTTT6N6YQ3PBBOBBNNIMK4WWMLUFJKONLS
  //
  // testnet account for sep10-client.elliotfriend.com client_domain key
  // GDS74NMTJJPQWIU7RDZ3H3OCQ4U5754BSDQPIEXY6URDXWUV6KPKINH4
  // SBIY7LVQPTZAJGYYJDNOMMJ6WJYL3BRXXY67UE4UWKV46A56B3MBMRST
  const handlePubkeyChange = (e) => {
    props.setPubkey(e.target.value)
  }

  const handleHomeDomainChange = (e) => {
    props.setHomeDomain(e.target.value)
  }

  const handleOtherHomeDomainChange = (e) => {
    props.setOtherHomeDomain(e.target.value)
  }

  const handleClientChange = (e) => {
    props.setClient(e.target.value)
  }

  const getChallengeTx = async (e) => {
    e.preventDefault()
    props.setError('')

    try {
      if (props.client) {
        let clientKey = await getClientDomainSigningKey(props.client)
        await props.setClientKey(clientKey)
      }

      let stellarToml = await StellarTomlResolver.resolve(props.homeDomain)
      await props.setToml(stellarToml)

      let challengeTx = await requestChallengeTx({
        domain: props.homeDomain,
        pubkey: props.pubkey,
        home_domain: props.otherHomeDomain,
        client_domain: props.client
      })

      if (props.client === "sep10-client.elliotfriend.com") {
        // console.log(props.xdr)
        let keypair = Keypair.fromSecret("SBIY7LVQPTZAJGYYJDNOMMJ6WJYL3BRXXY67UE4UWKV46A56B3MBMRST")
        let signedTx = signChallengeTx(challengeTx, keypair, stellarToml.NETWORK_PASSPHRASE)
        props.setXDR(signedTx)
      } else {
        props.setXDR(challengeTx)
      }

      document.querySelector('#challenge-tab').click()
    } catch (error) {
      props.setError(error.toString())
    }
  }

  return (
    <div className="container tab-pane fade show active" id="request" role="tabpanel" aria-labelledby="request-tab">
      <div className="row">
        <div className="col-12 col-lg-4 order-last order-lg-first">
          <h3>Request Challenge Transaction</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="publicKey" className="form-label">Public Key</label>
              <input onChange={handlePubkeyChange} type="text" name="publicKey" className="text-center form-control" id="publicKey" placeholder={props.pubkey} />
            </div>
            <div className="mb-3">
              <label htmlFor="homeDomainURL" className="form-label">Home Domain URL</label>
              <input onChange={handleHomeDomainChange} type="url" name="homeDomainURL" className="text-center form-control" id="homeDomainURL" placeholder={props.homeDomain} />
            </div>
            <div className="mb-3">
              <label htmlFor="otherHomeDomainURL" className="form-label">Custom <code>home_domain</code> (Optional)</label>
              <input onChange={handleOtherHomeDomainChange} type="url" name="otherHomeDomainURL" className="text-center form-control" id="otherHomeDomainURL" placeholder={props.otherHomeDomain} />
              <div className="form-text">Unless you know what you're doing (and why), you probably want to leave this empty.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="clientDomain" className="form-label">Client Domain (Optional)</label>
              <input onChange={handleClientChange} type="url" name="clientDomain" className="text-center form-control" id="clientDomain" />
            </div>
            <button onClick={getChallengeTx} className="btn btn-primary">Request Challenge Transaction</button>
          </form>
        </div>
        <div className="col-12 col-lg-8 order-first order-lg-last mb-4">
          <h1>Welcome!</h1>
          <p className="lead">Your journey to JWT enlightenment begins now</p>
          <p>The first thing you'll need to do is request a "challenge transaction" from a SEP-0010 endpoint. Often these are asset anchors. If you don't know which one to use, I suggest you start with the <abbr title="Stellar Development Foundation" className="initialism">SDF</abbr> testanchor.</p>
          <p>This challenge transaction will be generated for a specific stellar account. In the next step, you'll need to sign this transaction, so enter a public key to an account you can sign for. You will be asked to sign with your secret key in the next step.</p>
          <p className="small"><em>Note: This account does not need to be funded on the blockchain in order for a valid JWT to be issued.</em></p>
          <p className="small"><em>Another Note: If you would like to test this client with a <code>client_domain</code> field, you are welcome to use <code>sep10-client.elliotfriend.com</code> on the testnet.</em></p>
        </div>
      </div>
    </div>
  )
};

export default RequestTX
