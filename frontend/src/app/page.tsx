"use client";

import BetCard from "@/components/BetCard";
import { PythPrice } from "@/components/PythPrice";
import Image from "next/image";
import { useAccount, useDisconnect } from "wagmi";

const dummyBets = [
  {
    id: 1,
    title: "Price of eth to exceed 2500 in three days more stuff",
    description: "Will ETH exceed $2000?",
  },
  {
    id: 2,
    title: "Bet on Bitcoin",
    description: "Will BTC drop below $30,000?",
  },
  { id: 3, title: "Bet on Dogecoin", description: "Will DOGE hit $0.10?" },
  // Add more dummy data as needed
];

export default function Home() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <main className="flex min-h-screen flex-col  bg-[#fff]">
      <div
        className="flex flex-col items-center px-6 "
        style={{
          backgroundImage: "url('/mBg.svg')",
          backgroundSize: "contain",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "80vh",
        }}
      >
        <div className="mt-24">
          <div className="flex flex-col items-center justify-center text-[#14A800]">
            <h3 className="text-2xl font-semibold">CREATE A NEW BET</h3>
            <h1 className="text-7xl font-bold">ETH BETTING DAPP</h1>

            <Image
              className=" -mt-14"
              alt="logo"
              src="/koala.svg"
              width={122}
              height={32}
            />
          </div>
          <div className="flex justify-between items-center text-[#14A800] bg-[#EFFCE4]  px-12 py-6 rounded-xl">
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-bold">Wager Title</h3>
              <input
                className=" border px-12 py-2 rounded-lg border-[#14A800] bg-transparent focus:outline-none"
                type="text"
                placeholder="Enter Wager Title"
              />
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-bold">Threshold</h3>
              <input
                className=" border px-12 py-2 rounded-lg border-[#14A800] bg-transparent focus:outline-none"
                type="text"
                placeholder="Enter Threshold"
              />
            </div>
          </div>
          <div className="flex justify-center items-center my-4 ">
            <button className="bg-[#14A800] text-white px-8 py-2 rounded-full">
              CREATE BET
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#14A800]/10 w-full h-screen mt-2 ">
        <h3 className="text-4xl font-bold text-[#14A800] text-center  p-12">
          All Bets
        </h3>

        <div className="grid grid-cols-3 gap-4 px-12">
          {dummyBets.map((bet) => (
            <BetCard key={bet.id} bet={bet} />
          ))}
        </div>
      </div>
    </main>
  );
}
