// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../lib/forge-std/src/Script.sol";
import "../destination/VoteReceiver.sol";

contract RegisterSender is Script {
    function run() external {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        VoteReceiver receiver = VoteReceiver(
           0xd67388A2DBaf54250A80b277e362cCc4b6022Bc3
        );

        receiver.setRegisteredSender(
            10002, // Sepolia chain ID
            bytes32(uint256(uint160(0x2Fa0DB38bda13E54f1359966149a0f1A7e63FD2c)))
        );

        vm.stopBroadcast();
    }
}
