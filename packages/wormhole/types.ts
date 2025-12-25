export type DeliveryStatus =
  | "idle"
  | "source-confirmed"
  | "in-transit"
  | "delivered"
  | "failed"

export interface SendVoteParams {
  pollId: number
  option: number
  sourceChain: number
  targetChain: number
  targetAddress: string
}
