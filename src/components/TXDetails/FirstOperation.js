import React from 'react'
import SuccessIcon from './SuccessIcon'
import FailIcon from './FailIcon'

export default function FirstOperation(props) {
  let operation = props.operation
  return (
    <div className="row">
      <div className="col-1">
        { !operation ? null :
          operation.type === "manageData" &&
          operation.source === props.pubkey &&
          operation.name === `${props.anchor} auth` &&
          operation.value.length === 64
            ? <SuccessIcon />
            : <FailIcon />
        }
      </div>
      <div className="col-11">
        <dl className="row">
          <dt className="col-3">First Operation</dt>
          <dd className="col-9">
            {operation
              ? <pre>
                  type:   {operation.type}<br />
                  source: {operation.source}<br />
                  name:   {operation.name}<br />
                  value:  {Buffer.from(operation.value).toString()}
                </pre>
              : null}
          </dd>
        </dl>
      </div>
    </div>
  )
}
