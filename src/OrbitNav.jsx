import React,{useState} from 'react';
import {LayoutDashboard,CreditCard,CalendarDays,Target,Repeat,ChartNoAxesCombined} from 'lucide-react';

const items=[
 {label:'Overview',id:'overview',Icon:LayoutDashboard},
 {label:'Transactions',id:'transactions',Icon:CreditCard},
 {label:'Calendar',id:'calendar',Icon:CalendarDays},
 {label:'Budgets',id:'budgets',Icon:Target},
 {label:'Recurring',id:'recurring',Icon:Repeat},
 {label:'Insights',id:'reports',Icon:ChartNoAxesCombined}
];

export default function OrbitNav({transactionCount=0}){
 const [active,setActive]=useState('overview');
 const [turn,setTurn]=useState(0);
 function select(item,index){
  setActive(item.id);
  setTurn(index*60);
  const target=document.getElementById(item.id);
  if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
 }
 return <nav className="orbit-nav" aria-label="Main navigation">
  <div className="orbit-heading"><span className="orbit-live"/> NAVIGATION <small>ROTATE TO EXPLORE</small></div>
  <div className="orbit-wheel">
   <div className="orbit-track" style={{transform:`rotate(${turn}deg)`}}/>
   <div className="orbit-core"><span>V</span><small>VERDANT</small><i>FINANCE OS</i></div>
   {items.map((item,index)=>{
    const angle=index*60;
    const Icon=item.Icon;
    return <button key={item.id} type="button" className={'orbit-node '+(active===item.id?'selected':'')} style={{'--angle':angle+'deg'}} onClick={()=>select(item,index)} aria-label={item.label} aria-current={active===item.id?'page':undefined} title={item.label}>
      <span className="orbit-icon"><Icon size={17}/></span>
      <span className="orbit-label">{item.label}{item.id==='transactions'&&transactionCount>0?<b>{transactionCount}</b>:null}</span>
    </button>
   })}
  </div>
  <div className="orbit-hint"><span>✦</span> Select a node to navigate</div>
 </nav>;
}
