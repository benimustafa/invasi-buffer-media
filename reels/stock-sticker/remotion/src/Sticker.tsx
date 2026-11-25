import React from "react";
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate} from "remotion";
// Video stok "sticker pop" (ref Bistro): parade 1 elemen di tengah sesuai ketukan -> kolase -> ending CTA.
const PAPER = "#efebdf", INK = "#2b2a14";
const css = `
@font-face{font-family:'Plex';font-weight:400;src:url(${staticFile("fonts/IBMPlexMono-Regular.ttf")});}
@font-face{font-family:'Plex';font-weight:500;src:url(${staticFile("fonts/IBMPlexMono-Medium.ttf")});}
@font-face{font-family:'ISerif';src:url(${staticFile("fonts/InstrumentSerif-Regular.ttf")});}`;
const mono = (size: number, ls: number, color: string, weight = 400): React.CSSProperties => ({fontFamily: "Plex, monospace", fontWeight: weight, fontSize: size, letterSpacing: ls, color, whiteSpace: "pre"});
export type StickerProps = {
  bg: string; items: string[]; name: string; meta: string;
  ctaTitle: string; ctaLines: string[]; ctaPill: string;
  beat: number; // frame per ketukan parade (8 = 0,27 dtk di 30fps ~ setengah ketukan 112 BPM)
};
// posisi kolase (x,y pusat, skala, rotasi) untuk 1080x1920
const SPOTS: [number, number, number, number][] = [
  [250, 560, 0.62, -8], [790, 520, 0.6, 7], [540, 820, 0.66, -3], [230, 1080, 0.58, 9], [830, 1040, 0.6, -10],
  [520, 1300, 0.62, 5], [210, 1500, 0.55, -6], [850, 1460, 0.56, 8], [560, 1700, 0.5, -9], [260, 1790, 0.42, 12], [830, 1780, 0.42, -12],
];
export const StickerReel: React.FC<StickerProps> = ({bg, items, name, meta, ctaTitle, ctaLines, ctaPill, beat}) => {
  const f = useCurrentFrame(); const {fps, durationInFrames} = useVideoConfig();
  const start1 = 6; const end1 = start1 + items.length * beat;            // parade
  const gap2 = Math.round(beat * 0.75); const end2 = end1 + items.length * gap2 + 10; // kolase
  const ctaIn = spring({frame: f - end2, fps, config: {damping: 15, stiffness: 110}});
  const pop = (t: number) => spring({frame: t, fps, config: {damping: 9, stiffness: 220, mass: 0.6}});
  const titleIn = interpolate(f, [0, 8], [0, 1], {extrapolateRight: "clamp"});
  return (<AbsoluteFill style={{background: INK, overflow: "hidden"}}>
    <style>{css}</style>
    <Img src={staticFile(bg)} style={{position: "absolute", inset: 0, width: 1080, height: 1920, objectFit: "cover", filter: "blur(3px)", transform: `scale(${1.04 + 0.03 * (f / durationInFrames)})`}} />
    <AbsoluteFill style={{background: "rgba(20,18,10,0.18)"}} />
    {/* parade */}
    {f >= start1 && f < end1 && (() => {
      const i = Math.floor((f - start1) / beat); const local = (f - start1) % beat; const s = pop(local);
      return <Img src={staticFile(`set/${items[i]}`)} style={{position: "absolute", left: 540, top: 960, width: 720, transform: `translate(-50%,-50%) scale(${0.55 + 0.45 * s}) rotate(${i % 2 ? 4 : -4}deg)`}} />;
    })()}
    {/* kolase */}
    {f >= end1 && items.map((it, i) => {
      const t = f - end1 - i * gap2; if (t < 0) return null;
      const [x, y, sc, r] = SPOTS[i % SPOTS.length]; const s = pop(t);
      const out = interpolate(ctaIn, [0, 1], [1, 0.82]);
      return <Img key={i} src={staticFile(`set/${it}`)} style={{position: "absolute", left: x, top: y - ctaIn * 60, width: 560 * sc, transform: `translate(-50%,-50%) scale(${s * out}) rotate(${r}deg)`, opacity: 1 - ctaIn * 0.35}} />;
    })}
    {/* nama koleksi (font template Figma) */}
    {f < end2 + 4 && <div style={{position: "absolute", left: 60, right: 60, top: 120, textAlign: "center", opacity: titleIn}}>
      <div style={{display: "inline-block", background: PAPER, borderRadius: 10, padding: "18px 34px 10px", boxShadow: "0 8px 24px rgba(0,0,0,.25)"}}>
        <div style={{fontFamily: "ISerif", fontSize: 92, lineHeight: "84px", color: INK, whiteSpace: "pre"}}>{name}</div>
        <div style={{...mono(22, 3, INK), marginTop: 10}}>{meta}</div>
      </div>
    </div>}
    {/* ending CTA */}
    {f >= end2 && <div style={{position: "absolute", left: 70, right: 70, top: 1920 - ctaIn * 1060, height: 900, background: PAPER, borderRadius: 18, boxShadow: "0 -10px 40px rgba(0,0,0,.3)", textAlign: "center"}}>
      <div style={{...mono(18, 2, INK), marginTop: 40}}>INVASI STUDIO · @INVASISTUDIO</div>
      <div style={{fontFamily: "ISerif", fontSize: 104, lineHeight: "96px", color: INK, marginTop: 40, whiteSpace: "pre"}}>{ctaTitle}</div>
      <div style={{marginTop: 46}}>{ctaLines.map((l, i) => <div key={i} style={{...mono(28, 1.5, INK), lineHeight: "44px"}}>{l}</div>)}</div>
      <div style={{display: "inline-block", marginTop: 48, background: INK, color: PAPER, borderRadius: 30, padding: "16px 40px", ...mono(26, 2, PAPER, 500)}}>{ctaPill}</div>
    </div>}
  </AbsoluteFill>);
};
export const lengthFor = (n: number, beat: number) => 6 + n * beat + n * Math.round(beat * 0.75) + 10 + 75;
