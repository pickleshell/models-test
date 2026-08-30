#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const releases = ['phase2-v2-r36', 'phase2-v2-r37'];
const target = '/home/gpt/pickleshell.github.io/llm-test-phase2-v2-results.js';
const rows = {};
for (const release of releases) {
  const root = path.resolve('results/benchmark-phase2-v2', release);
  const [manifest, reviews] = await Promise.all(['manifest.json', 'expert-reviews.json'].map((file) => readFile(path.join(root, file), 'utf8').then(JSON.parse)));
  const reviewMap = new Map(reviews.reviews.map((review) => [`${review.candidate}:${review.nomination}`, review]));
  for (const candidate of manifest.candidates) for (const nomination of manifest.nominations) {
    const dir = path.join(root, candidate.id, nomination.id, 'attempts', 'attempt-1');
    const [run, objective] = await Promise.all(['run.json', 'objective-evaluator.json'].map((file) => readFile(path.join(dir, file), 'utf8').then(JSON.parse)));
    const review = reviewMap.get(`${candidate.id}:${nomination.id}`);
    (rows[nomination.id] ??= []).push({ id: candidate.id, label: candidate.label ?? candidate.id, status: run.outcome,
      public: run.tests?.status === 0 ? 'Pass' : 'Fail', objective: objective.passed ? 'Pass' : 'Fail', scores: review?.scores ? Object.values(review.scores) : null,
      time: run.agent?.duration_ms == null ? null : run.agent.duration_ms / 1000, cost: run.agent?.usage?.reported_cost_usd ?? null, channel: 'OpenRouter' });
  }
}
const source = `const phase2v2Rows=${JSON.stringify(rows)};\n` + String.raw`
(()=>{const nomination=document.body.dataset.nomination;if(!nomination)return;const mean=v=>v?.reduce((a,b)=>a+b,0)/v.length??null;const missing=v=>v==null;const rows=(phase2v2Rows[nomination]||[]).map((r,index)=>({...r,index,overall:mean(r.scores)}));const order={completed:0,tests_failed:1,forbidden_changes:2,agent_failure:3,unavailable:4};const canonical=(a,b)=>(order[a.status]??9)-(order[b.status]??9)||(b.overall??-1)-(a.overall??-1)||(a.time??Infinity)-(b.time??Infinity)||a.index-b.index;[...rows].sort(canonical).forEach((r,i)=>r.rank=i+1);const esc=v=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));const score=v=>missing(v)?'<span class="na">N/A</span>':Number(v.toFixed(2));const badge=v=>'<span class="badge result-badge '+v.toLowerCase()+'>'+v+'</span>';let key='overall',direction=-1;const compare=(a,b)=>{if(key==='overall'&&direction===-1)return canonical(a,b);const av=a[key],bv=b[key];if(missing(av)!==missing(bv))return missing(av)?1:-1;if(missing(av))return a.index-b.index;const d=typeof av==='number'?av-bv:String(av).localeCompare(String(bv));return direction*d||a.index-b.index};function render(){document.getElementById('results-body').innerHTML=[...rows].sort(compare).map(r=>{const s=r.scores||[];return '<tr><td><strong>#'+r.rank+'</strong><span class="badge '+(r.status==='completed'?'success':'')+'">'+esc(r.status)+'</span></td><td><span class="model">'+esc(r.label)+'</span><span class="candidate-id">'+esc(r.id)+'</span></td><td class="score">'+badge(r.public)+'</td><td class="score">'+badge(r.objective)+'</td><td class="score">'+score(s[0])+'</td><td class="score">'+score(s[1])+'</td><td class="score">'+score(s[2])+'</td><td class="score">'+score(s[3])+'</td><td class="score overall">'+score(r.overall)+'</td><td class="number">'+(missing(r.time)?'N/A':r.time.toFixed(3))+'</td><td class="number">'+(missing(r.cost)?'N/A':'$'+r.cost)+'</td><td>'+r.channel+'</td></tr>'}).join('')}document.querySelectorAll('th button').forEach(b=>b.addEventListener('click',()=>{if(key===b.dataset.key)direction*=-1;else{key=b.dataset.key;direction=1}render()}));render()})();
`;
await writeFile(target, source);
console.log(JSON.stringify(Object.fromEntries(Object.entries(rows).map(([key, value]) => [key, value.length]))));
