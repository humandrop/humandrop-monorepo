import { useMemo, useState } from "react";
import { TOKENS } from "../tokens.constants";
import { TokenCard } from "./TokenCard";
import { Token } from "../types/token";

export function TokenSelector({
  selected,
  onChange,
  chainId,
}: {
  selected: string;
  onChange: (token: Token) => void;
  chainId: number;
}) {
  const availableTokens = useMemo(() => {
    return Object.values(TOKENS).filter((token) => !!token.address[chainId]);
  }, [chainId]);

  const [customToken, setCustomToken] = useState('');

  return (
    <div className="wrapper">
      {availableTokens.map((token) => {
        return (
          <div
            className={`item ${
              selected === token.address[chainId] ? "selected" : ""
            }`}
            key={token.symbol}
            onClick={() => onChange(token)}
          >
            <TokenCard token={token} />
          </div>
        );
      })}
      <div
            className={`item ${
              selected === customToken ? "selected" : ""
            }`}
            onClick={onSelectCustom}
          >
            <TokenCard token={{
              address: {
                [chainId]: customToken
              },
              colorEnd: 'white',
              colorStart: 'black',
              logoURI: '/unknown.png',
              decimals: 18,
              name: 'Unknown',
              symbol: 'Unknown'
            }} />
          </div>
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
        }

        .item {
          margin: 10px;
          cursor: pointer;
        }

        .item.selected {
          border: 2px solid #f9ca24;
        }
      `}</style>
    </div>
  );
}
