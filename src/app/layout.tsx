import { cookieToInitialState } from "wagmi";
import "./globals.css";
import { getConfig } from "../wagmi";
import { headers } from "next/headers";
import { Providers } from "./providers";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get("cookie"),
  );
  return (
    <html lang="en">
      <Providers initialState={initialState}>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
