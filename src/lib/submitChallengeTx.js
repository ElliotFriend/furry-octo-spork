const submitChallengeTx = async (endpoint, transaction) => {
  let res = await fetch(endpoint, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "transaction": transaction })
  })
  let json = await res.json()

  if (!res.ok) {
    throw json.error
  }
  return json.token
}

export default submitChallengeTx
