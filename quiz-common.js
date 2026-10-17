// Shared helpers for the quiz pages. Load before the page script, then call Quiz.watch(app).
window.Quiz=(function(){
/* ---------- fit the picture on landscape tablets ---------- */
let fitted=null; // scene already sized for this question
function fitScene(app,force){try{
  const sc=app.querySelector('.card .scene');if(!sc||(sc===fitted&&!force))return; // once per question, so answers/drags don't move it
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
function watch(app){
  new MutationObserver(()=>requestAnimationFrame(()=>{fitScene(app);ensureNext()})).observe(app,{childList:true,subtree:true});
  addEventListener('resize',()=>requestAnimationFrame(()=>fitScene(app,true)));
}
return {watch,fitScene,ensureNext};
})();
