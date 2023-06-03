"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <div>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={50}
                height={50}
                
              />
            </div>
          </Link>

          <ConnectButton />
        </div>
      </nav>
    </div>
  );
}
