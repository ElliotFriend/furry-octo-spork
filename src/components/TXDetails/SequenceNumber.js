import React from 'react'

export default function SequenceNumber(props) {
  let seqNumber = props.seqNumber
  return (
    <div className="row">
      <div className="col-1">
        :check:
      </div>
      <div className="col-11">
        <dl className="row">
          <dt className="col-3">Sequence Number</dt>
          <dd className="col-9">{seqNumber ? seqNumber : null}</dd>
        </dl>
      </div>
    </div>
  )
}
