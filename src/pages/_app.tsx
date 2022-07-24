import "../styles/globals.css";
import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Header from "components/Header";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <div className="w-full h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-tr text-white font-extralight from-black via-slate-900 to-slate-900 relative">
            <Toaster />
            <Header back={router.pathname !== "/"} />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
