import React from 'react'

export default function FirstOperation(props) {
  let operation = props.operation
  return (
    <div className="row">
      <div className="col-1">
        :check:
      </div>
      <div className="col-11">
        <dl className="row">
          <dt className="col-3">First Operation</dt>
          <dd className="col-9">
            {operation
              ? `${operation.type}\n
                 ${operation.source}\n
                 ${operation.name}\n
                 ${operation.value}`
              : null}
          </dd>
        </dl>
      </div>
    </div>
  )
}
