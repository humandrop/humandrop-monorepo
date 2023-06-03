import { toast } from "react-toastify";
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACTS } from "../../airdrops/aidrops.constants";
import { polygon } from "viem/chains";
import abi from "../abis/verifier.abi.json";
import { onSettledWrapper } from "../../airdrops/hooks/onSettledWrapper";
import {
  encodeAbiParameters,
  parseAbiParameters,
  decodeAbiParameters,
} from "viem";

// Returns the tx hash
type HookParams = {
  address: `0x${string}`;
  root: string;
  nullifierHash: string;
  proof: string;
  onError: (error: Error) => void;
  onSuccess: (hash: string) => void;
};

export function useVerifyHuman({
  onError,
  onSuccess,
  address,
  root,
  nullifierHash,
  proof,
}: HookParams): {
  isLoading: boolean;
  error: Error | null;
  execute: (
    root: string,
    nullifierHash: string,
    proof: string
  ) => Promise<`0x${string}` | undefined | "not-ready">;
  retryPrepare: () => void;
} {
  const { chain } = useNetwork();
  const chainId = (chain?.id || polygon.id) as 80001 | 137;
  const unpackedProof = proof
    ? decodeAbiParameters(
        parseAbiParameters("uint256[8]"),
        proof as `0x${string}`
      )[0]
    : "";

  // const { config: approveConfig, refetch } = usePrepareContractWrite({
  //   address: CONTRACTS.verifier[chainId] as `0x${string}`,
  //   abi,
  //   chainId,
  //   functionName: "verifyAddress",

  //   args: [address, root, nullifierHash, unpackedProof],
  //  scopeKey: `${address}-verify-proof-${root}-${nullifierHash}`,
  // });

  const { writeAsync, write, error, isLoading, data } = useContractWrite({
    address: CONTRACTS.verifier[chainId] as `0x${string}`,
    abi,
    chainId,
    functionName: "verifyAddress",
    onError,
  });

  const { isLoading: isApproveProcessing } = useWaitForTransaction({
    hash: data?.hash,
    onSettled: onSettledWrapper(onSuccess, onError),
  });

  const execute = async (
    root: string,
    nullifierHash: string,
    proof: string
  ) => {
    if (writeAsync) {
      try {
        const unpackedProof = proof
          ? decodeAbiParameters(
              parseAbiParameters("uint256[8]"),
              proof as `0x${string}`
            )[0]
          : "";

        const result = await writeAsync({
          args: [address, root, nullifierHash, unpackedProof],
        });
        return result.hash;
      } catch (e) {
        console.log(e);
      }
    } else {
      return "not-ready";
    }
  };

  return {
    isLoading: isLoading || isApproveProcessing,
    error,
    execute,
  };
}
