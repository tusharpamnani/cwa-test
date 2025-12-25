async function sendSourceTx({
    pollId,
    option,
    targetChain,
    targetAddress
  }: {
    pollId: number
    option: number
    targetChain: number
    targetAddress: string
  }) {
    // This is where Wormhole SDK + ethers/wagmi lives
    // UI never sees this
  
    // pseudo-code
    /*
    const contract = new Contract(senderAddress, abi, signer)
    const tx = await contract.sendVote(
      targetChain,
      targetAddress,
      pollId,
      option,
      { value: fee }
    )
    await tx.wait()
    return tx.hash
    */
  
    return "0xSOURCE_TX_HASH"
  }
  