"use client";

import Image from "next/image";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function Home() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <Image
            src="icon.svg"
            alt="Logo"
            width={100}
            height={40}
          />
        </div>
        <div className="header-actions">
          {account.status === "connected" ? (
            <button className="login-btn" onClick={() => disconnect()}>
              Disconnect
            </button>
          ) : (
            connectors
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
              ))
          )}
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
                    src="/metamask-login.svg"
                    alt="MetaMask"
                    width="40"
                    height="40"
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </header>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar Menu */}
        <aside className="sidebar">
          <nav className="nav">
            <ul>
              <li><a href="#" className="nav-link">Dashboard</a></li>
              <li><a href="#" className="nav-link">Profile</a></li>
              <li><a href="#" className="nav-link">Settings</a></li>
              <li><a href="#" className="nav-link">Notifications</a></li>
              <li><a href="#" className="nav-link">Help</a></li>
              <li><a href="#" className="nav-link">Logout</a></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="content">
          <div className="grid-container">
            <div className="grid-item grid-item-single">Container 1</div>
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
