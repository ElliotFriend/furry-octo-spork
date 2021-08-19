import React from 'react'

export default function ClientDomainOperation(props) {
  let operation = props.operation
  return (
    <div className="row">
      <div className="col-1">
        :check:
      </div>
      <div className="col-11">
        <dl className="row">
          <dt className="col-3"><code>client_domain</code> Signature</dt>
          <dd className="col-9">manage_data(client_domain, sig from client_domain account)</dd>
        </dl>
      </div>
    </div>
  )
}
