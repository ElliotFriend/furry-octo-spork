import React from 'react';
import './JWTDisplay.css';
import JWTDetails from '../JWTDetails/JWTDetails'
import JWTDescription from '../JWTDetails/JWTDescription'

export default function JWTDisplay(props) {
  return (
    <div className="container tab-pane fade" id="jwt" role="tabpanel" aria-labelledby="jwt-tab">
      <div className="row">
        <div className="col-12 col-lg-4 mb-4">
          <h1>Wow!</h1>
          <p>Here's your very own JSON Web Token! You can use this token to authenticate with other SEP endpoints and servers. You can also check out the details of what your JWT contains.</p>
          <h3>JSON Web Token</h3>
          <pre className="bg-light user-select-all text-break text-wrap">
            {props.jwt}
          </pre>
        </div>
        <div className="col-12 col-lg-8">
          { props.jwt ? <JWTDetails jwt={props.jwt} /> : null }
          <JWTDescription />
        </div>
      </div>
    </div>
  )
}
