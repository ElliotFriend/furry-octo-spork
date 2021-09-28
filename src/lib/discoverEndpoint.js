import { StellarTomlResolver } from 'stellar-sdk'

const discoverEndpoint = async (domain) => {
  // find out the correct endpoint to direct our requests to.
  let toml = await StellarTomlResolver.resolve(domain)
  return toml.WEB_AUTH_ENDPOINT
}

export default discoverEndpoint
