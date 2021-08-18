import React, { useState, useEffect } from 'react';
import './JWTDetails.css';
import JWTDetailPart from './JWTDetailPart';
import JWTDescription from './JWTDescription'
let jwt = require('jsonwebtoken')

export default function JWTDetails(props) {
  let [jwtDetails, setJwtDetails] = useState({
    header: {},
    payload: {},
    signature: {}
  });

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

  // console.log(typeof jwtDetails.si)

  return (
    <div>
      <h3>JWT Details</h3>
      <h4>Header</h4>
      <JWTDetailPart jwtPart={jwtDetails.header} />
      <h4>Payload</h4>
      <JWTDetailPart jwtPart={jwtDetails.payload} />
      <h4>Signature</h4>
      <JWTDetailPart jwtPart={jwtDetails.signature} />
      <JWTDescription />
    </div>
  )
}
