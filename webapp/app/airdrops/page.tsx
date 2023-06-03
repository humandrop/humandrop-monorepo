"use client";
import { AirdropList } from "@/modules/airdrops/components/AirdropList";
import { Header } from "@/modules/app/components/Header";
import WagmiProvider from "@/modules/providers/components/WagmiProvider";
import { useEffect, useState } from "react";

export default function AirdropsPage() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, [])
  return (show ? 
    <WagmiProvider>
      <Header />
      <AirdropList />
    </WagmiProvider>
  : null);
}
