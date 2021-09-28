import { TransactionBuilder } from 'stellar-sdk'

const signChallengeTx = (transaction, keypair, networkPassphrase) => {
  let tx = TransactionBuilder.fromXDR(transaction, networkPassphrase)
  tx.sign(keypair)
  return tx.toXDR()
}

export default signChallengeTx
