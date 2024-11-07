import Image from "next/image";
import React from "react";
import ConnectButton from "./ConnectButton";

const Header = () => {
  return (
    <div className="flex justify-between px-6 py-6 items-center bg-white">
      <Image alt="logo" src="/morphLogo.svg" width={122} height={32} />

      <ConnectButton />
    </div>
  );
};

export default Header;
