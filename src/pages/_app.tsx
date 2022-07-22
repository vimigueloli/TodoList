import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Header from "components/Header";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="w-full h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-tr text-white font-extralight from-black via-slate-900 to-slate-900 relative">
            <Toaster />
            <Header />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
