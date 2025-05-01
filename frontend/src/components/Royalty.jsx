import React from "react";
import { useState } from "react";
const { ethers } = require("ethers");

const Royalty = () => {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const RoyaltyManagementABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "payRoyalty",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "payer",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "RoyaltyPaid",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
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
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "transactions",
      outputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const RoyaltyManagementAddress = "0xDA0BB96cF257De9b44aa6a3984E3dEEa43D40a5c";
  const royaltyManagementContract = new ethers.Contract(
    RoyaltyManagementAddress,
    RoyaltyManagementABI,
    signer
  );

  const payRoyalty = async (receiverAddress, ethAmount) => {
    if (!window.ethereum) return alert("MetaMask not detected");

    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      RoyaltyManagementAddress,
      RoyaltyManagementABI,
      signer
    );

    const tx = await contract.payRoyalty(receiverAddress, {
      value: ethers.utils.parseEther(ethAmount.toString()),
    });
    await tx.wait();
    alert("Royalty paid!");
  };

  const handlePayRoyalty = async () => {
    if (!ethers.utils.isAddress(receiver)) {
      alert("Invalid address");
      return;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Invalid amount");
      return;
    }

    await payRoyalty(receiver, amount);
  };

  return (
    <div className="p-4 space-y-2">
      <input
        type="text"
        placeholder="Receiver address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="number"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={handlePayRoyalty}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Pay Royalty
      </button>
    </div>
  );
};
export default Royalty;
