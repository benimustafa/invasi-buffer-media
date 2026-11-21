import React from "react";
import {Composition, Still} from "remotion";
import {TCover, TFont, TBack} from "./Test";

export const TestRoot: React.FC = () => (
  <>
    <Still id="t-cover" component={TCover} width={1080} height={1350} />
    <Still id="t-font" component={TFont} width={1080} height={1350} />
    <Still id="t-back" component={TBack} width={1080} height={1350} />
    <Composition id="t-cover-motion" component={TCover} durationInFrames={150} fps={30} width={1080} height={1350} defaultProps={{motion: true}} />
      <Composition id="t-back-motion" component={TBack} durationInFrames={150} fps={30} width={1080} height={1350} defaultProps={{motion: true}} />
  </>
);
