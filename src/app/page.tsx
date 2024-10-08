import { ConnectButton } from "@rainbow-me/rainbowkit";
import PageComponent from "./pageComponent";

export default function Home() {
  return (
    <div className="h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[60px,1fr] bg-[black]">
      <span
        className={`col-start-1 col-end-8 row-start-1 m-4 justify-self-end `}
      >
        <ConnectButton />
      </span>
      <PageComponent />
    </div>
  );
}
