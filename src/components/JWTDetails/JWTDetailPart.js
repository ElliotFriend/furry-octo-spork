import React from 'react';

export default function JWTDetailPart(props) {

  const constructDetails = (jwtPart) => {
    let returnArr = []
    Object.entries(jwtPart).forEach(([key, val], i) => {
      returnArr = returnArr.concat(
        <dl key={i} className="row">
          <dt className="col-3">
            {key}
          </dt>
          <dd className="col-9">
            <pre>
              {val}
            </pre>
          </dd>
        </dl>
      )
    })
    return returnArr
  }

  let jwtPart = props.jwtPart
  let sigPart = typeof jwtPart === "string"
    ? <div className="row mb-3">
        <div className="col">
          {jwtPart}
        </div>
      </div>
    : null

  return (
    sigPart
      ? sigPart
      : constructDetails(jwtPart)
  )
}
