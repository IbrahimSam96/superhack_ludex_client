"use client";

import { readContract, writeContract } from "viem/actions";
import { config, walletClient } from "./Provider";
import LudexProtocol from "./LudexProtocol.json";
import { toast } from "react-toastify";
import { useState } from "react";

export default function PageComponent() {
  const contractAddress = "0x69c687A5825A209c18e97af0E3FB6E8CC0afB543";
  const blockchainAddress =
    "0xd18324e1ba398ac1842fe2f0d28507bdc770bfa488468e101966829c5621f27d";
  const [challenge, setChallenge] = useState({});

  const getOnChainChallenge = async () => {
    let getOnChainChallengeResponse; // Onchain Challenge Object

    // We get the onchain challenge object from the contract
    try {
      const result: any = await readContract(config.getClient(), {
        abi: LudexProtocol.abi,
        address: contractAddress,
        functionName: "getChallenge",
        args: [blockchainAddress],
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
          //   blockchainAddress,
          12345,
          "0x310fe598182e43940b4d7f502f1b468069e85358a0b0a48a9ea06fb6fc690e99363680e62098f36aabfcaf7f5fb49d90f8388046cb2f620b4fda49ca8189572a8c4ab65129efe71916934700d19dcac5bc04a7c1f646f43e01701a15a6190cdb7f6952800adfb9103452744578b60ac9b1d2087031c04a76942b21f13312d8c0f2c49eda13073799eca77cb9d909e2e111095152aac1be67d7a1be2d4271d882764b89cd0bbc1a928baa29f42ff72980ca2ba403419efe7a62455e341d050449cf2162e02e0f96051a0f64560df1dd93a4d2763ff6d028ce74c5f29c05cb4e6f8bc88cdc00175a62de9a957f914fe2135c93704aa42896f0abeea3046b5f5c302b7a8aaa",
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
        onClick={() => getOnChainChallenge()}
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
