import React from "react";
import {Composition, Still} from "remotion";
import {CCover, CoverProps} from "./Canva";
// KUNCI (Beni 25 Nov 2026): 4-5 template per koleksi. Tiap kartu cover memutar 2 template,
// tempo sama, dan di setiap saat 3 kartu menampilkan 3 template BERBEDA (tidak boleh kembar).
const DATA: CoverProps = {
  headline: "CAFE TEMPLATES,\nREADY TO EDIT.",
  sub: "MENUS, PROMOS, HIRING POSTS + MORE",
  pill: "SWIPE TO SEE THE SET  →",
  lists: [["menu.jpg", "hiring.jpg"], ["promo.jpg", "opening.jpg"], ["hiring.jpg", "menu.jpg"]],
};
export const Root: React.FC = () => (<>
  <Composition id="c-cover" component={CCover} durationInFrames={150} fps={30} width={1080} height={1350} defaultProps={{...DATA, motion: true}} />
  <Still id="c-cover-still" component={CCover} width={1080} height={1350} defaultProps={{...DATA, motion: false}} />
</>);
