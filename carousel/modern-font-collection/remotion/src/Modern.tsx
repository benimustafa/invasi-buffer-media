import React from "react";
import {AbsoluteFill, Img, staticFile, useCurrentFrame, spring, interpolate, useVideoConfig} from "remotion";

const PAPER = "#efebdf", INK = "#2b2a14", CREAM = "#f4ebd7", DARK = "#0b0b0d";
const SITE = "WWW.INVASITYPEWORK.COM";
const f = (p: string) => staticFile(`mod/${p}`);
const fontCss = `
@font-face{font-family:'Plex';font-weight:400;src:url(${staticFile("fonts/ibm-plex-mono-latin-400-normal.woff2")}) format('woff2');}
@font-face{font-family:'Plex';font-weight:500;src:url(${staticFile("fonts/ibm-plex-mono-latin-500-normal.woff2")}) format('woff2');}`;
const mono = (size: number, ls: number, lh: number, color: string, weight = 400): React.CSSProperties => ({
  fontFamily: "Plex, monospace", fontWeight: weight, fontSize: size, letterSpacing: ls, lineHeight: `${lh}px`, color, whiteSpace: "pre",
});
const photo = (n: string): React.CSSProperties => ({backgroundImage: `url(${f(n)})`, backgroundSize: "cover", backgroundPosition: "center"});

const Corners: React.FC<{color: string}> = ({color}) => (
  <>
    <div style={{position: "absolute", left: 71, top: 48, ...mono(13, 1.2, 17, color)}}>INVASI STUDIO</div>
    <div style={{position: "absolute", left: 829, top: 48, width: 180, textAlign: "right", ...mono(13, 1.2, 17, color)}}>@INVASISTUDIO</div>
    <div style={{position: "absolute", left: 71, top: 1283, ...mono(13, 1.2, 17, color)}}>INVASI STUDIO</div>
    <div style={{position: "absolute", left: 340, top: 1281, width: 400, textAlign: "center", ...mono(15, 1.6, 20, color, 500)}}>{SITE}</div>
    <div style={{position: "absolute", left: 829, top: 1283, width: 180, textAlign: "right", ...mono(13, 1.2, 17, color)}}>@INVASISTUDIO</div>
  </>
);
const Texture: React.FC<{dark?: boolean}> = ({dark}) => (
  <Img src={f(dark ? "texD.jpg" : "texL.jpg")} style={{position: "absolute", inset: 0, width: 1080, height: 1350, mixBlendMode: dark ? "screen" : "multiply", opacity: dark ? 0.45 : 0.4}} />
);
const Pill: React.FC<{x: number; y: number; w: number; label: string}> = ({x, y, w, label}) => (
  <div style={{position: "absolute", left: x, top: y, width: w, height: 35, borderRadius: 18, background: INK, display: "flex", alignItems: "center", justifyContent: "center", ...mono(16, 1, 21, PAPER, 500)}}>{label}</div>
);

// slideshow cycling through a list of images, crossfade + slow zoom
const Show: React.FC<{list: string[]; start: number; period?: number; style: React.CSSProperties}> = ({list, start, period = 45, style}) => {
  const fr = useCurrentFrame();
  const t = Math.max(0, fr) / period;
  const i = Math.floor(t);
  const fade = interpolate(t % 1, [0.8, 1], [0, 1], {extrapolateLeft: "clamp"});
  const a = list[(start + i) % list.length], b = list[(start + i + 1) % list.length];
  return (
    <div style={{...style, overflow: "hidden"}}>
      <div style={{position: "absolute", inset: 0, transform: `scale(${1 + 0.06 * (t % 1)})`, ...photo(a)}} />
      <div style={{position: "absolute", inset: 0, opacity: fade, ...photo(b)}} />
    </div>
  );
};

const MIX = ["sq1.jpg", "sk1.jpg", "hx1.jpg", "kw1.jpg", "br1.jpg", "bx1.jpg"];
const MIX2 = ["sk2.jpg", "bx2.jpg", "kw2.jpg", "sq3.jpg", "hx3.jpg", "br3.jpg"];

// ---------- COVER (motion) ----------
export const MCover: React.FC<{motion?: boolean}> = ({motion = true}) => {
  const fr = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pos = [[0, 0], [359, 173], [60, 347]];
  const fadeIn = motion ? interpolate(fr, [0, 14], [0, 1], {extrapolateRight: "clamp"}) : 1;
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <style>{fontCss}</style>
      <Corners color={INK} />
      <Img src={f("t_cover.png")} style={{position: "absolute", left: 79, top: 123, width: 922, height: 192, opacity: fadeIn}} />
      <div style={{position: "absolute", left: 82, top: 380, width: 919, height: 720}}>
        {pos.map((p, i) => {
          const s = motion ? spring({frame: fr - 10 - i * 14, fps, config: {damping: 16, stiffness: 90}}) : 1;
          const drift = motion ? Math.sin((fr + i * 20) / 38) * 5 : 0;
          return <Show key={i} list={MIX} start={i * 2} period={48} style={{position: "absolute", left: p[0], top: p[1] + (1 - s) * 140 + drift, width: 560, height: 373, boxSizing: "border-box", border: "8px solid #fff", opacity: s}} />;
        })}
      </div>
      <div style={{position: "absolute", left: 140, top: 1144, width: 800, textAlign: "center", ...mono(24, 3, 32, INK), opacity: fadeIn}}>BOXANE MONO JOINS FIVE DISPLAY FONTS</div>
      <Pill x={403} y={1212} w={274} label={"EXPLORE COLLECTION  →"} />
      <Texture />
    </AbsoluteFill>
  );
};

