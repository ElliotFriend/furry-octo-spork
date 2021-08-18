import React from 'react';
import './JWTDisplay.css';
import JWTDetails from '../JWTDetails/JWTDetails'

export default function JWTDisplay(props) {
  return (
    <div class="tab-pane fade" id="jwt" role="tabpanel" aria-labelledby="jwt-tab">
      <h3>JSON Web Token</h3>
      <pre className="bg-light user-select-all text-break text-wrap">
        {props.jwt}
      </pre>
      <JWTDetails jwt={props.jwt} />
    </div>
  )
}
