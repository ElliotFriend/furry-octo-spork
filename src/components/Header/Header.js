import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <nav className="pt-3">
      <div className="container">
      <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
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
      </div>
    </nav>
  )
}
