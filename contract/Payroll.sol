// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MiningPayroll {
    enum Role { None, Worker, DrillOperator, MinerOperator, LoaderOperator, DumpTruckOperator, BulldozerOperator, Manager, GeneralManager }
    enum WageType { None, Daily, Monthly }

    struct Employee {
        Role role;
        WageType wageType;
        uint wageAmount; // in wei
        uint lastPaid; // timestamp
        bool isActive;
    }

    mapping(address => Employee) public employees;
    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function assignEmployee(address _emp, Role _role, WageType _wageType, uint _wageAmount) external onlyAdmin {
        employees[_emp] = Employee(_role, _wageType, _wageAmount, 0, true);
    }

    function deactivateEmployee(address _emp) external onlyAdmin {
        employees[_emp].isActive = false;
    }

    function payDailyWage(address _emp) external onlyAdmin {
        Employee storage emp = employees[_emp];
        require(emp.isActive, "Inactive");
        require(emp.wageType == WageType.Daily, "Not daily wage");
        require(block.timestamp >= emp.lastPaid + 1 days, "Already paid today");
        emp.lastPaid = block.timestamp;
        payable(_emp).transfer(emp.wageAmount);
    }

    function payMonthlyWage(address _emp) external onlyAdmin {
        Employee storage emp = employees[_emp];
        require(emp.isActive, "Inactive");
        require(emp.wageType == WageType.Monthly, "Not monthly wage");
        require(block.timestamp >= emp.lastPaid + 30 days, "Already paid this month");
        emp.lastPaid = block.timestamp;
        payable(_emp).transfer(emp.wageAmount);
    }

    // Fallback to receive Ether for payroll
    receive() external payable {}
}
