"use client";
import { Footer } from "@/modules/app/components/Footer";
import { Header } from "@/modules/app/components/Header";
import SubMenu from "@/modules/app/components/SubMenu";
import WagmiProvider from "@/modules/providers/components/WagmiProvider";
import { VerifyPage } from "@/modules/verify/components/VerifyPage";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Verify() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return show ? (
    <WagmiProvider>
      <ToastContainer />

      <Header />
      <SubMenu />
      <VerifyPage />
      <Footer />
    </WagmiProvider>
  ) : null;
}
