import React from 'react'
import SuccessIcon from './SuccessIcon'
import FailIcon from './FailIcon'

export default function SignedByServer(props) {
  let [signedBy] = props.signedBy
  let serverKey = props.serverKey
  return (
    <div className="row">
      <div className="col-1">
        {
          signedBy === serverKey
            ? <SuccessIcon />
            : <FailIcon />
        }
      </div>
      <div className="col-11">
        <dl className="row">
          <dt className="col-3">Signed By</dt>
          <dd className="col-9"><pre>{signedBy}</pre></dd>
        </dl>
      </div>
    </div>
  )
}
