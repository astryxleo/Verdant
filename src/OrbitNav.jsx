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
const angles=[-140,-90,-40,0,40,90];
const norm=a=>((a%360)+360)%360;
export default function OrbitNav({transactionCount=0,activeTab='overview',onNavigate=()=>{}}){
 const [rotation,setRotation]=useState(0),[dragging,setDragging]=useState(false);
 const drag=useRef(null),wheel=useRef(null);
 function angleAt(e){const r=wheel.current.getBoundingClientRect();return Math.atan2(e.clientY-r.top-r.height/2,e.clientX-r.left-r.width/2)*180/Math.PI}
 function nearestIndex(rotationValue){let best=0,score=999;angles.forEach((a,i)=>{const d=Math.abs(((a+rotationValue+180)%360+360)%360-180);if(d<score){score=d;best=i}});return best}
 function start(e){if(e.button!==undefined&&e.button!==0)return;e.preventDefault();drag.current={pointer:e.pointerId,startAngle:angleAt(e),startRotation:rotation,moved:false};setDragging(true);e.currentTarget.setPointerCapture?.(e.pointerId)}
 function move(e){if(!drag.current)return;const delta=angleAt(e)-drag.current.startAngle;if(Math.abs(delta)>3)drag.current.moved=true;setRotation(drag.current.startRotation+delta)}
 function end(){if(!drag.current)return;const moved=drag.current.moved;drag.current=null;setDragging(false);if(moved)setRotation(v=>{const snap=-angles[nearestIndex(v)];onNavigate(items[nearestIndex(v)].id);return snap})}
 function choose(item,index){const snap=-angles[index];setRotation(snap);onNavigate(item.id)}
 return <nav className="orbit-nav" aria-label="Main navigation">
  <div className="orbit-heading"><span className="orbit-live"/> NAVIGATION <small>GRAB & ROTATE</small></div>
  <div className={'orbit-stage '+(dragging?'is-dragging':'')} ref={wheel} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
   <div className="orbit-half-track" style={{transform:`rotate(${rotation}deg)`}}/>
   <div className="orbit-pivot"><span>V</span><small>VERDANT</small><i>FINANCE OS</i><em>⟲</em></div>
   {items.map((item,index)=>{const angle=(angles[index]+rotation)*Math.PI/180,x=119+91*Math.cos(angle),y=145+91*Math.sin(angle),Icon=item.Icon,selected=activeTab===item.id;return <button key={item.id} type="button" className={'orbit-node '+(selected?'selected':'')} style={{left:x,top:y}} onClick={e=>{e.stopPropagation();choose(item,index)}} onPointerDown={e=>e.stopPropagation()} aria-label={'Open '+item.label} aria-current={selected?'page':undefined} title={item.label}><span className="orbit-icon"><Icon size={17}/></span><span className="orbit-label">{item.label}{item.id==='transactions'&&transactionCount>0?<b>{transactionCount}</b>:null}</span></button>})}
   <div className="orbit-right-marker"><span/> ACTIVE</div>
  </div>
  <div className="orbit-hint"><span>✦</span> Drag the ring · item on right opens</div>
 </nav>;
}
