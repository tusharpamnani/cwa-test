import { BrowserProvider, Contract } from "ethers"
import { VoteSenderABI } from "./abi"
import { CHAINS, CONTRACTS, VOTE_SENDER_ADDRESS } from "./constants"
import { getSigner } from "./wallet"

/**
 * UI status states
 */
export type WormholeStatus =
  | "idle"
  | "connecting-wallet"
  | "switching-network"
  | "sending"
  | "source-confirmed"
  | "in-transit"
  | "pending-claim"
  | "delivered"
  | "failed"

type VoteParams = {
  pollId: number
  option: number
  targetChain: number
  targetAddress: string
}

export type VoteResult = {
  sourceTxHash: string
  wormholeScanUrl: string
}

type StatusCallback = (status: WormholeStatus, data?: any) => void

const EXPECTED_CHAIN_ID = 11155111n // Ethereum Sepolia

/**
 * Get provider AFTER network is correct
 */
async function getSafeProvider(): Promise<BrowserProvider> {
  if (!(window as any).ethereum) {
    throw new Error("MetaMask not installed")
  }

  const provider = new BrowserProvider((window as any).ethereum)
  const network = await provider.getNetwork()

  if (network.chainId !== EXPECTED_CHAIN_ID) {
    throw new Error("WRONG_NETWORK")
  }

  return provider
}

/**
 * Ensure wallet is connected & on Sepolia
 */
async function ensureWalletReady(onStatus: StatusCallback) {
  onStatus("connecting-wallet")

  await (window as any).ethereum.request({
    method: "eth_requestAccounts",
  })

  let provider = new BrowserProvider((window as any).ethereum)
  let network = await provider.getNetwork()

  if (network.chainId !== EXPECTED_CHAIN_ID) {
    onStatus("switching-network")

    await (window as any).ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }], // 11155111
    })

    // ⚠️ MUST recreate provider after switch
    provider = new BrowserProvider((window as any).ethereum)
    network = await provider.getNetwork()

    if (network.chainId !== EXPECTED_CHAIN_ID) {
      throw new Error("Failed to switch network")
    }
  }

  return provider
}

/**
 * Main vote submission
 */
export async function submitVote(
  params: VoteParams,
  onStatus: StatusCallback
): Promise<VoteResult | null> {
  try {
    onStatus("sending")

    const signer = await getSigner()
    const sender = new Contract(
      VOTE_SENDER_ADDRESS,
      VoteSenderABI,
      signer
    )

    const deliveryValue = BigInt("170000000000")

    const tx = await sender.sendVote(
      params.targetChain,
      params.targetAddress,
      params.pollId,
      params.option,
      { value: deliveryValue }
    )

    onStatus("source-confirmed")

    await tx.wait()

    onStatus("in-transit")

    const wormholeScanUrl =
      `https://wormholescan.io/#/tx/${tx.hash}?network=TESTNET`

      onStatus("pending-claim", {
        sourceTxHash: tx.hash,
        wormholeScanUrl,
      })
      

    return {
      sourceTxHash: tx.hash,
      wormholeScanUrl,
    }
  } catch (err) {
    console.error(err)
    onStatus("failed")
    return null
  }
}

