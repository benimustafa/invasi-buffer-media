import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
const css = `
@font-face{font-family:'ISerif';src:url(${staticFile('fonts/instrument-serif-latin-400-normal.woff2')}) format('woff2')}
@font-face{font-family:'PMono';src:url(${staticFile('fonts/ibm-plex-mono-latin-400-normal.woff2')}) format('woff2');font-weight:400}
@font-face{font-family:'PMono';src:url(${staticFile('fonts/ibm-plex-mono-latin-500-normal.woff2')}) format('woff2');font-weight:600}`;
if (typeof document !== 'undefined') { const st = document.createElement('style'); st.innerHTML = css; document.head.appendChild(st); }
const serif = 'ISerif', mono = 'PMono';

type P = {bg: string; ink: string; cta?: string};
const T: React.FC<{x: number; y: number; w: number; h?: number; size: number; lh: number; ls: number; align: 'left' | 'center' | 'right'; c: string; style?: React.CSSProperties; children: React.ReactNode}> = ({x, y, w, h, size, lh, ls, align, c, style, children}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, fontSize: size, lineHeight: `${lh}px`, letterSpacing: ls, textAlign: align, color: c, whiteSpace: 'pre', ...style}}>{children}</div>
);
const Corners: React.FC<{c: string}> = ({c}) => (<>
  <T x={71} y={48} w={180} size={13} lh={17} ls={1.2} align="left" c={c} style={{fontFamily: mono}}>INVASI STUDIO</T>
  <T x={829} y={48} w={180} size={13} lh={17} ls={1.2} align="right" c={c} style={{fontFamily: mono}}>@INVASISTUDIO</T>
  <T x={71} y={1283} w={180} size={13} lh={17} ls={1.2} align="left" c={c} style={{fontFamily: mono}}>INVASI STUDIO</T>
  <T x={829} y={1283} w={180} size={13} lh={17} ls={1.2} align="right" c={c} style={{fontFamily: mono}}>@INVASISTUDIO</T>
</>);
const Pill: React.FC<{x: number; y: number; w: number; bg: string; c: string; children: string}> = ({x, y, w, bg, c, children}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: 35, borderRadius: 18, background: bg}}>
    <T x={0} y={7} w={w} size={16} lh={21} ls={1} align="center" c={c} style={{fontFamily: mono, fontWeight: 600}}>{children}</T>
  </div>
);
const Img4: React.FC<{src: string; x: number; y: number; w: number; h: number; r?: number}> = ({src, x, y, w, h, r = 0}) => (
  <Img src={staticFile(src)} style={{position: 'absolute', left: x, top: y, width: w, height: h, objectFit: 'cover', objectPosition: 'center 30%', borderRadius: r}} />
);

// Slide 1: cover (asset area 82,380 919x720 = Remotion video; JPG shows frame 1 mosaic)
export const Cover: React.FC<{p: P; title: string; summary: string; imgs: string[]}> = ({p, title, summary, imgs}) => (
  <AbsoluteFill style={{background: p.bg}}>
    <Corners c={p.ink} />
    <T x={79} y={123} w={922} h={160} size={88} lh={80} ls={0} align="center" c={p.ink} style={{fontFamily: serif}}>{title}</T>
    <div style={{position: 'absolute', left: 82, top: 380, width: 919, height: 720, overflow: 'hidden', background: '#fff'}}>
      {imgs.slice(0, 4).map((s, i) => <Img4 key={i} src={s} x={(i % 2) * 460} y={Math.floor(i / 2) * 360} w={459} h={360} />)}
    </div>
    <T x={180} y={1144} w={720} h={32} size={24} lh={32} ls={3} align="center" c={p.ink} style={{fontFamily: mono}}>{summary}</T>
    <Pill x={403} y={1212} w={274} bg={p.ink} c={p.bg}>{'EXPLORE COLLECTION  →'}</Pill>
  </AbsoluteFill>
);
// Slides 2-5: header + 12 asset grid (290x208 @ 8/314/620 x 8/232/456/680)
export const SetSlide: React.FC<{p: P; title: string; count: string; usage: string; imgs: string[]}> = ({p, title, count, usage, imgs}) => (
  <AbsoluteFill style={{background: p.bg}}>
    <Corners c={p.ink} />
    <div style={{position: 'absolute', left: 82, top: 100, width: 919, height: 200, border: `1.5px solid ${p.ink}`, boxSizing: 'border-box'}}>
      <T x={39} y={44} w={500} h={112} size={58} lh={56} ls={0} align="left" c={p.ink} style={{fontFamily: serif}}>{title}</T>
      <div style={{position: 'absolute', left: 565, top: 47, width: 316, height: 106}}>
        <div style={{position: 'absolute', left: 34, top: 0, width: 282, height: 45, background: p.ink}}>
          <T x={0} y={8} w={282} size={22} lh={29} ls={2.5} align="center" c={p.bg} style={{fontFamily: mono}}>{count}</T>
        </div>
        <T x={0} y={59} w={316} h={47} size={15} lh={23.4} ls={1.65} align="right" c={p.ink} style={{fontFamily: mono}}>{usage}</T>
      </div>
    </div>
    <div style={{position: 'absolute', left: 82, top: 332, width: 919, height: 898}}>
      {imgs.slice(0, 12).map((s, i) => <Img4 key={i} src={s} x={8 + (i % 3) * 306} y={8 + Math.floor(i / 3) * 224} w={290} h={208} r={8} />)}
    </div>
  </AbsoluteFill>
);
// Slide 6: ending, 4 reps 447x373
export const Ending: React.FC<{p: P; title: string; prompt: string; imgs: string[]}> = ({p, title, prompt, imgs}) => (
  <AbsoluteFill style={{background: p.bg}}>
    <Corners c={p.ink} />
    <T x={0} y={110} w={1080} h={176} size={96} lh={88} ls={0} align="center" c={p.ink} style={{fontFamily: serif}}>{title}</T>
    <T x={90} y={300} w={900} h={66} size={24} lh={33} ls={3} align="center" c={p.ink} style={{fontFamily: mono}}>{prompt}</T>
    <Pill x={456} y={388} w={168} bg={p.ink} c="#fff">LINK IN BIO</Pill>
    <div style={{position: 'absolute', left: 82, top: 459, width: 919, height: 771}}>
      {imgs.slice(0, 4).map((s, i) => (
        <div key={i} style={{position: 'absolute', left: (i % 2) * 472, top: Math.floor(i / 2) * 397, width: 447, height: 373, borderRadius: 8, overflow: 'hidden'}}>
          <Img4 src={s} x={0} y={0} w={447} h={373} />
          <div style={{position: 'absolute', left: 20, top: 20, width: 44, height: 44, borderRadius: 22, background: p.ink, color: p.bg, fontFamily: mono, fontWeight: 600, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);
