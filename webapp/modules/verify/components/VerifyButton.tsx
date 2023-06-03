"use client";
import { IDKitWidget, solidityEncode } from "@worldcoin/idkit";
import { useContractWrite } from "wagmi";
import { useVerifyHuman } from "../hooks/useVerifyHuman";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useIsHumanVerified } from "../hooks/useIsHumanVerified";

type VerificationResult = {
  credential_type: string;
  merkle_root: string;
  nullifier_hash: string;
  proof: string;
};

export function VerifyButton({
  address,
  chainId,
  onVerify,
}: {
  address: `0x${string}`;
  chainId: number;
  onVerify: ({
    credential_type,
    merkle_root,
    nullifier_hash,
    proof,
  }: any) => void;
}) {
  const [result, setResult] = useState<VerificationResult | null>(null);

  const { execute } = useVerifyHuman({
    address,
    nullifierHash: result?.nullifier_hash || "",
    proof: result?.proof || "",
    root: result?.merkle_root || "",
    onError: (error) => {
      toast.error("Error verifying your identity. Please try again.");
    },
    onSuccess: (hash) => {
      toast.success("Successfully verified your identity.");
      onVerify(result);
      mutate();
    },
  });

  const { data: verified, mutate } = useIsHumanVerified({
    address,
    chainId,
  });

  return (
    <div className="wrapper">
      {!result && (
        <IDKitWidget
          app_id="app_staging_9bee79db0f712a19d4699cff6b8733f9" // obtain this from developer.worldcoin.org
          action={solidityEncode(["string"], ["1"])}
          signal={solidityEncode(["address"], [address])}
          enableTelemetry
          handleVerify={(res) => {
            setResult(res);
            execute(res.merkle_root, res.nullifier_hash, res.proof);
          }}
          onSuccess={(res) => {
            setResult(res);
            execute(res.merkle_root, res.nullifier_hash, res.proof);
          }} // pass the proof to the API or your smart contract
        >
          {({ open }) => (
            <button className="hover:bg-blue-500" onClick={open}>
              <div className="powered">
                <img
                  src="/worldcoin.png"
                  alt="Worldcoin"
                  width={30}
                  height={30}
                />
                <span>Verify</span>
              </div>
            </button>
          )}
        </IDKitWidget>
      )}

      {result && !verified && (
        <div className="wrapper">
          <p className="text">
            We are now verifying your identity on-chain. Please wait...
          </p>
          <button
            onClick={() => {
              execute(result.merkle_root, result.nullifier_hash, result.proof);
            }}
          >
            Retry on-chain request
          </button>
          <div className="restart">
            <button onClick={() => setResult(null)}>
              Restart WorldId verification
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .text {
          color: white;
          margin-bottom: 15px;
        }

        button {
          padding: 8px;
          border-radius: 8px;
          border: 1px solid white;
          color: white;
          padding-left: 16px;
          padding-right: 16px;
        }

        .powered {
          display: flex;
          align-items: center;
        }

        img {
          margin-right: 10px;
        }

        .restart {
          margin-top: 15px;
        }
      `}</style>
    </div>
  );
}
