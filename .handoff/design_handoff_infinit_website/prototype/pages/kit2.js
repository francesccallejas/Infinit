(()=>{
const lerp=(a,b,t)=>a+(b-a)*t,coarse=matchMedia('(pointer:coarse)').matches;
const K={coarse};
// Scroll suau amb inèrcia (només escriptori). Manté el scroll natiu, així sticky segueix funcionant.
K.smooth=()=>{if(coarse)return;document.documentElement.classList.add('sm');let cur=scrollY,tgt=scrollY,raf=0;
 const max=()=>document.documentElement.scrollHeight-innerHeight;
 const step=()=>{cur=lerp(cur,tgt,.085);if(Math.abs(tgt-cur)<.4)cur=tgt;scrollTo(0,cur);raf=cur!==tgt?requestAnimationFrame(step):0;};
 addEventListener('wheel',e=>{if(e.ctrlKey||document.body.classList.contains('lock')||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;e.preventDefault();tgt=Math.max(0,Math.min(max(),tgt+e.deltaY*(e.deltaMode===1?40:1)));if(!raf)raf=requestAnimationFrame(step);},{passive:false});
 addEventListener('scroll',()=>{if(Math.abs(scrollY-cur)>3){cur=tgt=scrollY;}},{passive:true});
 K.to=y=>{tgt=Math.max(0,Math.min(max(),y));if(!raf)raf=requestAnimationFrame(step);};
};
K.anchors=()=>document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute('href'),t=id==='#top'?null:document.querySelector(id);if(id!=='#top'&&!t)return;e.preventDefault();K.closeMenu&&K.closeMenu();const y=t?t.getBoundingClientRect().top+scrollY:0;K.to?K.to(y):scrollTo({top:y,behavior:'smooth'});});
// Text que apareix línia a línia.
let lio;
K.lines=(root=document)=>{lio=lio||new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target._in=1;e.target.classList.add('lin');lio.unobserve(e.target);}}),{threshold:.2});
 root.querySelectorAll('[data-lines]').forEach(el=>{if(!el._src)el._src=el.innerHTML;el.innerHTML=el._src;const tk=[];
  el.childNodes.forEach(n=>{const parts=n.textContent.split(/(\s+)/);parts.forEach(w=>tk.push(n.nodeType===3?{w}:{w,tag:n.tagName.toLowerCase(),cls:n.className||''}));});
  // Cada paraula recorda si porta espai darrere, per no afegir-ne davant de la puntuació.
  const ws=[];tk.forEach(t=>{if(/^\s+$/.test(t.w)){if(ws.length)ws[ws.length-1].sp=1;}else if(t.w)ws.push(t);});
  el.innerHTML=ws.map((t,i)=>(t.tag?`<${t.tag} class="lw ${t.cls}" data-k="${i}">${t.w}</${t.tag}>`:`<span class="lw" data-k="${i}">${t.w}</span>`)+(t.sp?' ':'')).join('');
  const L=[];let top=null;el.querySelectorAll('.lw').forEach(w=>{const y=w.offsetTop;if(top===null||Math.abs(y-top)>4){L.push([]);top=y;}const t=ws[+w.dataset.k];L[L.length-1].push(w.outerHTML+(t.sp?' ':''));});
  el.innerHTML=L.map((l,i)=>`<span class="lm"><span class="li" style="transition-delay:${i*.09}s">${l.join('').trim()}</span></span>`).join('');
  if(el._in)el.classList.add('lin');else lio.observe(el);});};
let lt;addEventListener('resize',()=>{clearTimeout(lt);lt=setTimeout(()=>K.lines(),250);});
// Revelat en clip: es comprova amb l'scroll (més fiable que IntersectionObserver amb clip-path).
const clipChk=()=>document.querySelectorAll('.clip:not(.in)').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*.92&&r.bottom>0)el.classList.add('in');});
addEventListener('scroll',clipChk,{passive:true});
K.clip=()=>{requestAnimationFrame(clipChk);setTimeout(clipChk,400);};
// Toast + copiar al porta-retalls.
K.toast=(msg)=>{let t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t);}t.innerHTML=`<i></i>${msg}`;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),2200);};
K.copy=()=>document.addEventListener('click',e=>{const b=e.target.closest('[data-copy]');if(!b)return;e.preventDefault();const v=b.dataset.copy;
 const ok=()=>{K.toast('Email copied — talk soon.');const m=b.querySelector('.mt');if(m){const o=m.textContent;m.textContent='Copied ✓';setTimeout(()=>m.textContent=o,1500);}};
 (navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).then(ok).catch(()=>{const ta=document.createElement('textarea');ta.value=v;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(_){}ta.remove();ok();});});
