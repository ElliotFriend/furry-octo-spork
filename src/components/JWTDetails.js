import React, { useState, useEffect } from 'react';
import './JWTDetails.css';
// import { jwtVerify } from 'jose/jwt/verify'
// const { jwtVerify } = require('jose/jwt/verify')
//
export default function JWTDetails(props) {
  let [jwtDetails, setJwtDetails] = useState({
    header: {},
    payload: {},
    signature: {}
  });
  // let jwt = props.jwt
  useEffect(() => {
    if (props.jwt) {
      let [head, pay, sig] = props.jwt.split('.')
      setJwtDetails({
        header: JSON.parse(Buffer.from(head, 'base64').toString()),
        payload: JSON.parse(Buffer.from(pay, 'base64').toString()),
        signature: sig
      })
    }
  }, [props.jwt])
  

  return (
    <div className="col order-4">
      <h3>JWT Details</h3>
      <h4>Header</h4>
      <div className="row">
        <div className="col-2">
          <a href="#" data-bs-toggle="tooltip" title="Signature or encryption algorithm">alg</a>
        </div>
        <div className="col">
          {!jwtDetails ? null : jwtDetails.header.alg}
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          typ
        </div>
        <div className="col">
          {!jwtDetails ? null : jwtDetails.header.typ}
        </div>
      </div>
      <h4>Payload</h4>
      <div className="row">
        <div className="col-2">
          iss
        </div>
        <div className="col">
          {!jwtDetails ? null : jwtDetails.payload.iss}
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          sub
        </div>
        <div className="col">
          {!jwtDetails ? null : jwtDetails.payload.sub}
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          iat
        </div>
        <div className="col">
          {!jwtDetails ? null : jwtDetails.payload.iat}
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          exp
        </div>
        <div className="col">
          {!jwtDetails ? null : jwtDetails.payload.exp}
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          jti
        </div>
        <div className="col">
          {!jwtDetails ? null : jwtDetails.payload.jti}
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          client_domain
        </div>
        <div className="col">
          {!jwtDetails ? null : jwtDetails.payload.client_domain}
        </div>
      </div>
      <h4>Signature</h4>
    </div>
  )
}
