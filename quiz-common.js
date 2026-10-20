// Shared helpers for the quiz pages. Load before the page script, then call Quiz.watch(app).
// It also adds landscape.css (one-screen layout for landscape tablets) to every page that loads it.
(function(){try{const me=document.currentScript&&document.currentScript.src;if(!me||document.querySelector('link[data-landscape]'))return;
  const l=document.createElement('link');l.rel='stylesheet';l.href=new URL('landscape.css',me).href;l.dataset.landscape='1';document.head.appendChild(l)}catch(e){}})();
window.Quiz=(function(){
/* ---------- fit the picture on landscape tablets ---------- */
let fitted=null; // scene already sized for this question
function fitScene(app,force){try{
  const sc=app.querySelector('.card .scene');if(!sc||(sc===fitted&&!force))return;
  const cd=sc.closest('.card');if(cd&&getComputedStyle(cd).display==='grid'){sc.style.maxWidth='';sc.style.marginInline='';fitted=sc;return} // landscape.css lays it out // once per question, so answers/drags don't move it
  fitted=sc;sc.style.maxWidth='';sc.style.marginInline='';
  if(innerWidth<=innerHeight||Math.min(screen.width,screen.height)<600)return; // portrait / phones, incl. landscape
  const fbx=document.getElementById('fbx');
  const cards=app.querySelectorAll('.card');const last=cards[cards.length-1];
  const reserve=(fbx&&!fbx.querySelector('.fb'))?(fbx.querySelector(".btn")?110:200):0; // room for feedback + Next
  const bottom=last.getBoundingClientRect().bottom+scrollY+reserve+14;
  const over=bottom-innerHeight;if(over<=0)return;
  const h=sc.getBoundingClientRect().height;const nh=Math.max(90,h-over);
  sc.style.maxWidth=Math.round(nh*16/9)+'px';sc.style.marginInline='auto';
}catch(e){}}
function ensureNext(){const fbx=document.getElementById('fbx');if(!(fbx&&fbx.querySelector('.fb')))return;const nb=document.getElementById('nextBtn');if(nb){const r=nb.getBoundingClientRect();if(r.bottom>innerHeight-4)nb.scrollIntoView({block:'end',behavior:'smooth'})}}
// landscape tablets: start "The rule" boxes closed so the question fits (tap to open)
const land=()=>innerWidth>innerHeight&&innerWidth>=760;
function foldRules(app){if(!land())return;app.querySelectorAll('details.rule[open]:not([data-folded])').forEach(d=>{d.dataset.folded='1';d.open=false})}
function watch(app){
  new MutationObserver(()=>requestAnimationFrame(()=>{foldRules(app);fitScene(app);ensureNext()})).observe(app,{childList:true,subtree:true});
  addEventListener('resize',()=>requestAnimationFrame(()=>fitScene(app,true)));
}
return {watch,fitScene,ensureNext};
})();
