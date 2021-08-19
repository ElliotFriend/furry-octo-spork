import React from 'react'

export default function SignedByServer(props) {
  let signedBy = props.signedBy
  return (
    <div className="row">
      <div className="col-1">
        :check:
      </div>
      <div className="col-11">
        <dl className="row">
          <dt className="col-3">Signed By</dt>
          <dd className="col-9">{signedBy ? signedBy : null}</dd>
        </dl>
      </div>
    </div>
  )
}