// Dock frosted: escriptori amb enllaços, mòbil amb menú a pantalla completa.
K.dock=(home='')=>{const d=document.createElement('nav');d.className='dock';
 d.innerHTML=`<a class="wmk" href="${home||'#top'}"><span class="wm" data-wm="15"></span></a><i class="amb"></i><a class="dl" href="${home}#work"><span class="roll">Work</span></a><a class="dl" href="${home}#services"><span class="roll">Services</span></a><a class="dl" href="studio.html"><span class="roll">Studio</span></a><button class="mb" id="mb" aria-label="Menu"><span class="roll">Menu</span><span class="b3"><i></i><i></i><i></i></span></button><a class="go mag" href="#contact"><span class="roll">Let's talk</span></a>`;
 document.body.appendChild(d);
 const chk=()=>{if(document.body.classList.contains('menu-open')){d.classList.add('dk');return;}d.style.visibility='hidden';const el=document.elementFromPoint(innerWidth/2,innerHeight-40);d.style.visibility='';d.classList.toggle('dk',!!(el&&el.closest('.dark')));};
 let ly=scrollY;const hid=()=>{const y=scrollY,up=y<ly-2,dn=y>ly+2,ft=document.getElementById('ft'),r=ft?ft.getBoundingClientRect().top:1e9,nb=r<innerHeight-60;if(document.body.classList.contains('menu-open'))d.classList.remove('hid');else if(up||!nb)d.classList.remove('hid');else if(dn&&nb)d.classList.add('hid');ly=y;};
 addEventListener('scroll',()=>{chk();hid();},{passive:true});setTimeout(chk,60);K.chk=chk;K.spy();};
