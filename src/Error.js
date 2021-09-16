import React from 'react';
import DangerIcon from './components/TXDetails/DangerIcon'

export default function Error(props) {
  return (
    <div className="alert alert-danger d-flex justify-content-center" role="alert">
      <DangerIcon />
      <div>
        <strong>Oops!</strong> { props.message }
      </div>
    </div>
  )
}
