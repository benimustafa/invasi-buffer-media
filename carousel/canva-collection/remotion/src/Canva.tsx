import React from "react";
import {AbsoluteFill, staticFile, useCurrentFrame, spring, interpolate, useVideoConfig} from "remotion";
// Mengikuti frame Figma "Template Canva Collection" > 01 Cover (98:202)
const PAPER = "#efebdf", INK = "#2b2a14";
const css = `
@font-face{font-family:'Plex';font-weight:400;src:url(${staticFile("fonts/IBMPlexMono-Regular.ttf")});}
@font-face{font-family:'Plex';font-weight:500;src:url(${staticFile("fonts/IBMPlexMono-Medium.ttf")});}
@font-face{font-family:'ISerif';src:url(${staticFile("fonts/InstrumentSerif-Regular.ttf")});}`;
const mono = (size: number, ls: number, lh: number, color: string, weight = 400): React.CSSProperties => ({fontFamily: "Plex, monospace", fontWeight: weight, fontSize: size, letterSpacing: ls, lineHeight: `${lh}px`, color, whiteSpace: "pre"});
const img = (n: string): React.CSSProperties => ({backgroundImage: `url(${staticFile(`cc/${n}`)})`, backgroundSize: "cover", backgroundPosition: "center"});
const Show: React.FC<{list: string[]; start: number; period?: number; style: React.CSSProperties}> = ({list, start, period = 45, style}) => {
  const fr = useCurrentFrame(); const t = Math.max(0, fr) / period; const i = Math.floor(t);
  const fade = interpolate(t % 1, [0.8, 1], [0, 1], {extrapolateLeft: "clamp"});
  const a = list[(start + i) % list.length], b = list[(start + i + 1) % list.length];
  return (<div style={{...style, overflow: "hidden"}}>
    <div style={{position: "absolute", inset: 0, transform: `scale(${1 + 0.05 * (t % 1)})`, ...img(a)}} />
    <div style={{position: "absolute", inset: 0, opacity: fade, ...img(b)}} />
  </div>);
};
export type CoverProps = {motion?: boolean; headline: string; sub: string; pill: string; lists: string[][]};
export const CCover: React.FC<CoverProps> = ({motion = true, headline, sub, pill, lists}) => {
  const fr = useCurrentFrame(); const {fps} = useVideoConfig();
  const fadeIn = motion ? interpolate(fr, [0, 14], [0, 1], {extrapolateRight: "clamp"}) : 1;
  const pos = [[0, 0], [250, 90], [500, 180]];
  return (<AbsoluteFill style={{background: PAPER}}>
    <style>{css}</style>
    <div style={{position: "absolute", left: 71, top: 48, ...mono(13, 1.2, 17, INK)}}>INVASI STUDIO</div>
    <div style={{position: "absolute", left: 829, top: 48, width: 180, textAlign: "right", ...mono(13, 1.2, 17, INK)}}>@INVASISTUDIO</div>
    <div style={{position: "absolute", left: 71, top: 1283, ...mono(13, 1.2, 17, INK)}}>INVASI STUDIO</div>
    <div style={{position: "absolute", left: 290, top: 1281, width: 500, textAlign: "center", ...mono(14, 0.5, 20, INK, 500)}}>www.canva.com/p/invasi-studio/</div>
    <div style={{position: "absolute", left: 829, top: 1283, width: 180, textAlign: "right", ...mono(13, 1.2, 17, INK)}}>@INVASISTUDIO</div>
    <div style={{position: "absolute", left: 0, top: 121, width: 1080, textAlign: "center", fontFamily: "ISerif", fontSize: 118, lineHeight: "102px", color: INK, whiteSpace: "pre", opacity: fadeIn}}>{headline}</div>
    <div style={{position: "absolute", left: 82, top: 380, width: 919, height: 720}}>
      {pos.map((p, i) => {
        const s = motion ? spring({frame: fr - 10 - i * 14, fps, config: {damping: 16, stiffness: 90}}) : 1;
        const drift = motion ? Math.sin((fr + i * 20) / 38) * 5 : 0;
        return <Show key={i} list={lists[i]} start={0} period={50 + i * 6} style={{position: "absolute", left: p[0], top: p[1] + (1 - s) * 140 + drift, width: 420, height: 525, boxSizing: "border-box", border: "8px solid #fff", borderRadius: 6, opacity: s}} />;
      })}
    </div>
    <div style={{position: "absolute", left: 140, top: 1144, width: 800, textAlign: "center", ...mono(24, 3, 32, INK), opacity: fadeIn}}>{sub}</div>
    <div style={{position: "absolute", left: 403, top: 1212, width: 274, height: 35, borderRadius: 18, background: INK, display: "flex", alignItems: "center", justifyContent: "center", ...mono(16, 1, 21, PAPER, 500)}}>{pill}</div>
  </AbsoluteFill>);
};
