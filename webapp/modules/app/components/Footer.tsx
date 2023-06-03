"use client";
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
          <a href="https://mumbai.polygonscan.com/address/0x7e8A8ca46082e74c73428125Fe23885d670E94fb">
            Airdrop Factory (Mumbai)
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
