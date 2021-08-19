import React from 'react'

export default function ChallengeDescription() {
  return (
    <div className="accordion" id="accordionChallenge">
      <div className="accordion-item">
        <h2 className="accordion-header" id="challengeAccordionHeading">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseChallenge" aria-expanded="true" aria-controls="collapseChallenge">
            Wait, so what's happening? What's being checked?
          </button>
        </h2>
        <div id="collapseChallenge" className="accordion-collapse collapse show" aria-labelledby="challengeAccordionHeading" data-bs-parent="#accordionChallenge">
          <div className="accordion-body">
            <p>I'm so glad you asked! Here's what the SEP-0010 specification dictates should happen once the <strong>Client</strong> has received the challenge transaction:</p>
            <ol className="text-start">
              <li>The <strong>Client</strong> verifies that the transaction has an invalid sequence number 0. This is extremely important to ensure the transaction isn't malicious.</li>
              <li>The <strong>Client</strong> verifies that the transaction is signed by the Server Account obtained through discovery flow.</li>
              <li>The <strong>Client</strong> verifies that the transaction's first operation is a Manage Data operation that has its:
                <ol className="nested-list" type="i">
                  <li>Source account set to the <strong>Client Account</strong>.</li>
                  <li>Key set to <code>&lt;home domain&gt; auth</code> where the home domain is the <strong>Home Domain</strong>.</li>
                  <li>Value set to a nonce value.</li>
                </ol>
              </li>
              <li>The <strong>Client</strong> verifies that if the transaction has a Manage Data operation with key <code>web_auth_domain</code> that it has:
                <ol className="nested-list" type="i">
                  <li>Source account set to the <strong>Server Account</strong>.</li>
                  <li>Value set to the <strong>Server</strong>'s domain that the client requested the challenge from.</li>
                </ol>
              </li>
              <li>The Client verifies that if the transaction has other operations they are Manage Data operations and that their source account is set to:
                <ol className="nested-list" type="i">
                  <li>The <strong>Client Domain Account</strong> if the Manage Data operation key is set to <code>client_domain</code></li>
                  <li>Otherwise, the <strong>Server Account</strong>.</li>
                </ol>
              </li>
              <li>If the client included a client domain in the request, and the transaction has a Manage Data operation with key <code>client_domain</code>, the <strong>Client</strong> obtains a signature from the <strong>Client Domain Account</strong> and adds it to the challenge transaction.</li>
              <li>The <strong>Client</strong> signs the transaction using the secret key(s) of the signer(s) for the <strong>Client Account</strong>.</li>
              <li>The <strong>Client</strong> submits the signed challenge back to the <strong>Server</strong> using <code>token</code> endpoint.</li>
            </ol>
            <p>After that, the <strong>Server</strong> does some validation and checks, and if everything looks good, will send the <strong>Client</strong> a JWT in return.</p>
          </div>
        </div>
      </div>
    </div>
  )

}
