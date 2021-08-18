import React from 'react'

export default function JWTDescription() {
  return (
    <div className="accordion" id="accordionJWT">
      <div className="accordion-item row justify-content-center">
        <h2 className="accordion-header" id="jwtAccordionHeading">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseJWT" aria-expanded="true" aria-controls="collapseJWT">
            What am I looking at?!
          </button>
        </h2>
        <div id="collapseJWT" className="accordion-collapse collapse" aria-labelledby="jwtAccordionHeading" data-bs-parent="#accordionJWT">
          <div className="accordion-body">
            <p>I know, these things can be confusing. You can find out a bunch more at <strong><a href="https://jwt.io">jwt.io</a></strong> or in the official <strong><a href="https://datatracker.ietf.org/doc/html/rfc7519">RFC 7519</a></strong> paper.</p>
            <p>If you're short on time, below is a rundown of some of the basics of JWT terminology.</p>
            <div className="container">
              <dl className="row">
                <dt className="col-12 h5">Header</dt>
                <dd className="col-12">Every JWT carries a header with claims about itself. These claims establish the algorithms used, whether the JWT is signed or encrypted, and in general, how to parse the rest of the JWT.</dd>
                <dt className="col-3">typ</dt>
                <dd className="col-9">The <u>type</u> of token you're looking at</dd>
                <dt className="col-3">alg</dt>
                <dd className="col-9">The signature or encryption <u>algorithm</u></dd>
                <dt className="col-3">cty</dt>
                <dd className="col-9">The <u>content type</u> in the case that the payload contains a nested JWT (this is uncommon, so the <code>cty</code> claim is rarely present in headers)</dd>
                <dt className="col-12 h5">Payload</dt>
                <dd className="col-12">The payload is the element where all the interesting user data is usually added. In addition, certain claims defined in the spec may also be present. Just like the header, the payload is a JSON object.</dd>
                <dt className="col-3">iss</dt>
                <dd className="col-9">The principal that <u>issued</u> the token. This should be a URI for the issuer (<code>https://example.com</code> or <code>https://example.com/G...</code>)</dd>
                <dt className="col-3">sub</dt>
                <dd className="col-9">The principal that is the <u>subject</u> of the token. This is the public key of the (your) authenticating Stellar account (<code>G...</code>)</dd>
                <dt className="col-3">iat</dt>
                <dd className="col-9">The time which the token was <u>issued at</u>. This is denoted in seconds since Unix epoch</dd>
                <dt className="col-3">exp</dt>
                <dd className="col-9">The <u>expiration</u> time on or after which the token must not be accepted for processing. A server can pick its own expiration period for the token. This is denoted in seconds since Unix epoch</dd>
                <dt className="col-3">jti</dt>
                <dd className="col-9"><u>JWT ID</u> or a unique identifier for this token</dd>
                <dt className="col-3">client_domain</dt>
                <dd className="col-9">(Optional). This nonstandard JWT claim contains the client home domain. This claim is included if the challenge transaction contained a <code>client_domain</code></dd>
                <dt className="col-12 h5">Signature</dt>
                <dd className="col-12">The purpose of a signature is to allow one or more parties to establish the authenticity of the JWT. Authenticity in this context means the data contained in the JWT has not been tampered with. In other words, any party that can perform a signature check can rely on the contents provided by the JWT.</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
