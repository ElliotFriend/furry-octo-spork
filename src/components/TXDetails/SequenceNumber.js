import React from 'react'
import SuccessIcon from './SuccessIcon'
import FailIcon from './FailIcon'

export default function SequenceNumber(props) {
  let seqNumber = props.seqNumber
  return (
    <div className="row">
      <div className="col-1">
        {
          parseInt(seqNumber) === 0
            ? <SuccessIcon />
            : <FailIcon />
        }
      </div>
      <div className="col-11">
        <dl className="row">
          <dt className="col-3">Sequence Number</dt>
          <dd className="col-9"><pre>{seqNumber}</pre></dd>
        </dl>
      </div>
    </div>
  )
}
