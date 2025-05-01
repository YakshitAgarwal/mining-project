import React from "react";
import { useState } from "react";
const { ethers } = require("ethers");

const Payroll = () => {
  const [empAddress, setEmpAddress] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const MiningPayrollABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_emp",
          type: "address",
        },
        {
          internalType: "enum MiningPayroll.Role",
          name: "_role",
          type: "uint8",
        },
        {
          internalType: "enum MiningPayroll.WageType",
          name: "_wageType",
          type: "uint8",
        },
        {
          internalType: "uint256",
          name: "_wageAmount",
          type: "uint256",
        },
      ],
      name: "assignEmployee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_emp",
          type: "address",
        },
      ],
      name: "deactivateEmployee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_emp",
          type: "address",
        },
      ],
      name: "payDailyWage",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_emp",
          type: "address",
        },
      ],
      name: "payMonthlyWage",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
    {
      inputs: [],
      name: "admin",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "employees",
      outputs: [
        {
          internalType: "enum MiningPayroll.Role",
          name: "role",
          type: "uint8",
        },
        {
          internalType: "enum MiningPayroll.WageType",
          name: "wageType",
          type: "uint8",
        },
        {
          internalType: "uint256",
          name: "wageAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "lastPaid",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "isActive",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const MiningPayrollAddress = "0x08eDa66ddE1e22da43f86D7F35dA82625B2F911b";
  const miningPayrollContract = new ethers.Contract(
    MiningPayrollAddress,
    MiningPayrollABI,
    signer
  );

  const payDailyWage = async (employeeAddress) => {
    if (!window.ethereum) return alert("MetaMask not found");
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      MiningPayrollAddress,
      MiningPayrollABI,
      signer
    );

    const tx = await contract.payDailyWage(employeeAddress);
    await tx.wait();
    alert("Daily wage paid successfully!");
  };

  const payMonthlyWage = async (employeeAddress) => {
    if (!window.ethereum) return alert("MetaMask not found");
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      MiningPayrollAddress,
      MiningPayrollABI,
      signer
    );

    const tx = await contract.payMonthlyWage(employeeAddress);
    await tx.wait();
    alert("Monthly wage paid successfully!");
  };

  const handlePayDailyWage = async () => {
    if (!ethers.utils.isAddress(empAddress)) {
      alert("Invalid address");
      return;
    }
    await payDailyWage(empAddress);
  };

  const handlePayMonthlyWage = async () => {
    if (!ethers.utils.isAddress(empAddress)) {
      alert("Invalid address");
      return;
    }
    await payMonthlyWage(empAddress);
  };

  return (
    <div className="p-4 space-y-2">
      <input
        type="text"
        placeholder="Enter employee address"
        value={empAddress}
        onChange={(e) => setEmpAddress(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={handlePayDailyWage}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Pay Daily Wage
      </button>
      <button
        onClick={handlePayMonthlyWage}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Pay Monthly Wage
      </button>
    </div>
  );
};
export default Payroll;
