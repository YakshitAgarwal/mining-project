// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract RoyaltyManagement is Ownable {
    struct Transaction {
        uint256 amount;
        uint256 timestamp;
        address from;
        address to;
    }
    
    Transaction[] public transactions;
    
    event RoyaltyPaid(address indexed payer, address indexed receiver, uint256 amount);

    constructor() Ownable(msg.sender) {}
    
    function payRoyalty(address receiver) external payable {
        require(msg.value > 0, "Invalid amount");
        transactions.push(Transaction(msg.value, block.timestamp, msg.sender, receiver));
        payable(receiver).transfer(msg.value);
        emit RoyaltyPaid(msg.sender, receiver, msg.value);
    }
}
