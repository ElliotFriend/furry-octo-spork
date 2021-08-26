import React from 'react'
import SuccessIcon from './SuccessIcon'
import FailIcon from './FailIcon'

export default function ClientDomainOperation(props) {
  let operation = props.operation
  let client = props.client
  return (
    <div className="row">
      <div className="col-1">
        {
          operation.type === "manageData" &&
          operation.source === props.clientKey &&
          operation.name === "client_domain" &&
          Buffer.from(operation.value).toString() === client
            ? <SuccessIcon />
            : <FailIcon />
        }
      </div>
      <div className="col-11">
        <dl className="row">
          <dt className="col-3"><code>client_domain</code> Operation</dt>
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
