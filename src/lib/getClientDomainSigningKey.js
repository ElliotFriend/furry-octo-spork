import { StellarTomlResolver } from 'stellar-sdk'

const getClientDomainSigningKey = async (domain) => {
  try {
    let toml = await StellarTomlResolver.resolve(domain)
    return toml.SIGNING_KEY
  }
  catch (error) {
    if (error.toJSON().message === 'Network Error') {
      throw 'A network error has occurred while retrieving the signing key for the specified `client_domain`.'
    }
  }
}

export default getClientDomainSigningKey
