// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/wormhole-solidity-sdk/src/interfaces/IWormholeRelayer.sol";
import "lib/wormhole-solidity-sdk/src/interfaces/IWormholeReceiver.sol";

contract VoteReceiver is IWormholeReceiver {
    IWormholeRelayer public wormholeRelayer;
    address public owner;

    // sourceChain → sourceAddress
    mapping(uint16 => bytes32) public registeredSenders;

    // pollId → option → votes
    mapping(uint256 => mapping(uint8 => uint256)) public votes;

    event VoteReceived(
        uint256 pollId,
        uint8 option,
        address voter,
        uint16 sourceChain
    );

    constructor(address _wormholeRelayer) {
        wormholeRelayer = IWormholeRelayer(_wormholeRelayer);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier isRegisteredSender(uint16 sourceChain, bytes32 sourceAddress) {
        require(
            registeredSenders[sourceChain] == sourceAddress,
            "Unregistered sender"
        );
        _;
    }

    function setRegisteredSender(
        uint16 sourceChain,
        bytes32 sourceAddress
    ) external onlyOwner {
        registeredSenders[sourceChain] = sourceAddress;
    }

    function receiveWormholeMessages(
        bytes memory payload,
        bytes[] memory,
        bytes32 sourceAddress,
        uint16 sourceChain,
        bytes32
    )
        public
        payable
        override
        isRegisteredSender(sourceChain, sourceAddress)
    {
        require(
            msg.sender == address(wormholeRelayer),
            "Only relayer can call"
        );

        (uint256 pollId, uint8 option, address voter) =
            abi.decode(payload, (uint256, uint8, address));

        votes[pollId][option] += 1;

        emit VoteReceived(pollId, option, voter, sourceChain);
    }
}
