"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SubMenu() {
  const pathname = usePathname();
  return (
    <div className="wrapper ">
      <div className="item pr-4">
        <Link href="/airdrops">
          <button
            className={`bg-transparent hover:bg-blue-500  font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded ${
              pathname === "/airdrops" ? "active" : ""
            }`}
          >
            Available Airdrops
          </button>
        </Link>
        <Link href="/airdrops/create">
          <button
            className={`ml-3 hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded ${
              pathname === "/airdrops/create" ? "active" : "bg-transparent"
            } `}
          >
            Create Airdrop
          </button>
        </Link>
        <Link href="/verify">
          <button
            className={`ml-3 hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded ${
              pathname === "/verify" ? "active" : "bg-transparent"
            } `}
          >
            Verify Personhood
          </button>
        </Link>
        <Link href="/airdrops/mine">
          <button
            className={`ml-3 hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded ${
              pathname === "/airdrops/mine" ? "active" : "bg-transparent"
            } `}
          >
            My airdrops
          </button>
        </Link>
      </div>
      <style jsx>{`
        .wrapper {
          display: flex;

          margin: 30px;
        }

        button {
          color: white;
        }

        button.active {
          border: 1px solid rgba(0,0,0,0.3);
          color: black;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
