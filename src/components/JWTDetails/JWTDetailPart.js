import React from 'react';

export default function JWTDetailPart(props) {

  const constructDetails = (jwtPart) => {
    let returnArr = []
    Object.entries(jwtPart).forEach(([key, val], i) => {
      returnArr = returnArr.concat(
        <div key={i} className="row">
          <div className="col-2">
            {key}
          </div>
          <div className="col">
            {val}
          </div>
        </div>
      )
    })
    return returnArr
  }

  let jwtPart = props.jwtPart
  let sigPart = typeof jwtPart === "string"
    ? <div className="row">
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
