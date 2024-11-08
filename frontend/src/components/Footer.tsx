import Image from "next/image";
import React from "react";

export const imageLinks = ["/x.svg", "m.svg", "Linked.svg"];

const Footer = () => {
  return (
    <div className="bg-[#14A800]/10 flex flex-col md:flex-row  gap-2 justify-between items-center px-12 py-4">
      <div className="flex gap-8">
        <Image src="/morphLogo.svg" alt="logo" width={84} height="84" />
        {imageLinks.map((image, index) => (
          <Image
            className=""
            key={index}
            src={image}
            alt="x"
            width={20}
            height={20}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 text-[#14A800] text-extrabold text-sm">
        <p>2024 Morph.</p>
        <p>All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