// ---------- FONT SLIDES ----------
type FontDef = {name: string; chip: string; usage: string; txt: string; w: number; h: number; imgs: string[]; isNew?: boolean};
export const FONTS: FontDef[] = [
  {name: "BOXANE MONO", chip: "NEW · MONO", usage: "UI, POSTERS, DATA TABLES,\nPACKAGING LABELS", txt: "t_bx.png", w: 490, h: 31, imgs: ["bx1.jpg", "bx2.jpg", "bx3.jpg"]},
  {name: "SQUIDE", chip: "LIQUID DISPLAY", usage: "HEADLINES, LOGOS,\nPOSTERS", txt: "t_sq.png", w: 302, h: 54, imgs: ["sq1.jpg", "sq2.jpg", "sq3.jpg"]},
  {name: "SIRKLE", chip: "SEMI-SERIF DISPLAY", usage: "LOGOTYPES, SIGNAGE,\nPOSTERS, PACKAGING", txt: "t_sk.png", w: 484, h: 68, imgs: ["sk1.jpg", "sk2.jpg", "sk3.jpg"]},
  {name: "HEXAGREAT", chip: "SPORT DISPLAY", usage: "ATHLETIC BRANDS, TEAM MERCH,\nENERGY DRINK PACKAGING", txt: "t_hx.png", w: 225, h: 50, imgs: ["hx1.jpg", "hx2.jpg", "hx3.jpg"]},
  {name: "KHEWS", chip: "BUBBLE GRAFFITI", usage: "POSTERS, FLYERS,\nLOGOS", txt: "t_kw.png", w: 346, h: 50, imgs: ["kw1.jpg", "kw2.jpg", "kw3.jpg"]},
  {name: "BRIGHTEST", chip: "BRUSH SCRIPT", usage: "HEADLINES, FLYERS,\nGREETING CARDS", txt: "t_br.png", w: 278, h: 73, imgs: ["br1.jpg", "br2.jpg", "br3.jpg"]},
];
export const MFont: React.FC<{i: number}> = ({i}) => {
  const d = FONTS[i];
  return (
    <AbsoluteFill style={{background: DARK}}>
      <style>{fontCss}</style>
      <Corners color={CREAM} />
      <div style={{position: "absolute", left: 82, top: 100, width: 919, height: 200, background: "#fff", borderTopLeftRadius: 28, borderTopRightRadius: 28}}>
        <div style={{position: "absolute", left: 38.5, top: 26, ...mono(13, 1.2, 17, "#111")}}>{d.name}</div>
        <Img src={f(d.txt)} style={{position: "absolute", left: 37, top: 110 - d.h / 2, width: d.w, height: d.h}} />
        <div style={{position: "absolute", right: 38.5, top: 47, height: 45, background: "#111", display: "flex", alignItems: "center", padding: "0 20px", ...mono(20, 2, 27, "#fff")}}>{d.chip}</div>
        <div style={{position: "absolute", right: 38.5, top: 106, textAlign: "right", ...mono(15, 1.65, 23.4, "#111")}}>{d.usage}</div>
      </div>
      <div style={{position: "absolute", left: 82, top: 332, width: 919, height: 898, overflow: "hidden", borderBottomLeftRadius: 28, borderBottomRightRadius: 28}}>
        <div style={{position: "absolute", left: 0, top: 0, width: 919, height: 560, ...photo(d.imgs[0])}} />
        <div style={{position: "absolute", left: 0, top: 568, width: 455.5, height: 330, ...photo(d.imgs[1])}} />
        <div style={{position: "absolute", left: 463.5, top: 568, width: 455.5, height: 330, ...photo(d.imgs[2])}} />
      </div>
      <Texture dark />
    </AbsoluteFill>
  );
};

// ---------- BACK (motion) ----------
export const MBack: React.FC<{motion?: boolean}> = ({motion = true}) => {
  const fr = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = (d: number) => (motion ? spring({frame: fr - d, fps, config: {damping: 14, stiffness: 100}}) : 1);
  const sw = (919 - 36) / 4;
  const th = ["sq2.jpg", "sk2.jpg", "kw2.jpg", "hx2.jpg"];
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <style>{fontCss}</style>
      <Corners color={INK} />
      <Img src={f("t_30.png")} style={{position: "absolute", left: 242, top: 96, width: 596, height: 220, opacity: sp(0), transform: `scale(${0.8 + 0.2 * sp(0)})`}} />
      <Img src={f("t_prompt.png")} style={{position: "absolute", left: 168, top: 326, width: 743, height: 64, opacity: sp(12)}} />
      <Pill x={290} y={404 + (1 - sp(22)) * 30} w={500} label="USE CODE INVASI30 AT CHECKOUT" />
      <div style={{position: "absolute", left: 82, top: 459, width: 919, height: 771}}>
        <Show list={MIX2} start={0} period={50} style={{position: "absolute", left: 0, top: 0, width: 919, height: 580}} />
        {th.map((p, k) => (
          <div key={p} style={{position: "absolute", left: k * (sw + 12), top: 592 + (1 - sp(30 + k * 6)) * 60, width: sw, height: 179, opacity: sp(30 + k * 6), ...photo(p)}} />
        ))}
      </div>
      <Texture />
    </AbsoluteFill>
  );
};
