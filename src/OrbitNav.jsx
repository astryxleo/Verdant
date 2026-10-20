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
const angles=[-90,-54,-18,18,54,90];
const wrap=a=>((a+180)%360+360)%360-180;
function closestItem(rotation){
 let best=0,score=Infinity;
 angles.forEach((a,i)=>{const d=Math.abs(wrap(a+rotation));if(d<score){score=d;best=i}});
 return best;
}
export default function OrbitNav({transactionCount=0,activeTab='overview',onNavigate=()=>{}}){
 const [rotation,setRotation]=useState(()=>-angles[Math.max(0,items.findIndex(x=>x.id===activeTab))]||0);
 const [dragging,setDragging]=useState(false);
 const stage=useRef(null),drag=useRef(null);
 function angleAt(e){
  const r=stage.current.getBoundingClientRect();
  return Math.atan2(e.clientY-(r.top+r.height/2),e.clientX-r.left)*180/Math.PI;
 }
 function snap(value){
  const i=closestItem(value),next=-angles[i];
  setRotation(next);onNavigate(items[i].id);
 }
 function start(e){
  if(e.button!==undefined&&e.button!==0)return;
  e.preventDefault();
  drag.current={pointer:e.pointerId,startAngle:angleAt(e),startRotation:rotation,moved:false};
  setDragging(true);e.currentTarget.setPointerCapture?.(e.pointerId);
 }
 function move(e){
  if(!drag.current)return;
  const delta=wrap(angleAt(e)-drag.current.startAngle);
  if(Math.abs(delta)>2)drag.current.moved=true;
  setRotation(drag.current.startRotation+delta);
 }
 function end(){
  if(!drag.current)return;
  const moved=drag.current.moved;drag.current=null;setDragging(false);
  if(moved)snap(rotation);
 }
 function choose(item,index){snap(-angles[index]);}
 const selected=items[closestItem(rotation)].id;
 return <nav className="orbit-nav" aria-label="Main navigation">
  <div className="orbit-heading"><span className="orbit-live"/> VERDANT <small>ROTATE TO NAVIGATE</small></div>
  <div className={'orbit-stage '+(dragging?'is-dragging':'')} ref={stage} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} role="group" aria-label="Drag the semicircle to change tabs">
   <div className="orbit-half-track" style={{transform:`rotate(${rotation}deg)`}}/>
   {items.map((item,index)=>{
    const angle=(angles[index]+rotation)*Math.PI/180;
    const x=105*Math.cos(angle),y=135+105*Math.sin(angle),Icon=item.Icon;
    const isActive=activeTab===item.id;
    return <button key={item.id} type="button" className={'orbit-node '+(selected===item.id?'orbit-at-marker ':'')+(isActive?'selected':'')} style={{left:x,top:y}} onClick={e=>{e.stopPropagation();choose(item,index)}} onPointerDown={e=>e.stopPropagation()} aria-label={'Open '+item.label} aria-current={isActive?'page':undefined} title={item.label}>
     <span className="orbit-icon"><Icon size={17}/></span>
     <span className="orbit-label">{item.label}{item.id==='transactions'&&transactionCount>0?<b>{transactionCount}</b>:null}</span>
    </button>;
   })}
   <div className="orbit-right-marker" aria-hidden="true"><span/></div>
  </div>
  <div className="orbit-hint"><span>●</span> Drag the arc — icon beside the dot opens</div>
 </nav>;
}
