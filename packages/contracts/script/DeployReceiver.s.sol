// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../lib/forge-std/src/Script.sol";
import "../destination/VoteReceiver.sol";

contract DeployReceiver is Script {
    function run() external {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        VoteReceiver receiver = new VoteReceiver(
            0x93BAD53DDfB6132b0aC8E37f6029163E63372cEE
        );

        vm.stopBroadcast();
    }
}
