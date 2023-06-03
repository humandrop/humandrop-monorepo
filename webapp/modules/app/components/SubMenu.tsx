"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SubMenu() {
  const pathname = usePathname();
  return (
    <div className="wrapper ">
        <div className="item">
          <Link href="/airdrops">
            <button
              className={`bg-transparent hover:bg-blue-500  font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded ${
                pathname === "/airdrops" ? "active" : ""
              }`}
            >
              Available Airdrops
            </button>
          </Link>
        </div>
        <div className="item">
          <Link href="/airdrops/create">
            <button
              className={`hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded ${
                pathname === "/airdrops/create" ? "active" : "bg-transparent"
              } `}
            >
              Create Airdrop
            </button>
          </Link>
        </div>
        <div className="item">
          <Link href="/verify">
            <button
              className={`hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded ${
                pathname === "/verify" ? "active" : "bg-transparent"
              } `}
            >
              Verify Personhood
            </button>
          </Link>
        </div>
        <div className="item">
          <Link href="/airdrops/mine">
            <button
              className={`hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded ${
                pathname === "/airdrops/mine" ? "active" : "bg-transparent"
              } `}
            >
              My airdrops
            </button>
          </Link>
        </div>
        <div className="item">
          <Link href="/claims">
            <button
              className={`hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded ${
                pathname === "/claims" ? "active" : "bg-transparent"
              } `}
            >
              Latest Claims
            </button>
          </Link>
        </div>
      
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-wrap: wrap;
          margin: 30px;
        }

        button {
          color: white;
        }

        button.active {
          border: 1px solid rgba(0, 0, 0, 0.3);
          color: black;
          text-decoration: underline;
        }

        .item {
          margin-top: 4px;
          margin-right: 15px;
        }
      `}</style>
    </div>
  );
}
