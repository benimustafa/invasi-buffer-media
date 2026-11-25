import React from "react";
import {Composition} from "remotion";
import {StickerReel, StickerProps, lengthFor} from "./Sticker";
const DATA: StickerProps = {
  bg: "set/bg.jpg", items: ["e02.png","e03.png","e04.png","e05.png","e06.png","e07.png","e08.png","e09.png","e10.png","e11.png","e01.png"],
  name: "Coffee Shop\nElement Pack", meta: "HAND-DRAWN · 20 VECTOR ELEMENTS",
  ctaLines: ["Download the pack on Shutterstock", "link in bio", "Custom illustration", "invasistudio@gmail.com"],
  beat: 6,
};
export const Root: React.FC = () => (
  <Composition id="sticker-reel" component={StickerReel} durationInFrames={lengthFor(6)} fps={30} width={1080} height={1920} defaultProps={DATA} />
);
