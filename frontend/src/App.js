import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Royalty from "./components/Royalty";
import Payroll from "./components/Payroll";
import Roles from "./components/Roles";

function App() {
  const [etherBalance, setEtherBalance] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [userAccount, setUserAccount] = useState("");
  const [info, setInfo] = useState(true);

  const checkAccount = async () => {
    if (!window.ethereum) {
      console.log("Connect to MetaMask");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        console.log(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.error("Error checking account:", error);
    }
  };

  const getAccountDetails = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = accounts[0];
        setUserAccount(account);

        const balanceWei = await provider.getBalance(account);
        const balanceEth = ethers.utils.formatEther(balanceWei);
        setEtherBalance(balanceEth);

        console.log("Account Address:", account);
        console.log("Balance:", balanceEth, "ETH");

        const transactionCount = await provider.getTransactionCount(account);
        console.log("Total Transactions:", transactionCount);
        setTotalTransactions(transactionCount);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  const handleInfo = () => {
    setInfo(!info);
  };

  useEffect(() => {
    checkAccount();
    getAccountDetails();
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="nav-container">
          <div className="nav-center">Mining project</div>
          <div className="nav-right">
            {userAccount ? (
              <div>
                {userAccount.substring(0, 10)}...
                <div onClick={handleInfo}>
                  <button>open</button>
                </div>
              </div>
            ) : (
              <button onClick={getAccountDetails}>Connect Wallet</button>
            )}
          </div>
        </div>
      </div>

      <div className="userInfo">
        {!info ? (
          <div>
            {" "}
            <p>Account : {userAccount.substring(0, 12)}...</p>
            <p>Balance : {etherBalance}</p>
            <p>Transactions : {totalTransactions}</p>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div>
        <Royalty />
      </div>

      <div>
        <Roles />
      </div>

      <div>
        <Payroll />
      </div>
    </>
  );
}

export default App;
