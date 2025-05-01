// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MiningRoles {
    enum Role { Worker, Manager, GeneralManager, Admin }
    
    mapping(address => Role) private _roles;
    
    modifier onlyAdmin() {
        require(_roles[msg.sender] == Role.Admin, "Unauthorized");
        _;
    }
    
    function assignRole(address account, Role role) external onlyAdmin {
        _roles[account] = role;
    }
    
    function getRole(address account) public view returns (Role) {
        return _roles[account];
    }
}
