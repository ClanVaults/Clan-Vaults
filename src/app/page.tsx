"use client";

import Image from "next/image";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function Home() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        <div className="homepage__loginMethodsContainer">
          {connectors
            .filter(
              (connector) =>
                connector.name === "Injected" ||
                connector.name === "WalletConnect",
            )
            .map((connector) => {
              return (
                <button
                  className="homepage__defaultButtonToLogin cursor-pointer"
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  type="button"
                >
                  {connector.name}
                </button>
              );
            })}
        </div>
        <div>
          {connectors.map((connector) => {
            if (connector.name === "MetaMask") {
              return (
                <div
                  className="homepage__loginWithMetamaskContainer"
                  key={connector.uid}
                >
                  <span className="homepage__generalText">
                    Connect with wallet
                  </span>
                  <Image
                    className="cursor-pointer home"
                    onClick={() => connect({ connector })}
                    src="/metamask-login.svg"
                    alt="MetaMask"
                    width="40"
                    height="40"
                  />
                </div>
              );
            }
          })}
        </div>
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  );
}

export default Home;
