export function sumTransactions(rows=[],type){return rows.filter(row=>row.type===type).reduce((sum,row)=>sum+Number(row.amount||0),0)}
export function savingsRate(income,expenses){const total=Number(income)||0;if(total<=0)return 0;return Math.round(((total-(Number(expenses)||0))/total)*100)}
export function budgetProgress(spent,budget){const limit=Number(budget)||0;const used=Number(spent)||0;return{percent:limit>0?Math.round(used/limit*100):0,remaining:limit-used,over:used>limit}}
export function percentChange(current,previous){const before=Number(previous)||0;if(before<=0)return null;return Math.round(((Number(current)||0-before)/before)*100)}
export function monthKey(date){return String(date||'').slice(0,7)}
