import { formatEther } from "viem";
import { Button } from "./ui/button";
// import PlaceBetModal from "./BetModal";

interface BetProps {
  bet: {
    id: bigint;
    title: string;
    threshold: bigint;
    totalPoolForExceed: bigint;
    totalPoolForNotExceed: bigint;
    epochEnded: boolean;
  };

  onPlaceBet: (betId: number, betForExceed: boolean, amount: string) => void;
  onEndEpoch: (betId: number) => void;
}

const BetCard: React.FC<BetProps> = ({ bet, onPlaceBet, onEndEpoch }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg  backdrop-blur-md mt-8">
      <div className="">
        <h3 className="text-xl font-bold text-black mb-2">{bet.title}</h3>
        <div className="text-gray-500 font-semibold mb-2">
          <p className="">ID: {bet.id.toString()}</p>
          <p className="">Threshold: ETH</p>
          <p className="">Pool for Exceed: ETH</p>
          <p className="">Pool for Not Exceed: ETH</p>
        </div>
        <p
          className={`text-sm font-semibold ${
            bet.epochEnded ? "text-red-500" : "text-green-500"
          }`}
        >
          Status: {bet.epochEnded ? "Ended" : "Active"}
        </p>
      </div>

      <div className="mt-4 flex space-x-4">
        {/* <PlaceBetModal
          betId={Number(bet.id.toString())}
          onPlaceBet={onPlaceBet}
        > */}
        <Button
          onClick={() => {}}
          size="lg"
          className="bg-[#14A800] text-white rounded-full hover:bg-[#14A800]/80"
        >
          Place Bet
        </Button>
        {/* </PlaceBetModal> */}

        <Button
          onClick={() => onEndEpoch(Number(bet.id.toString()))}
          size="lg"
          className="bg-[#14A800]/50 text-white rounded-full hover:bg-[#14A800]/80"
        >
          End Epoch
        </Button>
      </div>
    </div>
  );
};

export default BetCard;