// On ets: marca l'apartat actiu al dock i al menú (pàgina o secció visible).
K.spy=()=>{const key=a=>{const h=a.getAttribute('href')||'';return /#work/.test(h)?'work':/#services/.test(h)?'services':/studio/.test(h)?'studio':/#contact/.test(h)?'contact':'';};const pg=/studio/.test(location.pathname)?'studio':/case-/.test(location.pathname)?'work':'';
 const run=()=>{let k=pg;if(!k){const y=innerHeight*.45;for(const id of ['work','services','contact']){const s=document.getElementById(id);if(!s)continue;const r=s.getBoundingClientRect();if(r.top<y&&r.bottom>y)k=id;}}document.querySelectorAll('.dock .dl,.menu-l a').forEach(a=>a.classList.toggle('on',!!k&&key(a)===k));};
 addEventListener('scroll',run,{passive:true});setTimeout(run,300);};
K.menu=()=>{const b=document.getElementById('mb');if(!b)return;const set=o=>{document.body.classList.toggle('menu-open',o);document.body.classList.toggle('lock',o);b.querySelectorAll('.rw>span').forEach(s=>s.textContent=o?'Close':'Menu');K.chk&&K.chk();};
 b.onclick=()=>set(!document.body.classList.contains('menu-open'));K.closeMenu=()=>set(false);addEventListener('keydown',e=>{if(e.key==='Escape')set(false);});};
K.lang=el=>KIT.seg(el,['CA','ES','EN'],()=>{},2);
// Preloader: INFINIT puja lletra a lletra en els 5 colors, comptador i cortina.
K.pre=key=>new Promise(res=>{if(sessionStorage.getItem('inf-pre-'+key))return res();sessionStorage.setItem('inf-pre-'+key,1);
 const p=document.createElement('div');p.className='pre2';
 p.innerHTML=`<div class="pre2-m"><span class="wm" data-wm="fit"></span></div><div class="pre2-b"><span class="lbl">Brand &amp; Strategy firm — Barcelona — Worldwide</span><span class="pre2-n">000</span></div><div class="pre2-l"><i></i></div>`;
 document.body.appendChild(p);document.body.classList.add('lock');INF.mount();
 const n=p.querySelector('.pre2-n'),l=p.querySelector('.pre2-l i'),t0=performance.now(),D=1700;
 const done=()=>{if(p.classList.contains('out'))return;p.classList.add('out');document.body.classList.remove('lock');setTimeout(res,350);setTimeout(()=>p.remove(),1300);};p.onclick=done;
 (function f(t){const k=Math.min(1,(t-t0)/D),e=1-Math.pow(1-k,3);n.textContent=String(Math.round(e*100)).padStart(3,'0');l.style.transform=`scaleX(${e})`;if(k<1)requestAnimationFrame(f);else setTimeout(done,250);})(t0);});
K.colorWM=(el,L=.72,C=.075)=>[...el.children].filter(s=>!s.classList.contains('r')).forEach((s,i)=>s.style.color=`oklch(${L} ${C} ${INF.S[i%5].h})`);
K.menuEl=(home='')=>{const m=document.createElement('div');m.className='menu dark';m.id='menu';
 m.innerHTML=`<div class="menu-i"><div class="menu-t"><span class="wm" data-wm="22"></span><div data-lang class="sm"></div></div><nav class="menu-l">${[['Work',home+'#work',255],['Services',home+'#services',165],['Studio','studio.html',285],['Contact','#contact',88]].map((l,i)=>`<a href="${l[1]}" data-hh="${l[2]}" style="--bh:${l[2]};--i:${i}"><span class="lbl">0${i+1}</span><span class="mt">${l[0]}</span><i></i></a>`).join('')}</nav><div class="menu-b"><button class="gbtn" data-copy="hello@weareinfinit.com"><span class="mt">hello@weareinfinit.com</span></button><span class="lbl">Barcelona — Worldwide · <span data-clock></span></span></div></div>`;document.body.appendChild(m);};
// Inicialització comuna per a Studio i casos.
K.vids=()=>document.querySelectorAll('.vd video').forEach(v=>{const sw=()=>{if(v._sw)return;v._sw=1;const i=document.createElement('img');i.src=v.poster;i.alt='';v.replaceWith(i);};v.addEventListener('error',sw);setTimeout(()=>{if(v.readyState<2)sw();},4000);});
K.page=(home='home.html')=>{K.vids();K.menuEl(home);const ft=document.getElementById('ft');if(ft){ft.innerHTML=INF.footer(home);ft.querySelector('.ft-g>div').remove();}
 document.documentElement.style.setProperty('--ln',INF.line);K.dock(home);KIT.roll();KIT.mag();KIT.cursor();KIT.ambient();K.smooth();K.anchors();K.copy();K.menu();document.querySelectorAll('[data-lang]').forEach(K.lang);INF.mount();
 document.fonts.ready.then(()=>{K.lines();K.clip();KIT.reveal();});};
// Carrusel infinit arrossegable (el contingut de .car-t ha d'anar triplicat).
K.carousel=el=>{const t=el.querySelector('.car-t');let x=0,v=-.6,drag=false,lx=0,moved=0;const W=()=>t.scrollWidth/3;
 el.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;moved=0;v=0;el._pid=e.pointerId;});
 el.addEventListener('pointermove',e=>{if(!drag)return;const d=e.clientX-lx;lx=e.clientX;x+=d;v=d;moved+=Math.abs(d);if(moved>6&&!el.hasPointerCapture(e.pointerId))el.setPointerCapture(e.pointerId);});
 const up=()=>{drag=false;};el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);
 el.addEventListener('click',e=>{if(moved>6){e.preventDefault();e.stopPropagation();}},true);
 const ims=[...t.querySelectorAll('.img')];
 (function f(){if(!drag){v=lerp(v,-.6,.03);x+=v;}const w=W();if(w){if(x<-w*2)x+=w;if(x>-w)x-=w;}t.style.transform=`translate3d(${x}px,0,0)`;const sk=Math.max(-8,Math.min(8,v*.4));ims.forEach(i=>i.style.transform=`skewX(${-sk}deg)`);requestAnimationFrame(f);})();
 requestAnimationFrame(()=>{x=-W();});};
// Galeria de clic: cada clic passa a la imatge següent.
K.tap=el=>{const ims=[...el.querySelectorAll('.tp')],n=el.querySelector('[data-n]');let i=0;const set=k=>{i=(k+ims.length)%ims.length;ims.forEach((m,j)=>m.classList.toggle('on',j===i));if(n)n.textContent=String(i+1).padStart(2,'0')+' / '+String(ims.length).padStart(2,'0');};
 el.querySelector('[data-prev]')?.addEventListener('click',e=>{e.stopPropagation();set(i-1);});el.querySelector('[data-next]')?.addEventListener('click',e=>{e.stopPropagation();set(i+1);});el.addEventListener('click',()=>set(i+1));set(0);};
window.KIT2=K;
})();
