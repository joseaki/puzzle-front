import { CartProvider } from "@/context/cart";
import { CurrencyProvider } from "@/context/currency";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />;
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <CurrencyProvider>
      <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
    </CurrencyProvider>
  );
}
