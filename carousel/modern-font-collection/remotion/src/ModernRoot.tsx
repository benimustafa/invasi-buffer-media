import React from "react";
import {Composition, Still} from "remotion";
import {MCover, MFont, MBack} from "./Modern";

export const ModernRoot: React.FC = () => (
  <>
    <Still id="m-font" component={MFont} width={1080} height={1350} defaultProps={{i: 0}} />
    <Still id="m-cover-still" component={MCover} width={1080} height={1350} defaultProps={{motion: false}} />
    <Composition id="m-cover" component={MCover} durationInFrames={150} fps={30} width={1080} height={1350} defaultProps={{motion: true}} />
    <Composition id="m-back" component={MBack} durationInFrames={150} fps={30} width={1080} height={1350} defaultProps={{motion: true}} />
  </>
);
