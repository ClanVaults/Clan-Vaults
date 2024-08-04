"use client";

import Image from "next/image";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import React from "react";

const Home: React.FC = () => {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  // Function to format wallet address
  const formatAddress = (address?: string) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <Image
            src="icon.svg" // Replace with your logo path
            alt="Logo"
            width={100}
            height={40}
          />
          Clan Vaults
        </div>
        <div className="header-actions">
          {account.status === "connected" ? (
            <div className="header-logged-in">
              <button className="login-btn" onClick={() => disconnect()}>
                Disconnect
              </button>
              <div className="user-info">
                <Image
                  className="user-avatar"
                  src="/path/to/user-avatar.jpg" // Replace with user's avatar path
                  alt="User Avatar"
                  width={40}
                  height={40}
                />
                <div className="wallet-info">
                  <p className="wallet-address">{formatAddress(account.addresses[0])}</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {connectors
                .filter(
                  (connector) =>
                    connector.name === "Injected" ||
                    connector.name === "WalletConnect",
                )
                .map((connector) => (
                  <button
                    className="login-btn"
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                  >
                    {connector.name}
                  </button>
                ))}
              {connectors.map((connector) => {
                if (connector.name === "MetaMask") {
                  return (
                    <div
                      className="login-with-metamask"
                      key={connector.uid}
                    >
                      <span>Connect with wallet</span>
                      <Image
                        className="metamask-icon"
                        onClick={() => connect({ connector })}
                        src="/metamask-login.svg" // Replace with MetaMask icon path
                        alt="MetaMask"
                        width={40}
                        height={40}
                      />
                    </div>
                  );
                }
                return null;
              })}
            </>
          )}
        </div>
      </header>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar Menu */}
        <aside className="sidebar">
          <div className="user-profile">
            {account.status === "connected" && (
              <>
                <Image
                  className="user-avatar"
                  src="/path/to/user-avatar.jpg" // Replace with user's avatar path
                  alt="User Avatar"
                  width={50}
                  height={50}
                />
                <p className="user-name">{formatAddress(account.addresses[0])}</p>
              </>
            )}
          </div>
          {account.status === "connected" && (
            <div className="wallet-actions">
              <button className="wallet-action-btn">Fast Deposit</button>
              <div className="buttons-container">
                <button className="wallet-action-btn">Send</button>
                <button className="wallet-action-btn">Withdraw</button>
                <button className="wallet-action-btn">Scan</button>
              </div>
            </div>
          )}
          <nav className="nav">
            <ul>
              <li><a href="#" className="nav-link">Dashboard</a></li>
              <li><a href="#" className="nav-link">Profile</a></li>
              <li><a href="#" className="nav-link">Settings</a></li>
              <li><a href="#" className="nav-link">Notifications</a></li>
              <li><a href="#" className="nav-link">Help</a></li>
              <li><a href="#" className="logout">Logout</a></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="content">
          <div className="welcome-back">
            {account.status === "connected" && (
              <div className="welcome-back">
                <h2>Welcome Back, {formatAddress(account.addresses[0])}</h2>
                <div className="buttons-container">
                <div className="buttons-container">
                  <button className="wallet-action-btn">Send</button>
                  <button className="wallet-action-btn">Withdraw</button>
                  <button className="wallet-action-btn">Scan</button>
                </div>
                <button className="wallet-action-btn">Fast Deposit</button>
                </div>
              </div>
            )}
          </div>
          <div className="grid-item grid-item-single">Container 1</div>
          <div className="grid-container">
            <div className="grid-item">Container 2</div> 
            <div className="grid-item">Container 2</div>
            <div className="grid-item">Container 3</div>
            <div className="grid-item">Container 4</div>
            <div className="grid-item">Container 5</div>
            <div className="grid-item">Container 6</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
