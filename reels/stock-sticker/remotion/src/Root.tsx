import React from "react";
import {Composition} from "remotion";
import {StickerReel, StickerProps, lengthFor} from "./Sticker";
const items = ["e02.png","e03.png","e04.png","e05.png","e06.png","e07.png","e08.png","e09.png","e10.png","e11.png","e01.png"];
const DATA: StickerProps = {
  bg: "set/bg.jpg", items,
  name: "COFFEE SHOP\nELEMENT PACK", meta: "HAND-DRAWN · 20 VECTOR ELEMENTS",
  ctaTitle: "MAKE IT\nYOUR CAFE.", ctaLines: ["Download the pack on Shutterstock", "link in bio", "", "Need custom illustration?", "invasistudio@gmail.com"],
  ctaPill: "LINK IN BIO  →", beat: 8,
};
export const Root: React.FC = () => (
  <Composition id="sticker-reel" component={StickerReel} durationInFrames={lengthFor(items.length, 8)} fps={30} width={1080} height={1920} defaultProps={DATA} />
);
