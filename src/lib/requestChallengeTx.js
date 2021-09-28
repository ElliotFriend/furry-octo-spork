import discoverEndpoint from './discoverEndpoint'

const requestChallengeTx = async ({ domain, pubkey, home_domain = '', client_domain = '' }) => {
  // Form the URL we'll be requesting the challenge tx from.
  let endpointURL = `${await discoverEndpoint(domain)}?account=${pubkey}`
  if (home_domain) { endpointURL += `&home_domain=${home_domain}` }
  if (client_domain) { endpointURL += `&client_domain=${client_domain}` }

  // Send the request await the response
  let res = await fetch(endpointURL, {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })
  let json = await res.json()

  // Throw error if not ok
  if (!res.ok) {
    throw json.error
  }

  // Return challenge tx if ok
  else {
    return json.transaction
  }
}

export default requestChallengeTx
