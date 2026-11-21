import React from "react";
import {AbsoluteFill, Img, staticFile, useCurrentFrame, spring, interpolate, useVideoConfig} from "remotion";

const PAPER = "#efebdf";
const INK = "#2b2a14";
const CREAM = "#f4ebd7";
const DARK = "#0b0b0d";

const fontCss = `
@font-face{font-family:'Plex';font-weight:400;src:url(${staticFile("fonts/ibm-plex-mono-latin-400-normal.woff2")}) format('woff2');}
@font-face{font-family:'Plex';font-weight:500;src:url(${staticFile("fonts/ibm-plex-mono-latin-500-normal.woff2")}) format('woff2');}
`;

const mono = (size: number, ls: number, lh: number, color: string, weight = 400): React.CSSProperties => ({
  fontFamily: "Plex, monospace", fontWeight: weight, fontSize: size, letterSpacing: ls, lineHeight: `${lh}px`, color, whiteSpace: "pre",
});

const Corners: React.FC<{color: string}> = ({color}) => (
  <>
    <div style={{position: "absolute", left: 71, top: 48, ...mono(13, 1.2, 17, color)}}>INVASI STUDIO</div>
    <div style={{position: "absolute", left: 829, top: 48, width: 180, textAlign: "right", ...mono(13, 1.2, 17, color)}}>@INVASISTUDIO</div>
    <div style={{position: "absolute", left: 71, top: 1283, ...mono(13, 1.2, 17, color)}}>INVASI STUDIO</div>
    <div style={{position: "absolute", left: 340, top: 1281, width: 400, textAlign: "center", ...mono(15, 1.6, 20, color, 500)}}>WWW.INVASITYPEWORK.COM</div>
    <div style={{position: "absolute", left: 829, top: 1283, width: 180, textAlign: "right", ...mono(13, 1.2, 17, color)}}>@INVASISTUDIO</div>
  </>
);

const Texture: React.FC<{dark?: boolean}> = ({dark}) => (
  <Img src={staticFile(dark ? "ts/texD.jpg" : "ts/texL.jpg")} style={{position: "absolute", inset: 0, width: 1080, height: 1350, mixBlendMode: dark ? "screen" : "multiply", opacity: dark ? 0.45 : 0.4}} />
);

const Pill: React.FC<{x: number; y: number; w: number; label: string; bg: string; fg: string}> = ({x, y, w, label, bg, fg}) => (
  <div style={{position: "absolute", left: x, top: y, width: w, height: 35, borderRadius: 18, background: bg, display: "flex", alignItems: "center", justifyContent: "center", ...mono(16, 1, 21, fg, 500)}}>{label}</div>
);

const ALL = ["p01.jpg", "p02.jpg", "p03.jpg", "p04.jpg", "p05.jpg"];
const Show: React.FC<{start: number; period?: number; style: React.CSSProperties}> = ({start, period = 45, style}) => {
  const f = useCurrentFrame();
  const t = Math.max(0, f) / period;
  const i = Math.floor(t) % ALL.length;
  const fade = interpolate(t % 1, [0.8, 1], [0, 1], {extrapolateLeft: "clamp"});
  const a = ALL[(start + i) % ALL.length], b = ALL[(start + i + 1) % ALL.length];
  const zoom = 1 + 0.06 * (t % 1);
  return (
    <div style={{...style, overflow: "hidden"}}>
      <div style={{position: "absolute", inset: 0, transform: `scale(${zoom})`, ...photo(a)}} />
      <div style={{position: "absolute", inset: 0, opacity: fade, ...photo(b)}} />
    </div>
  );
};

const photo = (n: string): React.CSSProperties => ({backgroundImage: `url(${staticFile(`ts/${n}`)})`, backgroundSize: "cover", backgroundPosition: "center"});

