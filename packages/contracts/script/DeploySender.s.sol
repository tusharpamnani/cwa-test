// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../lib/forge-std/src/Script.sol";
import "../source/VoteSender.sol";

contract DeploySender is Script {
    function run() external {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        VoteSender sender = new VoteSender(
            0x7B1bD7a6b4E61c2a123AC6BC2cbfC614437D0470
        );

        vm.stopBroadcast();
    }
}
