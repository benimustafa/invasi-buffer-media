import React from "react";
import {Composition, Still} from "remotion";
import {CCover, CoverProps} from "./Canva";
// Data koleksi: ganti headline/sub/lists per payung Canva
const DATA: CoverProps = {
  headline: "CAFE TEMPLATES,\nREADY TO EDIT.",
  sub: "MENUS, PROMOS, HIRING POSTS + MORE",
  pill: "SWIPE TO SEE THE SET  →",
  lists: [["menu.jpg", "opening.jpg", "promo.jpg", "hiring.jpg"], ["promo.jpg", "hiring.jpg", "opening.jpg", "menu.jpg"], ["hiring.jpg", "menu.jpg", "opening.jpg", "promo.jpg"]],
};
export const Root: React.FC = () => (<>
  <Composition id="c-cover" component={CCover} durationInFrames={150} fps={30} width={1080} height={1350} defaultProps={{...DATA, motion: true}} />
  <Still id="c-cover-still" component={CCover} width={1080} height={1350} defaultProps={{...DATA, motion: false}} />
</>);
