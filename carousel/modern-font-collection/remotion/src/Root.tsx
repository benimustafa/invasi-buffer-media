import React from 'react';
import {Still} from 'remotion';
import {Cover, SetSlide, Ending} from './Spec';
const W = 1080, H = 1350;
const dark = {bg: '#151515', ink: '#f4ebd7'};
const lite = {bg: '#f7f7e8', ink: '#2b2a14'};
const end = {bg: '#efebdf', ink: '#3b3b3d'};
const A = ['a02','a03','a04','a05','a06','a07','a08','a09','a10'].map(n => `bx/${n}.png`);
const B = ['b02','b03','b04','b05','b06','b07','b08','b09','b10'].map(n => `bx/${n}.png`);
const mix = [...A, ...B];
export const Root: React.FC = () => (<>
  <Still id="s1-cover" width={W} height={H} component={() => <Cover p={dark} title={'FIVE MONO FONTS\nBUILT ON A GRID'} summary="5 STYLES · 1 FAMILY · BOXANE MONO" imgs={[A[0], B[7], A[4], B[3]]} />} />
  <Still id="s2-set" width={W} height={H} component={() => <SetSlide p={lite} title={'BOXANE MONO\nSPECIMENS'} count="12 PREVIEWS" usage={'TECH HEADLINES, BADGES,\nSYSTEM LABELS'} imgs={mix.slice(0, 12)} />} />
  <Still id="s6-end" width={W} height={H} component={() => <Ending p={end} title={'FOUR LOOKS, ONE MONO.\nPICK YOUR PROJECT.'} prompt={'WHICH STYLE FITS YOUR TECH BRIEF?\n1, 2, 3, OR 4?'} imgs={[A[0], B[7], A[3], B[1]]} />} />
</>);
