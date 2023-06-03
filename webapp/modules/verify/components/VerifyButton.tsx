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

  // Re-execute calls on loop 3 times to ensure the user is verified, if execute returns false, retry
  const reExecute = async (count: number, res: VerificationResult) => {
    console.log("RE EXECUTE", result);
    if (count === 0) return;
    
    const executing = await execute(
      res.merkle_root,
      res.nullifier_hash,
      res.proof
    );
    if (executing === "not-ready") {
      setTimeout(() => {
        reExecute(count - 1, res);
      }, 500);
    }
  };

  return (
    <div>
      {!result && (
        <IDKitWidget
          app_id="app_staging_9bee79db0f712a19d4699cff6b8733f9" // obtain this from developer.worldcoin.org
          action={solidityEncode(["string"], ["1"])}
          signal={solidityEncode(["address"], [address])}
          enableTelemetry
          handleVerify={(res) => {
            console.log("EEEEE", res);
            setResult(res);
            reExecute(3, res);
          }}
          onSuccess={(res) => {
            console.log("AAAAAAAAAA", res);
            setResult(res);
            reExecute(3, res);
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
        <button
          onClick={() => {
            reExecute(3, result);
          }}
        >
          Retry
        </button>
      )}

      <style jsx>{`
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
      `}</style>
    </div>
  );
}
