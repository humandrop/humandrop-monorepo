"use client";
import { MyAirdrops } from "@/modules/airdrops/components/MyAirdrops";
import { Header } from "@/modules/app/components/Header";
import SubMenu from "@/modules/app/components/SubMenu";
import WagmiProvider from "@/modules/providers/components/WagmiProvider";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function AirdropPage({ params }: any) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, [])


  return (show ? 
    <WagmiProvider>
      <ToastContainer />
      <Header />
      <SubMenu />
      <MyAirdrops />
    </WagmiProvider>
  : null);
}
