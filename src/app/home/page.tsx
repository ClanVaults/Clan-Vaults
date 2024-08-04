"use client";

import Image from "next/image";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import React from "react";
import VerticalLine from "./VerticalLine";
import { usePathname, useRouter } from "next/navigation";
import HorizontalLine from "./HorizontalLine";
import SidebarCircle from "./SidebarCircle";
import ERC20Balance from "./ERC20Balance";
import Title from "./Title";
import Subtitle from "./Subtitle";
import FakeVaultCards from "../components/FakeVaultCards";

const Home: React.FC = () => {
  const account = useAccount();
  const { connectors, connect /* status, error */ } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const pathname = usePathname();
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
          <div className="homepage__user-profile">
            {account.status === "connected" && (
              <>
                <Image
                  className="user-avatar"
                  src="/empty-profile-icon.svg"
                  alt="User Avatar"
                  width={50}
                  height={50}
                />
                <div className="homepage__userNameAndBalanceContainer">
                  <span className="homepage__user-name">
                    {formatAddress(account.addresses[0])}
                  </span>
                  <span className="homepage__user-balance">$94.000</span>
                </div>
              </>
            )}
          </div>
          {account.status === "connected" && (
            <div className="homepage__wallet-actions">
              <button className="fast-deposit-btn">Fast Deposit</button>
              <div className="buttons-container">
                <button className="wallet-action-btn">Send</button>
                <button className="wallet-action-btn">Withdraw</button>
                <button className="wallet-action-btn">Scan</button>
              </div>
            </div>
          )}
          <div className="homepage__horizontalLineContainer">
            <HorizontalLine />
          </div>
          <nav className="nav">
            <ul>
              <li>
                <a
                  href="#"
                  className={
                    pathname === "/home" ? "active-nav-link" : "nav-link"
                  }
                >
                  <SidebarCircle />
                  Home
                </a>
              </li>
              <HorizontalLine />
              <li>
                <a
                  href="#"
                  className={
                    pathname === "/my-assets" ? "active-nav-link" : "nav-link"
                  }
                >
                  <SidebarCircle />
                  My assets
                </a>
              </li>
              <HorizontalLine />
              <li>
                <a
                  href="#"
                  className={
                    pathname === "/my-vaults" ? "active-nav-link" : "nav-link"
                  }
                >
                  <SidebarCircle />
                  My vaults
                </a>
              </li>
              <HorizontalLine />
              <li>
                <a
                  href="#"
                  className={
                    pathname === "/notifications"
                      ? "active-nav-link"
                      : "nav-link"
                  }
                >
                  <SidebarCircle />
                  Notifications
                </a>
              </li>
              <HorizontalLine />
              <li>
                <a
                  href="#"
                  className={
                    pathname === "/transactions"
                      ? "active-nav-link"
                      : "nav-link"
                  }
                >
                  <SidebarCircle />
                  Transactions
                </a>
              </li>
              <HorizontalLine />
              <li>
                <a
                  href="#"
                  className={
                    pathname === "/settings" ? "active-nav-link" : "nav-link"
                  }
                >
                  <SidebarCircle />
                  Settings
                </a>
              </li>
              <HorizontalLine />
              <li>
                <div
                  className="nav-link cursor-pointer"
                  onClick={() => disconnect()}
                >
                  <SidebarCircle />
                  Logout
                </div>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="content">
          <div>
            {account.status === "connected" && (
              <>
                <div className="welcome-back">
                  <h2 className="homepage__welcomeMessage">
                    Welcome Back, {formatAddress(account.addresses[0])}
                  </h2>
                  <div className="buttons-container">
                    <button className="fast-deposit-huge-btn">
                      Fast Deposit
                    </button>
                  </div>
                </div>
                <div className="homepage__section">
                  <div className="homepage__titleContainer">
                    <Title>My Assets</Title>
                  </div>
                  <div className="homepage__balances">
                    <ERC20Balance />
                    <ERC20Balance />
                    <ERC20Balance />
                    <ERC20Balance />
                    <ERC20Balance />
                    <ERC20Balance />
                  </div>
                </div>
                <div className="homepage__section">
                  <div className="homepage__titleContainer">
                    <Title>My Vaults</Title>
                  </div>
                  <FakeVaultCards />
                </div>
                <div className="homepage__section">
                  <div className="homepage__titleContainer">
                    <Title>Notifications</Title>
                  </div>
                  <div className="grid-item grid-item-single">
                    <Subtitle>Nothing to show</Subtitle>
                  </div>
                </div>
              </>
            )}
            {account.status === "disconnected" && (
              <Title>You are not logged in</Title>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
