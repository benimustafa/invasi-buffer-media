import React from "react";
import {AbsoluteFill, Img, Audio, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate} from "remotion";
// v2 (Beni 25 Nov): ikut ref Bistro — stiker KECIL muncul satu per satu menyebar & menumpuk,
// tanpa teks di awal. Ending: stiker hilang -> BG digelapkan -> teks saja (tanpa frame), mini & luxury, putih + kuning.
const WHITE = "#fbf8ef", GOLD = "#f2d27a";
const css = `
@font-face{font-family:'Plex';font-weight:400;src:url(${staticFile("fonts/IBMPlexMono-Regular.ttf")});}
@font-face{font-family:'ISerif';src:url(${staticFile("fonts/InstrumentSerif-Regular.ttf")});}`;
const mono = (size: number, ls: number, color: string): React.CSSProperties => ({fontFamily: "Plex, monospace", fontSize: size, letterSpacing: ls, color, whiteSpace: "pre"});
export type StickerProps = {bg: string; items: string[]; name: string; meta: string; ctaLines: string[]; beat: number; music?: string; firstBeat?: number};
// posisi tersebar (x,y pusat, lebar px, rotasi) — kecil, seperti ref
export const SPOTS: [number, number, number, number][] = [
  [300, 560, 220, -6], [790, 470, 210, 8], [540, 820, 230, -3], [210, 1010, 200, 10], [860, 900, 215, -9],
  [560, 1170, 210, 6], [250, 1380, 220, -8], [840, 1300, 200, 7], [520, 1560, 225, -5], [850, 1680, 200, 11],
  [220, 1730, 205, -11], [560, 300, 195, 6], [210, 230, 190, -7], [880, 180, 185, 4],
];
export const timing = (beat: number, firstBeat = 8) => {
  const inStart = firstBeat, inEnd = inStart + SPOTS.length * beat, hold = inEnd + 18;
  const outEnd = hold + 14, textIn = outEnd + 4;
  return {inStart, inEnd, hold, outEnd, textIn, total: Math.ceil(textIn + 100)};
};
export const StickerReel: React.FC<StickerProps> = ({bg, items, name, meta, ctaLines, beat, music, firstBeat}) => {
  const f = useCurrentFrame(); const {fps, durationInFrames} = useVideoConfig();
  const T = timing(beat, firstBeat);
  const pop = (t: number) => spring({frame: t, fps, config: {damping: 10, stiffness: 240, mass: 0.5}});
  const dark = interpolate(f, [T.hold, T.textIn], [0.12, 0.5], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const tIn = (d: number) => interpolate(f, [T.textIn + d, T.textIn + d + 14], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const rise = (d: number) => (1 - tIn(d)) * 18;
  return (<AbsoluteFill style={{background: "#111", overflow: "hidden"}}>
    <style>{css}</style>
    {music && <Audio src={staticFile(music)} volume={(fr) => interpolate(fr, [durationInFrames - 20, durationInFrames], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})} />}
    <Img src={staticFile(bg)} style={{position: "absolute", inset: 0, width: 1080, height: 1920, objectFit: "cover", transform: `scale(${1.03 + 0.03 * (f / durationInFrames)})`}} />
    <AbsoluteFill style={{background: `rgba(0,0,0,${dark})`}} />
    {f < T.outEnd && SPOTS.map(([x, y, w, r], i) => {
      const t = f - T.inStart - i * beat; if (t < 0) return null;
      const out = interpolate(f, [T.hold + (i % 5) * 2, T.hold + (i % 5) * 2 + 6], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
      return <Img key={i} src={staticFile(`set/${items[i % items.length]}`)} style={{position: "absolute", left: x, top: y, width: w, transform: `translate(-50%,-50%) scale(${pop(t) * out}) rotate(${r}deg)`}} />;
    })}
    {f >= T.textIn && <div style={{position: "absolute", left: 100, right: 100, top: 225, height: 1365, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
      <div style={{...mono(32, 12, GOLD), opacity: tIn(0), transform: `translateY(${rise(0)}px)`}}>INVASI STUDIO</div>
      <div style={{fontFamily: "ISerif", fontSize: 180, lineHeight: "166px", color: WHITE, whiteSpace: "pre", marginTop: 52, opacity: tIn(4), transform: `translateY(${rise(4)}px)`}}>{name}</div>
      <div style={{...mono(28, 6, WHITE), marginTop: 48, opacity: 0.85 * tIn(8)}}>{meta}</div>
      <div style={{width: 120, height: 2, background: GOLD, margin: "90px auto", opacity: tIn(14)}} />
      {ctaLines.map((l, i) => <div key={i} style={{...mono(36, 2, i % 2 ? GOLD : WHITE), lineHeight: "70px", opacity: tIn(18 + i * 3), transform: `translateY(${rise(18 + i * 3)}px)`}}>{l}</div>)}
    </div>}
  </AbsoluteFill>);
};
export const lengthFor = (beat: number, firstBeat?: number) => timing(beat, firstBeat).total;
