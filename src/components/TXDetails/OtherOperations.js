import React from 'react'

export default function OtherOperations(props) {
  let operations = props.operations
  return (
    <div className="row">
      <div className="col-1">
        :check:
      </div>
      <div className="col-11">
        <dl className="row">
          <dt className="col-3">Other Operations</dt>
          <dd className="col-9">
            {operations ? "Something here" : null}
          </dd>
        </dl>
      </div>
    </div>
  )
}
