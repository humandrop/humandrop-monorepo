"use client";

import { CONTRACTS } from "@/modules/airdrops/aidrops.constants";

export function Footer() {
  return (
    <div>
      <footer>
        <div className="column">
          <a href="https://thegraph.com/hosted-service/subgraph/rafinskipg/humandrop-mumbai">
            Subgraph
          </a>
        </div>
        <div className="column">
          <a href="https://github.com/humandrop/humandrop-monorepo">GitHub</a>
        </div>
        <div className="column">
          <a href={`https://mumbai.polygonscan.com/address/${CONTRACTS.airdropFactory[80001]}`}>
            Airdrop Factory (Mumbai)
          </a>
        </div>
        <div className="column">
          <a href={`https://mumbai.polygonscan.com/address/${CONTRACTS.verifier[80001]}`}>
            Verifier (Mumbai)
          </a>
        </div>
      </footer>

      <style jsx>{`
        footer {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          margin-top: 30px;
        }

        .column { 
            margin: 15px;
        }
      `}</style>
    </div>
  );
}
