import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
const css = `
@font-face{font-family:'ISerif';src:url(${staticFile('fonts/instrument-serif-latin-400-normal.woff2')}) format('woff2');font-style:normal}
@font-face{font-family:'ISerif';src:url(${staticFile('fonts/instrument-serif-latin-400-italic.woff2')}) format('woff2');font-style:italic}
@font-face{font-family:'PMono';src:url(${staticFile('fonts/ibm-plex-mono-latin-400-normal.woff2')}) format('woff2');font-weight:400}
@font-face{font-family:'PMono';src:url(${staticFile('fonts/ibm-plex-mono-latin-500-normal.woff2')}) format('woff2');font-weight:500}
@font-face{font-family:'ABlack';src:url(${staticFile('fonts/archivo-black-latin-400-normal.woff2')}) format('woff2')}`;
if (typeof document !== 'undefined') {
  const st = document.createElement('style'); st.innerHTML = css; document.head.appendChild(st);
}
const serif = 'ISerif', mono = 'PMono', black = 'ABlack';

const Label: React.FC<{c: string}> = ({c}) => (
  <>
    <div style={{position: 'absolute', top: 56, left: 71, fontFamily: mono, fontSize: 15, letterSpacing: 3, color: c}}>INVASI STUDIO</div>
    <div style={{position: 'absolute', top: 56, right: 71, fontFamily: mono, fontSize: 15, letterSpacing: 3, color: c}}>@INVASISTUDIO</div>
  </>
);
const Foot: React.FC<{c: string; r?: string}> = ({c, r = '@INVASISTUDIO'}) => (
  <>
    <div style={{position: 'absolute', bottom: 40, left: 71, fontFamily: mono, fontSize: 15, letterSpacing: 3, color: c}}>INVASI STUDIO</div>
    <div style={{position: 'absolute', bottom: 40, right: 71, fontFamily: mono, fontSize: 15, letterSpacing: 3, color: c}}>{r}</div>
  </>
);
const Thumb: React.FC<{src: string; x: number; y: number; w: number; rot?: number; border?: string}> = ({src, x, y, w, rot = 0, border = '#fff'}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, transform: `rotate(${rot}deg)`, background: border, padding: 8, boxShadow: '0 14px 30px rgba(0,0,0,.25)'}}>
    <Img src={staticFile(src)} style={{width: '100%', display: 'block'}} />
  </div>
);

