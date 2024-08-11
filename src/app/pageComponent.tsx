"use client";

import { readContract, writeContract } from "viem/actions";
import { config, walletClient } from "./Provider";
import LudexProtocol from "./LudexProtocol.json";
import { toast } from "react-toastify";
import { useState } from "react";

export default function PageComponent() {
  const contractAddress = "0x7A39eD022C332e305AaD99aE5340E9253715cD4d";

  const [challengeBlockChainAddress, setChallengeBlockChainAddress] =
    useState("");
  const [challenge, setChallenge] = useState({});

  const getOnChainChallenge = async (blockchainAddress: string) => {
    let getOnChainChallengeResponse; // Onchain Challenge Object

    // We get the onchain challenge object from the contract
    try {
      const result: any = await readContract(config.getClient(), {
        abi: LudexProtocol.abi,
        address: contractAddress,
        functionName: "getChallenge",
        args: [
          "0x12a4e735fed9cbeb1e83c96626149d6185d0b8c66f2d37594d558d8b1fd2932c",
        ],
      });
      if (result) {
        getOnChainChallengeResponse = result;
      }
    } catch (error) {
      console.log("Failed to get onchain challenge", error);
      //   toast.warn("Switch to Avalanche Mainnet", {
      //     style: {
      //       backgroundColor: "#3d2f69",
      //       color: "#fff",
      //     },
      //   });
    }

    console.log(getOnChainChallengeResponse, "Onchain Challenge");

    setChallenge(getOnChainChallengeResponse);
  };

  const createOnChainChallenge = async () => {
    const [account] = await walletClient.getAddresses();

    let createOnChainChallengeResponse; // Onchain Challenge Object

    // We get the onchain challenge object from the contract
    // If the player is not on the correct chain we switch to the correct chain
    // Then we get the onchain getOnChainChallengeResponse object

    try {
      const result: any = await walletClient.writeContract({
        address: contractAddress,
        abi: LudexProtocol.abi,
        functionName: "createChallenge",
        args: [
          1,
          "0xD3841b234e60cA36785Ed522D04CaCf54E381FFF",
          1,
          2,
          true,
          true,
          "0x0000000000000000000000000000000000000000",
          1,
          1,
          BigInt(222),
        ],
        account,
        gas: BigInt(300000),
      });
      if (result) {
        createOnChainChallengeResponse = result;
      }
    } catch (error) {
      console.log("Failed to create onchain challenge", error);
    }

    console.log(createOnChainChallengeResponse, "Onchain Challenge Created");
  };

  const joinOnChainChallenge = async () => {
    const [account] = await walletClient.getAddresses();

    let joinOnChainChallengeResponse; // Onchain Challenge Object

    // We get the onchain challenge object from the contract
    // If the player is not on the correct chain we switch to the correct chain
    // Then we get the onchain getOnChainChallengeResponse object

    try {
      const result: any = await walletClient.writeContract({
        address: contractAddress,
        abi: LudexProtocol.abi,
        functionName: "joinChallenge",
        value: BigInt(1),
        args: [
          //   "0x12a4e735fed9cbeb1e83c96626149d6185d0b8c66f2d37594d558d8b1fd2932c",
          12345,
          "0x0000000084f3085d5f9b7604310a9803ffa5eeaa9252b60f8c3c3209ed53d4cb591e2c30",
        ],
        account,
        gas: BigInt(300000),
      });
      if (result) {
        joinOnChainChallengeResponse = result;
        console.log(joinOnChainChallengeResponse);
      }
    } catch (error) {
      console.log("Failed to join onchain challenge", error);
    }
  };

  return (
    <div className={`row-start-2 col-start-1 col-end-8 bg-white`}>
      <button
        onClick={() => getOnChainChallenge("")}
        className={`bg-[#7b3fe4] text-white rounded-lg p-2 m-2`}
      >
        Get Onchain Challenge
      </button>
      <button
        onClick={async () => await createOnChainChallenge()}
        className={`bg-[#7b3fe4] text-white rounded-lg p-2 m-2`}
      >
        Create Onchain Challenge
      </button>
      <button
        onClick={async () => await joinOnChainChallenge()}
        className={`bg-[#7b3fe4] text-white rounded-lg p-2 m-2`}
      >
        Join Onchain Challenge
      </button>
      <div className={`m-2`}>{/* <p>{JSON.stringify(challenge)}</p> */}</div>
    </div>
  );
}
