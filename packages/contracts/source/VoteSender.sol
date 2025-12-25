// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/wormhole-solidity-sdk/src/interfaces/IWormholeRelayer.sol";

contract VoteSender {
    IWormholeRelayer public wormholeRelayer;

    uint256 public constant GAS_LIMIT = 500_000;

    event VoteSent(
        uint256 pollId,
        uint8 option,
        address voter,
        uint16 targetChain
    );

    constructor(address _wormholeRelayer) {
        wormholeRelayer = IWormholeRelayer(_wormholeRelayer);
    }

    function quoteDeliveryCost(
        uint16 targetChain
    ) public view returns (uint256 cost) {
        (cost, ) = wormholeRelayer.quoteEVMDeliveryPrice(
            targetChain,
            0,
            GAS_LIMIT
        );
    }

    function sendVote(
        uint16 targetChain,
        address targetAddress,
        uint256 pollId,
        uint8 option
    ) external payable {
        uint256 cost = quoteDeliveryCost(targetChain);

        require(
            msg.value >= cost,
            "Insufficient funds for cross-chain delivery"
        );

        bytes memory payload = abi.encode(
            pollId,
            option,
            msg.sender
        );

        wormholeRelayer.sendPayloadToEvm{ value: cost }(
            targetChain,
            targetAddress,
            payload,
            0,
            GAS_LIMIT
        );

        emit VoteSent(pollId, option, msg.sender, targetChain);
    }
}
