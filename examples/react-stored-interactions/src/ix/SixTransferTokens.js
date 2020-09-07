import React, {useState} from "react"
import * as fcl from "@onflow/fcl"
import * as sdk from "@onflow/sdk"
import { template as transferTokens } from "@onflow/six-transfer-tokens"

export const SixTransferTokens = () => {
  const [result, setResult] = useState(null)
  const [toAddress, setToAddress] = useState("")
  const [amount, setAmount] = useState("")

  const run = async () => {
    try {
      const response = await fcl.send([
        sdk.pipe([
          transferTokens({
              proposer: fcl.currentUser().authorization,
              authorization: fcl.currentUser().authorization,     
              payer: fcl.currentUser().authorization,             
              amount: amount,                                    // Amount as a String representing a Cadence UFix64
              to: fcl.withPrefix(toAddress)                      // The Address of the Account to transfer tokens to.
          }),
          fcl.limit(1000),
        ])
      ])

      setResult(await fcl.decode(response))
    } catch(e) {
        console.log('error', e)
    }
  }

  return (
    <div>
      <input
        placeholder="to address"
        onChange={e => setToAddress(e.target.value)}
      />
      <input
        placeholder="amount"
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={run}>
        Run <strong>Stored Interaction - Transfer Tokens</strong> to -> {toAddress || "___"} of amount -> {amount || "___"}
      </button>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}
