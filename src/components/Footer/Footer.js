import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer py-3 bg-dark">
      <div className="container text-center pb-3 border-bottom border-secondary">
        <a href="https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md" type="button" className="font-monospace btn mx-1 btn-outline-primary">SEP-0010</a>
        <a href="https://jwt.io" type="button" className="font-monospace btn mx-1 btn-outline-primary">JWT.IO</a>
        <a href="https://tools.ietf.org/html/rfc7519" type="button" className="font-monospace btn mx-1 btn-outline-primary">RFC 7159</a>
        <button onClick={() => window.location.reload()} className="font-monospace btn mx-1 btn-outline-danger">Reset Everything</button>
      </div>
      <div className="container mt-2 text-center">
        <span className="small text-muted">Made with plenty of Adderall by <a className="text-decoration-none" target="_blank" rel="noreferrer" href="https://github.com/elliotfriend">ElliotFriend</a></span>
      </div>
    </footer>
  )
}
