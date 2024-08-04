"use client";

import Image from "next/image";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import React from "react";
import VerticalLine from "./VerticalLine";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const account = useAccount();
  const { connectors, connect /* status, error */ } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  /* const openGithubTeam = () => {
    window.open("https://github.com/ClanVaults", "_blank");
  }; */

  // Function to format wallet address
  const formatAddress = (address?: string) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  function goToHome() {
    router.push("/");
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <Image
            onClick={goToHome}
            src="/clanvaults-logo.svg"
            alt="Logo"
            width={29}
            height={26}
            className="team-logo cursor-pointer"
          />
          <span className="header__title">Clan vaults</span>
        </div>
        <div className="homepage__loginOptionsContainer">
          {account.status === "disconnected" && (
            <span className="weight-bold">Login with</span>
          )}
          <div className="homepage__loginOptions">
            {account.status === "connected" ? (
              <div className="homepage__connectedInfoContainer">
                <div className="homepage__user-info">
                  <Image
                    className="user-avatar"
                    src="/empty-profile-icon.svg"
                    alt="User Avatar"
                    width={40}
                    height={40}
                  />
                  <VerticalLine />
                  <button className="login-btn" onClick={() => disconnect()}>
                    Disconnect
                  </button>
                  <VerticalLine />
                  <div className="homepage__wallet-info">
                    <svg
                      width="10"
                      height="10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="5" cy="5" r="5" fill="#7FFF00" />
                    </svg>
                    <p className="wallet-address">
                      {formatAddress(account.addresses[0])}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              connectors.map((connector) => {
                if (
                  connector.name === "MetaMask" ||
                  connector.name === "WalletConnect"
                ) {
                  return (
                    <div className="login-with-metamask" key={connector.uid}>
                      <Image
                        className="wallet-icon"
                        onClick={() => connect({ connector })}
                        src={
                          connector.name === "MetaMask"
                            ? "/metamask-login.svg"
                            : "/wallet-connect.jpg"
                        }
                        alt={connector.name}
                        width="40"
                        height="40"
                      />
                    </div>
                  );
                }
                return null;
              })
            )}
          </div>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <div className="user-profile">
            {account.status === "connected" && (
              <>
                <Image
                  className="user-avatar"
                  src="/empty-profile-icon.svg"
                  alt="User Avatar"
                  width={50}
                  height={50}
                />
                <p className="user-name">
                  {formatAddress(account.addresses[0])}
                </p>
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
              <li>
                <a href="#" className="nav-link">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Notifications
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Help
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Logout
                </a>
              </li>
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
};

export default Home;