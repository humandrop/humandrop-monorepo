"use client";
import { IDKitWidget } from "@worldcoin/idkit";

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
    proof
  }: {
    credential_type: string,
    merkle_root: string,
    nullifier_hash: string,
    proof: string
  }) => void;
}) {
  return (
    <div>
      <IDKitWidget
        app_id="app_staging_9bee79db0f712a19d4699cff6b8733f9" // obtain this from developer.worldcoin.org
        action="1"
        enableTelemetry
        onSuccess={(result) => onVerify(result)} // pass the proof to the API or your smart contract
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
