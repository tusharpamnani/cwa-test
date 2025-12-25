/**
 * Global constants for the app.
 *
 * In the starter, these are placeholders.
 * Replace them once you deploy contracts on-chain.
 */
export const EVM_CHAINS = {
    SEPOLIA: {
      chainId: 11155111,
      name: "Ethereum Sepolia",
    },
    BASE_SEPOLIA: {
      chainId: 84532,
      name: "Base Sepolia",
    },
  } as const


export const CHAINS = {
    SEPOLIA: 10002,
    BASE_SEPOLIA: 10004,
  } as const
  
  export const CONTRACTS = {
    SOURCE: {
      [CHAINS.SEPOLIA]: "0x2Fa0DB38bda13E54f1359966149a0f1A7e63FD2c"
    },
    DESTINATION: {
      [CHAINS.BASE_SEPOLIA]: "0xd67388A2DBaf54250A80b277e362cCc4b6022Bc3"
    }
  } as const

export const VOTE_SENDER_ADDRESS =
  "0x2Fa0DB38bda13E54f1359966149a0f1A7e63FD2c"

export const VOTE_RECEIVER_ADDRESS =
  "0xd67388A2DBaf54250A80b277e362cCc4b6022Bc3"

  
  /**
   * Delivery mode:
   * - "simulated": default for starter & workshops
   * - "real": real Wormhole + on-chain contracts
   */
  export const DELIVERY_MODE: "simulated" | "real" = "real"
  