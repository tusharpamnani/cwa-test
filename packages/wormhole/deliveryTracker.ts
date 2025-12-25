import type { DeliveryStatus } from "./types"

export async function trackDelivery(txHash: string): Promise<DeliveryStatus> {
  // pseudo logic:
  // 1. check relayer status
  // 2. map to delivery state

  // starter-friendly mock:
  await new Promise((r) => setTimeout(r, 4000))
  return "delivered"
}