// ---------- COVER (slide 1) ----------
export const TCover: React.FC<{motion?: boolean}> = ({motion}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pos = [[0, 0], [359, 173], [60, 347]];
  const imgs = ["p01.jpg", "p02.jpg", "p03.jpg"];
  const fadeIn = motion ? interpolate(f, [0, 14], [0, 1], {extrapolateRight: "clamp"}) : 1;
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <style>{fontCss}</style>
      <Corners color={INK} />
      <Img src={staticFile("ts/title-cover.png")} style={{position: "absolute", left: 79, top: 123, width: 922, height: 192, opacity: fadeIn}} />
      <div style={{position: "absolute", left: 82, top: 380, width: 919, height: 720}}>
        {imgs.map((im, i) => {
          const s = motion ? spring({frame: f - 10 - i * 14, fps, config: {damping: 16, stiffness: 90}}) : 1;
          const drift = motion ? Math.sin((f + i * 20) / 38) * 5 : 0;
          return (
            motion ? <Show key={im} start={i * 2} period={48} style={{position: "absolute", left: pos[i][0], top: pos[i][1] + (1 - s) * 140 + drift, width: 560, height: 373, boxSizing: "border-box", border: "8px solid #fff", opacity: s}} /> :
            <div key={im} style={{position: "absolute", left: pos[i][0], top: pos[i][1], width: 560, height: 373, boxSizing: "border-box", border: "8px solid #fff", ...photo(im)}} />
          );
        })}
      </div>
      <div style={{position: "absolute", left: 180, top: 1144, width: 720, textAlign: "center", ...mono(24, 3, 32, INK), opacity: fadeIn}}>FIVE FONTS. ONE COFFEE SHOP MOOD</div>
      <Pill x={403} y={1212} w={274} label={"EXPLORE COLLECTION  →"} bg={INK} fg={PAPER} />
      <Texture />
    </AbsoluteFill>
  );
};

// ---------- FONT SLIDE (slide 2) ----------
export const TFont: React.FC = () => (
  <AbsoluteFill style={{background: DARK}}>
    <style>{fontCss}</style>
    <Corners color={CREAM} />
    <div style={{position: "absolute", left: 82, top: 100, width: 919, height: 200, background: "#fff", borderTopLeftRadius: 28, borderTopRightRadius: 28}}>
      <div style={{position: "absolute", left: 38.5, top: 26, ...mono(13, 1.2, 17, "#111")}}>BREWLOGIC</div>
      <Img src={staticFile("ts/pangram-brew.png")} style={{position: "absolute", left: 37, top: 70, width: 500, height: 60}} />
      <div style={{position: "absolute", left: 564.5 + 34, top: 47, width: 282, height: 45, background: "#111", display: "flex", alignItems: "center", paddingLeft: 20, ...mono(22, 2, 29, "#fff")}}>ORGANIC SERIF</div>
      <div style={{position: "absolute", left: 564.5, top: 106, width: 316, textAlign: "right", ...mono(15, 1.65, 23.4, "#111")}}>{"COFFEE BAG TAGS, ROASTERY\nPACKAGING, MENU BOARDS"}</div>
    </div>
    <div style={{position: "absolute", left: 82, top: 332, width: 919, height: 898, overflow: "hidden", borderBottomLeftRadius: 28, borderBottomRightRadius: 28}}>
      <div style={{position: "absolute", left: 0, top: 0, width: 919, height: 560, ...photo("p01.jpg")}} />
      <div style={{position: "absolute", left: 0, top: 568, width: 455.5, height: 330, ...photo("p02.jpg")}} />
      <div style={{position: "absolute", left: 463.5, top: 568, width: 455.5, height: 330, ...photo("p03.jpg")}} />
    </div>
    <Texture dark />
  </AbsoluteFill>
);

// ---------- BACK COVER (slide 7) ----------
export const TBack: React.FC<{motion?: boolean}> = ({motion}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = (d: number) => (motion ? spring({frame: f - d, fps, config: {damping: 14, stiffness: 100}}) : 1);
  const sw = (919 - 36) / 4;
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <style>{fontCss}</style>
      <Corners color={INK} />
      <Img src={staticFile("ts/title-30off.png")} style={{position: "absolute", left: 60, top: 118, width: 960, height: 169, opacity: sp(0), transform: `scale(${0.8 + 0.2 * sp(0)})`}} />
      <Img src={staticFile("ts/prompt-back.png")} style={{position: "absolute", left: 90, top: 310, width: 900, height: 60, opacity: sp(12)}} />
      <Pill x={290} y={400 + (1 - sp(22)) * 30} w={500} label="USE CODE INVASI30 AT CHECKOUT" bg={INK} fg={PAPER} />
      <div style={{position: "absolute", left: 82, top: 459, width: 919, height: 771}}>
        {motion ? <Show start={3} period={50} style={{position: "absolute", left: 0, top: 0, width: 919, height: 580}} /> : <div style={{position: "absolute", left: 0, top: 0, width: 919, height: 580, ...photo("p04.jpg")}} />}
        {["p05.jpg", "p02.jpg", "p03.jpg", "p01.jpg"].map((p, i) => (
          <div key={p} style={{position: "absolute", left: i * (sw + 12), top: 592 + (1 - sp(30 + i * 6)) * 60, width: sw, height: 179, opacity: sp(30 + i * 6), ...photo(p)}} />
        ))}
      </div>
      <Texture />
    </AbsoluteFill>
  );
};
