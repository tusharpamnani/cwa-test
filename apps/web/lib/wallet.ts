import { BrowserProvider } from "ethers"

export async function getSigner() {
  if (!(window as any).ethereum) {
    throw new Error("MetaMask not installed")
  }

  const provider = new BrowserProvider((window as any).ethereum)

  // prompt wallet
  await provider.send("eth_requestAccounts", [])

  return provider.getSigner()
}
