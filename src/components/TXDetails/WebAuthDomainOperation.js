import React from 'react'
import SuccessIcon from './SuccessIcon'
import FailIcon from './FailIcon'

export default function WebAuthDomainOperation(props) {
  let operation = props.operation
  return (
    <div className="row">
      <div className="col-1">
        {
          operation.type === 'manageData' &&
          operation.source === props.serverKey &&
          operation.name === 'web_auth_domain' &&
          operation.value.length <= 64 &&
          Buffer.from(operation.value).toString() === props.homeDomain
            ? <SuccessIcon />
            : <FailIcon />
        }
      </div>
      <div className="col-11">
        <dl className="row">
          <dt className="col-3"><code>web_auth_domain</code> Operation</dt>
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
