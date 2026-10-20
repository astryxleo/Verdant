import React,{useEffect,useState} from 'react';

const emerald='#20d6a0';
const gold='#f6d76b';
const ink='#080a0b';

function ArrowShape(){
 return <svg className="verdant-cursor-art" width="30" height="38" viewBox="0 0 54 68" aria-hidden="true">
  <path d="M3 3 L49 43 L29 43 L40 63 L30 67 L20 47 L8 61 Z" fill={ink} stroke={ink} strokeWidth="6" strokeLinejoin="round"/>
  <path d="M3 3 L49 43 L29 43 L40 63 L30 67 L20 47 L8 61 Z" fill="#f5f4df" stroke={gold} strokeWidth="2.6" strokeLinejoin="round"/>
  <path d="M7 8 L40 39 L26 39 L16 45 Z" fill={emerald} stroke="#111816" strokeWidth="1.8" strokeLinejoin="round"/>
  <path d="M10 12 L24 35 L16 43 L9 51 Z" fill="#8fffe0" stroke="#e9fff7" strokeWidth="1.3" strokeLinejoin="round"/>
  <path d="M29 45 L35 45 L43 60 L36 63 Z" fill={emerald} stroke="#17201c" strokeWidth="1.5" strokeLinejoin="round"/>
  <path d="M4 4 L14 12 L10 24 Z" fill="#fff5b5"/>
 </svg>
}
function HandShape(){
 return <svg className="verdant-cursor-art" width="32" height="39" viewBox="0 0 58 70" aria-hidden="true">
  <path d="M8 35 Q5 31 8 27 Q12 24 16 29 L20 34 L20 10 Q20 4 25 4 Q30 4 30 10 L30 27 L31 8 Q32 3 37 4 Q42 5 41 11 L40 28 L43 14 Q45 9 49 11 Q53 13 51 19 L48 35 L51 31 Q55 28 57 33 Q59 37 55 43 L47 57 Q43 64 34 65 L25 65 Q17 64 13 56 Z" transform="translate(-2 1)" fill={ink} stroke={ink} strokeWidth="6" strokeLinejoin="round"/>
  <path d="M8 35 Q5 31 8 27 Q12 24 16 29 L20 34 L20 10 Q20 4 25 4 Q30 4 30 10 L30 27 L31 8 Q32 3 37 4 Q42 5 41 11 L40 28 L43 14 Q45 9 49 11 Q53 13 51 19 L48 35 L51 31 Q55 28 57 33 Q59 37 55 43 L47 57 Q43 64 34 65 L25 65 Q17 64 13 56 Z" transform="translate(-2 1)" fill="#f5f4df" stroke={gold} strokeWidth="2.3" strokeLinejoin="round"/>
  <path d="M22 11 L22 36 L28 38 L28 10 Q27 6 25 6 Q22 7 22 11Z" fill={emerald} stroke="#16221c" strokeWidth="1.5"/>
  <path d="M33 11 L32 35 L39 36 L39 12 Q39 7 36 7 Q33 7 33 11Z" fill={emerald} stroke="#16221c" strokeWidth="1.5"/>
  <path d="M44 17 L42 37 L48 38 L50 19 Q50 15 47 14 Q44 14 44 17Z" fill="#82f6d4" stroke="#16221c" strokeWidth="1.5"/>
  <path d="M10 33 L20 43 L18 53 L14 49 Z" fill="#baffed" stroke="#16221c" strokeWidth="1.5"/>
  <path d="M24 42 L31 42 L38 59 L30 61 Z" fill={emerald} stroke="#16221c" strokeWidth="1.5"/>
 </svg>
}
export default function VerdantCursor(){
 const [point,setPoint]=useState({x:-100,y:-100});
 const [interactive,setInteractive]=useState(false);
 const [visible,setVisible]=useState(false);
 useEffect(()=>{
  const move=e=>{setPoint({x:e.clientX,y:e.clientY});setVisible(true);const el=e.target instanceof Element?e.target:null;setInteractive(!!el?.closest('a,button,[role="button"],input[type="button"],input[type="submit"],select,label[for],summary,[data-cursor="pointer"]'))};
  const leave=()=>setVisible(false);
  const enter=()=>setVisible(true);
  window.addEventListener('pointermove',move,{passive:true});
  document.addEventListener('mouseleave',leave);
  document.addEventListener('mouseenter',enter);
  return()=>{window.removeEventListener('pointermove',move);document.removeEventListener('mouseleave',leave);document.removeEventListener('mouseenter',enter)};
 },[]);
 useEffect(()=>{
  const old=document.body.classList.contains('verdant-custom-cursor');
  document.body.classList.add('verdant-custom-cursor');
  return()=>{if(!old)document.body.classList.remove('verdant-custom-cursor')};
 },[]);
 return <div className={'verdant-cursor '+(interactive?'is-pointer':'is-arrow')+(visible?' is-visible':'')} style={{left:point.x,top:point.y}} aria-hidden="true">{interactive?<HandShape/>:<ArrowShape/>}</div>;
}
