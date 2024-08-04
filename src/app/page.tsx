"use client";

import Image from "next/image";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function Home() {
  const account = useAccount();
  const { connectors, connect /* status, error */ } = useConnect();
  const { disconnect } = useDisconnect();
  
  const openGithubTeam = () => {
    window.open("https://github.com/ClanVaults", "_blank");
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <Image onClick={openGithubTeam} src="/team-logo.png" alt="Logo" width={70} height={70} className="team-logo cursor-pointer"/>
        </div>
        <div className="homepage__loginOptionsContainer">
          {account.status === "disconnected" && <span className="weight-bold">Login</span>}
          <div className="homepage__loginOptions">
            {account.status === "connected" ? (
              <button className="login-btn" onClick={() => disconnect()}>
                Disconnect
              </button>
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

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar Menu */}
        <aside className="sidebar">
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
