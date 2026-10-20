import React,{useRef,useState} from 'react';
import {LayoutDashboard,CreditCard,CalendarDays,Target,Repeat,ChartNoAxesCombined} from 'lucide-react';

const items=[
 {label:'Overview',id:'overview',Icon:LayoutDashboard},
 {label:'Transactions',id:'transactions',Icon:CreditCard},
 {label:'Calendar',id:'calendar',Icon:CalendarDays},
 {label:'Budgets',id:'budgets',Icon:Target},
 {label:'Recurring',id:'recurring',Icon:Repeat},
 {label:'Insights',id:'reports',Icon:ChartNoAxesCombined}
];
const step=360/items.length;
export default function OrbitNav({transactionCount=0,activeTab='overview',onNavigate=()=>{}}){
 const [rotation,setRotation]=useState(0);
 const [dragging,setDragging]=useState(false);
 const drag=useRef(null);
 const wheel=useRef(null);
 function angleAt(e){
  const r=wheel.current.getBoundingClientRect();
  return Math.atan2(e.clientY-(r.top+r.height/2),e.clientX-(r.left+r.width/2))*180/Math.PI;
 }
 function start(e){
  if(e.button!==undefined&&e.button!==0)return;
  e.preventDefault();
  drag.current={pointer:e.pointerId,startAngle:angleAt(e),startRotation:rotation,moved:false};
  setDragging(true);
  e.currentTarget.setPointerCapture?.(e.pointerId);
 }
 function move(e){
  if(!drag.current)return;
  const delta=angleAt(e)-drag.current.startAngle;
  if(Math.abs(delta)>3)drag.current.moved=true;
  setRotation(drag.current.startRotation+delta);
 }
 function end(){
  if(!drag.current)return;
  const moved=drag.current.moved;
  drag.current=null;setDragging(false);
  if(moved){
   setRotation(v=>{const snap=Math.round(v/step)*step;const idx=((Math.round(-snap/step)%items.length)+items.length)%items.length;onNavigate(items[idx].id);return snap});
  }
 }
 function choose(item,index){
  const snap=-index*step;
  setRotation(snap);
  onNavigate(item.id);
 }
 return <nav className="orbit-nav" aria-label="Main navigation">
  <div className="orbit-heading"><span className="orbit-live"/> NAVIGATION <small>GRAB & ROTATE</small></div>
  <div className={'orbit-stage '+(dragging?'is-dragging':'')} ref={wheel} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
   <div className="orbit-half-track" style={{transform:`rotate(${rotation}deg)`}}/>
   <div className="orbit-pivot"><span>V</span><small>VERDANT</small><i>FINANCE OS</i><em>⟲</em></div>
   {items.map((item,index)=>{
    const angle=(-90+index*step+rotation)*Math.PI/180;
    const x=119+91*Math.cos(angle);
    const y=145+91*Math.sin(angle);
    const Icon=item.Icon;
    const selected=activeTab===item.id;
    return <button key={item.id} type="button" className={'orbit-node '+(selected?'selected':'')} style={{left:x,top:y}} onClick={e=>{e.stopPropagation();choose(item,index)}} onPointerDown={e=>e.stopPropagation()} aria-label={'Open '+item.label} aria-current={selected?'page':undefined} title={item.label}>
      <span className="orbit-icon"><Icon size={17}/></span>
      <span className="orbit-label">{item.label}{item.id==='transactions'&&transactionCount>0?<b>{transactionCount}</b>:null}</span>
    </button>
   })}
   <div className="orbit-right-marker"><span/> OPEN</div>
  </div>
  <div className="orbit-hint"><span>✦</span> Rotate the ring · right-side item opens</div>
 </nav>;
}
