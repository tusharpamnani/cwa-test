import type { SendVoteParams } from "./types"

export async function sendVote({
  pollId,
  option,
  sourceChain,
  targetChain,
  targetAddress
}: SendVoteParams) {
  // 1. Send source chain transaction
  const txHash = await sendSourceTx({
    pollId,
    option,
    targetChain,
    targetAddress
  })

  return {
    txHash,
    status: "source-confirmed" as const
  }
}
