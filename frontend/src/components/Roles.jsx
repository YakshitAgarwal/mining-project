import React, { useState } from "react";
const { ethers } = require("ethers");

const Roles = () => {
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("0"); // Default to role 0 (Worker)

  const MiningRolesABI = [
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "enum MiningRoles.Role", name: "role", type: "uint8" },
      ],
      name: "assignRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "getRole",
      outputs: [
        { internalType: "enum MiningRoles.Role", name: "", type: "uint8" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const MiningRolesAddress = "0xcD1e3aBD0E86721DdF4068DE7761fb9833cB4Fc0";

  const assignRole = async (accountAddress, roleIndex) => {
    if (!window.ethereum) return alert("MetaMask not found");
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      MiningRolesAddress,
      MiningRolesABI,
      signer
    );
    const tx = await contract.assignRole(accountAddress, roleIndex);
    await tx.wait();
    alert("Role assigned!");
  };

  const handleAssignRole = async () => {
    if (!ethers.utils.isAddress(address)) {
      alert("Invalid address");
      return;
    }
    await assignRole(address, parseInt(role));
  };

  return (
    <div className="p-4 space-y-2">
      <input
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 w-full"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="0">Worker</option>
        <option value="1">Manager</option>
        <option value="2">General Manager</option>
        <option value="3">Admin</option>
      </select>

      <button
        onClick={handleAssignRole}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Assign Role
      </button>
    </div>
  );
};

export default Roles;