// ---------- CANVA COLLECTION ----------
export const CanvaCover: React.FC = () => (
  <AbsoluteFill style={{background: '#151515', overflow: 'hidden'}}>
    <Label c="#a8a29a" />
    <div style={{position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center', fontFamily: serif, color: '#f3ead7', fontSize: 150, lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: -2}}>
      Retro sale<br />templates
    </div>
    <div style={{position: 'absolute', top: 470, left: 0, right: 0, textAlign: 'center', fontFamily: mono, color: '#f3ead7', fontSize: 26, letterSpacing: 5}}>
      FOR CANVA · 30 EDITABLE POSTS
    </div>
    <Thumb src="canva/t2.jpg" x={70} y={600} w={470} rot={-4} />
    <Thumb src="canva/t3.jpg" x={560} y={640} w={470} rot={3} />
    <Thumb src="canva/t1.jpg" x={300} y={830} w={500} rot={-1} />
    <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 150, background: 'linear-gradient(transparent,#151515 70%)'}} />
    <Foot c="#a8a29a" r="SWIPE →" />
  </AbsoluteFill>
);
export const CanvaBack: React.FC = () => (
  <AbsoluteFill style={{background: '#ede9dd'}}>
    <Label c="#7b766b" />
    <div style={{position: 'absolute', top: 120, left: 80, right: 80, textAlign: 'center', fontFamily: serif, color: '#2d2b28', fontSize: 104, lineHeight: 0.95, textTransform: 'uppercase'}}>
      Three looks.<br />One brief.
    </div>
    <div style={{position: 'absolute', top: 400, left: 0, right: 0, textAlign: 'center', fontFamily: mono, color: '#2d2b28', fontSize: 26, letterSpacing: 4}}>
      WHICH ONE FITS YOUR SALE? 1, 2, OR 3?
    </div>
    {[['canva/t1.jpg', 1], ['canva/t2.jpg', 2], ['canva/t3.jpg', 3]].map(([s, n], i) => (
      <div key={i} style={{position: 'absolute', left: 60 + i * 322, top: 520, width: 300}}>
        <Img src={staticFile(s as string)} style={{width: '100%', display: 'block', borderRadius: 6}} />
        <div style={{position: 'absolute', top: -16, left: -16, width: 46, height: 46, borderRadius: 23, background: '#2d2b28', color: '#fff', fontFamily: mono, fontWeight: 500, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{n}</div>
      </div>
    ))}
    <div style={{position: 'absolute', top: 940, left: 0, right: 0, textAlign: 'center'}}>
      <span style={{display: 'inline-block', background: '#2d2b28', color: '#fff', fontFamily: mono, fontWeight: 500, fontSize: 28, letterSpacing: 3, padding: '18px 40px', borderRadius: 40}}>EDIT IN CANVA · LINK IN BIO</span>
    </div>
    <div style={{position: 'absolute', top: 1110, left: 0, right: 0, textAlign: 'center', fontFamily: mono, color: '#7b766b', fontSize: 22, letterSpacing: 3}}>
      SAVE THIS POST · FULL SET ON CANVA
    </div>
    <Foot c="#7b766b" />
  </AbsoluteFill>
);

// ---------- FONT COLLECTION ----------
export const FontCover: React.FC = () => (
  <AbsoluteFill style={{background: '#e9e4d8', overflow: 'hidden'}}>
    <div style={{position: 'absolute', top: 100, left: 0, right: 0, textAlign: 'center', fontFamily: mono, fontSize: 22, letterSpacing: 4, color: '#2b2a1c'}}>WWW.INVASITYPEWORK.COM</div>
    <div style={{position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center', fontFamily: black, color: '#2b2a1c', fontSize: 128, lineHeight: 0.95, whiteSpace: 'nowrap', textTransform: 'uppercase'}}>
      Mono &amp; Tech
    </div>
    <div style={{position: 'absolute', top: 360, left: 0, right: 0, textAlign: 'center', fontFamily: serif, fontStyle: 'italic', color: '#2b2a1c', fontSize: 190, lineHeight: 1}}>Collection</div>
    <div style={{position: 'absolute', top: 640, left: 0, right: 0, textAlign: 'center', fontFamily: mono, fontSize: 28, letterSpacing: 4, color: '#2b2a1c'}}>FIVE STYLES. BUILT ON A GRID.</div>
    <Thumb src="font/f1.png" x={60} y={850} w={400} rot={-3} />
    <Thumb src="font/f2.png" x={600} y={820} w={420} rot={3} />
    <Thumb src="font/f3.png" x={330} y={1000} w={420} rot={-1} />
    <div style={{position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center', fontFamily: mono, fontSize: 20, letterSpacing: 4, color: '#2b2a1c', background: '#e9e4d8', padding: '12px 0'}}>PICK YOUR PROJECT COLLECTION</div>
  </AbsoluteFill>
);
export const FontBack: React.FC = () => (
  <AbsoluteFill style={{background: '#0b0b0e', overflow: 'hidden'}}>
    <Label c="#8a8a90" />
    <div style={{position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center', fontFamily: black, color: '#ffd24d', fontSize: 330, lineHeight: 0.9}}>30%</div>
    <div style={{position: 'absolute', top: 500, left: 0, right: 0, textAlign: 'center', fontFamily: black, color: '#ffd24d', fontSize: 330, lineHeight: 0.9}}>OFF</div>
    <div style={{position: 'absolute', top: 840, left: 0, right: 0, textAlign: 'center', fontFamily: serif, fontStyle: 'italic', color: '#ffd24d', fontSize: 70, lineHeight: 1.05}}>All fonts. All styles.<br />One code.</div>
    <div style={{position: 'absolute', top: 1060, left: 0, right: 0, textAlign: 'center', fontFamily: mono, fontSize: 32, color: '#ffd24d'}}>
      Use code <span style={{background: '#ffd24d', color: '#0b0b0e', padding: '2px 10px'}}>INVASI30</span> at checkout
    </div>
    <Foot c="#8a8a90" r="WWW.INVASITYPEWORK.COM" />
  </AbsoluteFill>
);
