"use client";
import { AirdropDetail } from "@/modules/airdrops/components/AirdropDetail";
import { AirdropList } from "@/modules/airdrops/components/AirdropList";
import { CreateAirdrop } from "@/modules/airdrops/components/CreateAirdrop";
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

    // Address of the airdrop
    const address = params.address;

    
  return (show ? 
    <WagmiProvider>
      <ToastContainer />
      <Header />
      <SubMenu />
      <AirdropDetail address={address} />
    </WagmiProvider>
  : null);
}
