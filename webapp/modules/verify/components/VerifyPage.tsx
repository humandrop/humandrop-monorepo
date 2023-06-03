"use client";
import { useIsHumanVerified } from "@/modules/airdrops/hooks/useIsHumanVerified";
import { polygon } from "viem/chains";
import { useAccount, useNetwork } from "wagmi";
import { VerifyButton } from "./VerifyButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function VerifyPage() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const chainId = (chain?.id || polygon.id) as 137 | 80001;

  const { data: verified, mutate: mutateVerified } = useIsHumanVerified({
    address: address as `0x${string}`,
    chainId,
  });

  return (
    <div>
      <div className="wrapper">
        <h3>
          Prove that you are a human and start qualifying for all the Airdrops!
        </h3>
        {!address && <ConnectButton />}
        {address && !verified && (
          <div className="verify-section">
            <VerifyButton
              address={address}
              chainId={chainId}
              onVerify={mutateVerified}
            />
          </div>
        )}
        {address && verified && (
          <div className="verify-section">
            <h2>Verified!</h2>
            <h3>Now you can start claiming!</h3>
          </div>
        )}
      </div>
      <style jsx>{`
        .wrapper {
          padding-left: 30px;
          padding-right: 30px;
          padding-bottom: 100px;
          padding-top: 100px;
        }

        h2 {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 15px;
          color: white;
          text-align: center;
        }

        h3 {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 30px;
          color: white;
          text-align: center;
        }

        .verify-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 60px;
          padding-bottom: 60px;
          background: linear-gradient(180deg, #1c1c1c 0%, #000000 100%);
          max-width: 500px;
          margin: 0 auto;
          border-radius: 8px;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}
