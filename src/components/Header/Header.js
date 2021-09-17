import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <nav className="navbar navbar-light pt-3 bg-light pb-0">
      <div className="container justify-content-center justify-content-lg-between">
        <ul className="nav nav-tabs border-0 align-self-end order-3 order-lg-1" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="request-tab" data-bs-toggle="tab" data-bs-target="#request" type="button" role="tab" aria-controls="request" aria-selected="true">
              1. Request Challenge TX
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="challenge-tab" data-bs-toggle="tab" data-bs-target="#challenge" type="button" role="tab" aria-controls="challenge" aria-selected="false">
              2. View Challenge TX
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="jwt-tab" data-bs-toggle="tab" data-bs-target="#jwt" type="button" role="tab" aria-controls="jwt" aria-selected="false">
              3. View JWT
            </button>
          </li>
        </ul>
        <ul className="nav mb-3 order-2">
          <li className="nav-item">
            <div className="btn-group">
              <button className="btn btn-primary dropdown-toggle font-monospace" data-bs-toggle="dropdown" aria-expanded="false" id="moreInfoDropdown">More Info</button>
              <ul className="dropdown-menu" aria-labelledby="moreInfoDropdown">
                <li>
                  <a href="https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md" className="font-monospace dropdown-item">SEP-0010 Specification</a>
                </li>
                <li>
                  <a href="https://jwt.io" type="button" className="font-monospace dropdown-item">JWT.IO Website</a>
                </li>
                <li>
                  <a href="https://tools.ietf.org/html/rfc7519" type="button" className="font-monospace dropdown-item">RFC 7159 Technical Paper</a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <button onClick={() => window.location.reload()} className="font-monospace btn mx-1 btn-outline-danger">Reset Everything</button>
          </li>
        </ul>

      </div>
    </nav>
  )
}
