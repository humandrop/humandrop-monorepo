"use client";
import { AirdropList } from "@/modules/airdrops/components/AirdropList";
import { Footer } from "@/modules/app/components/Footer";
import { Header } from "@/modules/app/components/Header";
import SubMenu from "@/modules/app/components/SubMenu";
import WagmiProvider from "@/modules/providers/components/WagmiProvider";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function AirdropsPage() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, [])
  return (show ? 
    <WagmiProvider>
    <ToastContainer />

      <Header />
      <SubMenu />
      <AirdropList />
      <Footer />
    </WagmiProvider>
  : null);
}
