import { Image } from "@chakra-ui/react";
import React from "react";
import meme from "../images/27w39b.jpg";

const Homepage = () => {
  return (
    <div>
      Homepage
      <Image src={meme} width={500} height={500} alt="meme" />
    </div>
  );
};

export default Homepage;
