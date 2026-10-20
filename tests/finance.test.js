import test from 'node:test';
import assert from 'node:assert/strict';
import {sumTransactions,savingsRate,budgetProgress,percentChange,monthKey} from '../src/finance.js';

test('sums only transactions matching the requested type',()=>{assert.equal(sumTransactions([{type:'income',amount:'1200.50'},{type:'expense',amount:300},{type:'income',amount:99.5}],'income'),1300)});
test('savings rate handles normal values and zero income',()=>{assert.equal(savingsRate(1000,250),75);assert.equal(savingsRate(0,250),0);assert.equal(savingsRate(100,150),-50)});
test('budget progress exposes remaining amount and overspend',()=>{assert.deepEqual(budgetProgress(75,100),{percent:75,remaining:25,over:false});assert.deepEqual(budgetProgress(125,100),{percent:125,remaining:-25,over:true});assert.deepEqual(budgetProgress(5,0),{percent:0,remaining: -5,over:true})});
test('month comparison returns null when no baseline exists',()=>{assert.equal(percentChange(120,100),20);assert.equal(percentChange(80,100),-20);assert.equal(percentChange(20,0),null)});
test('month key safely extracts year and month',()=>{assert.equal(monthKey('2026-10-20'),'2026-10');assert.equal(monthKey(undefined),'')});
