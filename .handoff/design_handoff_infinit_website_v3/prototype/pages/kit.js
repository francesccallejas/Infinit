(()=>{
const lerp=(a,b,t)=>a+(b-a)*t;
function cursor(){
 const c=document.createElement('div');c.className='cur';c.innerHTML='<span></span>';document.body.appendChild(c);
 let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;
 addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;const t=e.target.closest&&e.target.closest('[data-cur]');c.classList.toggle('big',!!t);if(t)c.firstChild.textContent=t.dataset.cur;});
 (function f(){x=lerp(x,tx,.2);y=lerp(y,ty,.2);c.style.transform=`translate3d(${x}px,${y}px,0)`;requestAnimationFrame(f);})();
}
function roll(root=document){root.querySelectorAll('.roll:not([data-r])').forEach(el=>{el.dataset.r=1;const t=el.textContent;el.innerHTML=`<span class="rw"><span>${t}</span><span>${t}</span></span>`;});}
function mag(root=document){root.querySelectorAll('.mag').forEach(el=>{
 el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.3}px,${(e.clientY-r.top-r.height/2)*.3}px)`;});
 el.addEventListener('pointerleave',()=>el.style.transform='');});}
function dock(){
 const d=document.createElement('nav');d.className='dock';
 d.innerHTML=`<a class="wmk" href="#top"><span class="wm" data-wm="15"></span></a><i class="amb"></i><a class="roll" href="#work">Work</a><a class="roll" href="#services">Services</a><a class="roll" href="https://www.weareinfinit.com/studio.html">Studio</a><span class="k" data-clock></span><a class="go roll mag" href="mailto:hello@weareinfinit.com">Let's talk</a>`;
 document.body.appendChild(d);
 const chk=()=>{d.style.visibility='hidden';const el=document.elementFromPoint(innerWidth/2,innerHeight-40);d.style.visibility='';d.classList.toggle('dk',!!(el&&el.closest('.dark')));};
 addEventListener('scroll',chk,{passive:true});setTimeout(chk,50);
}
function seg(el,opts,on,cur=0){
 el.classList.add('seg');el.innerHTML='<i></i>'+opts.map((o,i)=>`<button data-i="${i}">${o}</button>`).join('');
 const ind=el.firstChild,bs=[...el.querySelectorAll('button')];
 const set=i=>{bs.forEach((b,k)=>b.classList.toggle('on',k===i));ind.style.left=bs[i].offsetLeft+'px';ind.style.width=bs[i].offsetWidth+'px';on(i);};
 el.onclick=e=>{const b=e.target.closest('button');if(b)set(+b.dataset.i);};
 requestAnimationFrame(()=>set(cur));document.fonts.ready.then(()=>{const i=bs.findIndex(b=>b.classList.contains('on')),b=bs[i<0?cur:i];if(!b)return;ind.style.left=b.offsetLeft+'px';ind.style.width=b.offsetWidth+'px';});
}
function pre(key){
 if(sessionStorage.getItem('inf-pre-'+key))return;sessionStorage.setItem('inf-pre-'+key,1);
 const p=document.createElement('div');p.className='pre';
 p.innerHTML=`<div style="display:flex;justify-content:space-between" class="lbl"><span>Brand &amp; Strategy firm</span><span>Barcelona — Worldwide</span></div><div><div class="pre-n">0</div><div class="pre-l" style="margin-top:22px"><i></i></div></div>`;
 document.body.appendChild(p);const n=p.querySelector('.pre-n'),l=p.querySelector('.pre-l i'),t0=performance.now(),D=1300;
 const out=()=>p.classList.add('out');p.onclick=out;
 (function f(t){const k=Math.min(1,(t-t0)/D),e=1-Math.pow(1-k,3);n.textContent=Math.round(e*100);l.style.transform=`scaleX(${e})`;if(k<1)requestAnimationFrame(f);else setTimeout(out,200);})(t0);
 setTimeout(()=>p.remove(),3200);
}
function reveal(root=document){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});root.querySelectorAll('.rv:not(.in)').forEach(el=>io.observe(el));}
// Color ambiental: l'element [data-h] al centre de la pantalla (o sota el cursor) tenyeix el fons.
function setH(h){const r=document.documentElement.style;if(h==='n'||h==null){r.setProperty('--ac','.002');}else{r.setProperty('--h',h);r.setProperty('--ac','.011');}}
function ambient(root=document){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setH(e.target.dataset.h);}),{rootMargin:'-48% 0px -48% 0px'});
 root.querySelectorAll('[data-h]').forEach(el=>io.observe(el));
 root.querySelectorAll('[data-hh]').forEach(el=>{el.addEventListener('pointerenter',()=>setH(el.dataset.hh));});
}
// Seqüència d'imatges controlada per l'scroll, pintada en un canvas.
function seq(sec,frames){
 const cv=sec.querySelector('canvas'),cx=cv.getContext('2d'),imgs=frames.map(s=>{const i=new Image();i.decoding='async';i.src=s;return i;});let last=-1,w=0,h=0,raf=0,lp=-1;
 const size=()=>{w=cv.width=Math.round(cv.clientWidth*devicePixelRatio);h=cv.height=Math.round(cv.clientHeight*devicePixelRatio);last=-1;};
 const draw=k=>{const i=imgs[k];if(!i||!i.complete||!i.naturalWidth)return;const s=Math.max(w/i.naturalWidth,h/i.naturalHeight);cx.drawImage(i,(w-i.naturalWidth*s)/2,(h-i.naturalHeight*s)/2,i.naturalWidth*s,i.naturalHeight*s);last=k;};
 const ps=[...sec.querySelectorAll('.seq-o p span')];
 const tick=()=>{raf=0;const r=sec.getBoundingClientRect();if(r.bottom<-50||r.top>innerHeight+50)return;const q=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));const k=Math.round(q*(frames.length-1));if(k!==last)draw(k);const p=Math.min(ps.length,Math.ceil(q*ps.length*1.3));if(p!==lp){lp=p;ps.forEach((s,j)=>s.style.opacity=j<p?1:.18);}};
 imgs.forEach(i=>i.decode&&i.decode().catch(()=>{}));imgs[0].onload=()=>{size();draw(0);};size();
 addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(tick);},{passive:true});addEventListener('resize',()=>{size();tick();});tick();
}
// En passar per sobre d'un projecte, la galeria es fon lentament (1.8 s per imatge). Cada imatge es descodifica abans de mostrar-la, perquè la pàgina no s'aturi.
function cyc(root=document){root.querySelectorAll('[data-cyc]:not([data-cy])').forEach(a=>{a.dataset.cy=1;const p=INF.P[a.dataset.cyc];if(!p||p.all.length<2)return;const base=a.querySelector('.img img');if(!base)return;const box=base.parentElement;
 const L=[0,1].map(()=>{const i=document.createElement('img');i.alt='';i.className='cy-ov';i.decoding='async';box.appendChild(i);return i;});
 let t=0,j=0,cur=-1,z=1,on=false,pre=null;
 const preload=()=>pre||(pre=p.all.slice(1).map(s=>{const i=new Image();i.decoding='async';i.src=s;return i.decode().catch(()=>{});}));
 const tick=async()=>{j=(j+1)%p.all.length;if(j===0){L.forEach(l=>l.classList.remove('in'));cur=-1;return;}const n=cur===0?1:0,el=L[n];el.src=p.all[j];try{await el.decode();}catch(e){}if(!on)return;el.style.zIndex=++z;el.classList.add('in');const o=L[1-n];setTimeout(()=>{if(cur===n)o.classList.remove('in');},1200);cur=n;};
 a.addEventListener('pointerenter',()=>{on=true;preload();clearInterval(t);t=setInterval(tick,1800);});
 a.addEventListener('pointerleave',()=>{on=false;clearInterval(t);j=0;cur=-1;L.forEach(l=>l.classList.remove('in'));});});}
window.KIT={cursor,roll,mag,dock,seg,pre,reveal,lerp,ambient,seq,setH,cyc,init(key){pre(key);cursor();dock();roll();mag();reveal();ambient();INF.mount();}};
})();
