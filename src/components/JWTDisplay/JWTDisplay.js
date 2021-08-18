import React from 'react';
import './JWTDisplay.css';

export default function JWTDisplay(props) {
  return (
    <div>
      <h3>JSON Web Token</h3>
      <pre className="bg-light user-select-all text-break text-wrap">
        {props.jwt}
      </pre>
    </div>
  )
}
