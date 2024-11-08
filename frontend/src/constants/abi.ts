export const wagerAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "bets",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "id", type: "uint256", internalType: "uint256" },
      { name: "title", type: "string", internalType: "string" },
      { name: "threshold", type: "uint256", internalType: "uint256" },
      {
        name: "totalPoolForExceed",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "totalPoolForNotExceed",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "epochEnded", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createBet",
    inputs: [
      { name: "title", type: "string", internalType: "string" },
      { name: "threshold", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "endEpoch",
    inputs: [
      { name: "betId", type: "uint256", internalType: "uint256" },
      {
        name: "pythPriceUpdate",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "ethUsdPriceId",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllBets",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct EthBettingDapp.BetInfo[]",
        components: [
          { name: "id", type: "uint256", internalType: "uint256" },
          { name: "title", type: "string", internalType: "string" },
          {
            name: "threshold",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "totalPoolForExceed",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "totalPoolForNotExceed",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "epochEnded", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getBetAmount",
    inputs: [
      { name: "betId", type: "uint256", internalType: "uint256" },
      { name: "user", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getBetPosition",
    inputs: [
      { name: "betId", type: "uint256", internalType: "uint256" },
      { name: "user", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getBettors",
    inputs: [{ name: "betId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTotalPoolForExceed",
    inputs: [{ name: "betId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTotalPoolForNotExceed",
    inputs: [{ name: "betId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "nextBetId",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "placeBet",
    inputs: [
      { name: "betId", type: "uint256", internalType: "uint256" },
      { name: "_betForExceed", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "pyth",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IPyth" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "BetCreated",
    inputs: [
      {
        name: "betId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "title",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "threshold",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BetPlaced",
    inputs: [
      {
        name: "betId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "user",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "betForExceed",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EpochEnded",
    inputs: [
      {
        name: "betId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "finalPrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "exceeded",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RewardTransferred",
    inputs: [
      {
        name: "bettor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "reward",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
];
