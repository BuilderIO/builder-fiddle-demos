import "../styles/globals.css";

import type { AppProps } from "next/app";
import { builder } from "@builder.io/react";

// Initialize once builder with the apiKey
builder.init("63f829e0e7a44824a11461f3037b38ed");

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
