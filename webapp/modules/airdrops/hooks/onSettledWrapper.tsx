import { TransactionReceipt } from 'viem';

// Adapts wagmi onSettled to handle network rejections
// TODO: Remove once this is implemented https://github.com/wagmi-dev/wagmi/issues/1264#issuecomment-1308850003
export function onSettledWrapper(
  onSuccess: (hash: string) => void,
  onError: (err: Error, hash: string) => void
) {
  return function (data?: TransactionReceipt, error?: Error | null) {
    console.log('Settled', data, error)
    
    if (data) {
      if (data.status === 'reverted') {
        onError && onError(new Error('Transaction reverted.'), data.transactionHash);
      } else {
        onSuccess && onSuccess(data.transactionHash);
      }
    }

    if (error) {
      onError && onError(error, data?.transactionHash || '');
    }
  };
}
