"use client";

import BetCard from "@/components/BetCard";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { wagerAbi, wagerAddress } from "@/constants";
import { toast } from "sonner";
import { parseEther } from "viem";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useReadContract,
} from "wagmi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useAccount, useDisconnect } from "wagmi";

interface BetInfo {
  id: bigint;
  title: string;
  threshold: bigint;
  totalPoolForExceed: bigint;
  totalPoolForNotExceed: bigint;
  epochEnded: boolean;
}

export default function Home() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const formSchema = z.object({
    title: z.string(),
    threshold: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      threshold: "",
    },
  });

  const {
    data: hash,
    error,
    isPending,
    writeContractAsync,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isPending) {
      toast.loading("Transaction Pending");
    }
    if (isConfirmed) {
      toast.success("Transaction Successful", {
        action: {
          label: "View on Etherscan",
          onClick: () => {
            window.open(`https://explorer-holesky.morphl2.io/tx/${hash}`);
          },
        },
      });
    }
    if (error) {
      toast.error("Transaction Failed");
    }
  }, [isConfirming, isConfirmed, error, hash]);

  const createBet = async (data: z.infer<typeof formSchema>) => {
    try {
      const createBetTx = await writeContractAsync({
        address: wagerAddress,
        abi: wagerAbi,
        functionName: "createBet",
        args: [data.title, data.threshold],
      });

      console.log("created wager hash:", createBetTx);
      toast.success("Transaction Successful", {
        action: {
          label: "View on Etherscan",
          onClick: () => {
            window.open(
              `https://explorer-holesky.morphl2.io/tx/${createBetTx}`
            );
          },
        },
      });
    } catch (err: any) {
      toast.error("Transaction Failed: " + err.message);
      console.log("Transaction Failed: " + err.message);
    }
  };

  const { data: allBets } = useReadContract({
    abi: wagerAbi,
    address: wagerAddress,
    functionName: "getAllBets",
  }) as { data: BetInfo[] | undefined };

  const placeBet = async (
    betId: number,
    betForExceed: boolean,
    betAmount: string
  ) => {
    try {
      console.log(betId, betForExceed, betAmount, "yess");
      const bet = parseEther(betAmount);
      const placeBetTx = await writeContractAsync({
        address: wagerAddress,
        abi: wagerAbi,
        functionName: "placeBet",
        args: [betId, betForExceed],
        value: bet,
      });

      console.log("Bet placed hash:", placeBetTx);
    } catch (err: any) {
      toast.error("Transaction Failed: " + err.message);
      console.log("Transaction Failed: " + err.message);
    }
  };

  const endEpoch = async (betId: number) => {
    const connection = new EvmPriceServiceConnection(
      "https://hermes.pyth.network"
    );

    const priceIds = [
      "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    ];

    const priceFeedUpdateData = await connection.getPriceFeedsUpdateData(
      priceIds
    );

    try {
      const feeAmount = parseEther("0.01");
      const endEpochTx = await writeContractAsync({
        address: wagerAddress,
        abi: wagerAbi,
        functionName: "endEpoch",
        args: [betId, priceFeedUpdateData as any],
        value: feeAmount,
      });

      console.log("end of epoch hash:", endEpochTx);
    } catch (err: any) {
      toast.error("Transaction Failed: " + err.message);
      console.log("Transaction Failed: " + err.message);
      console.log(err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#fff]">
      <div
        className="flex flex-col items-center px-6"
        style={{
          backgroundImage: "url('/mBg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "80vh",
        }}
      >
        <div className="mt-24">
          <div className="flex flex-col items-center justify-center text-[#14A800]">
            <h3 className="text-xl md:text-2xl font-semibold">
              CREATE A NEW BET
            </h3>
            <h1 className="text-5xl md:text-7xl font-bold">ETH BETTING DAPP</h1>

            <Image
              className="-mt-14"
              alt="logo"
              src="/koala.svg"
              width={122}
              height={32}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-[#14A800] bg-[#EFFCE4] px-4 md:px-12 py-6 rounded-xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(createBet)}
                className="space-y-8"
              >
                <div className="flex flex-row items-center justify-between gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="">
                          <h1 className="text-xl font-bold text-[#14A800]">
                            Wager title
                          </h1>
                        </FormLabel>
                        <FormControl>
                          <input
                            className="border w-full min-w-[200px] md:min-w-[300px] py-2 px-3 rounded-lg border-[#14A800] bg-transparent focus:outline-none"
                            type="text"
                            placeholder="Enter Threshold"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="threshold"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="">
                          <h1 className="text-xl font-bold text-[#14A800]">
                            Threshold
                          </h1>
                        </FormLabel>
                        <FormControl>
                          <input
                            className="border w-full min-w-[200px] md:min-w-[300px] py-2 px-3 rounded-lg border-[#14A800] bg-transparent focus:outline-none"
                            type="text"
                            placeholder="Enter Threshold"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <Button
                    className="bg-[#14A800] text-white px-8 py-2 rounded-full self-center"
                    size="lg"
                    disabled={isConfirming}
                    type="submit"
                  >
                    {isConfirming ? "Creating a wager..." : "Create a wager"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="bg-[#14A800]/10 w-full h-screen mt-2">
        <h3 className="text-4xl font-bold text-[#14A800] text-center p-12">
          All Bets
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-12">
          {allBets ? (
            <div className="">
              {allBets.map((bet) => (
                <BetCard
                  bet={bet}
                  key={bet.id.toString()}
                  onPlaceBet={placeBet}
                  onEndEpoch={endEpoch}
                />
              ))}
            </div>
          ) : (
            <p>Loading bets...</p>
          )}
        </div>

        <div className="flex justify-center items-center my-12">
          <Button
            size="lg"
            className="bg-white text-bold text-[#14A800] px-10 py-6 rounded-full"
          >
            Add property
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
