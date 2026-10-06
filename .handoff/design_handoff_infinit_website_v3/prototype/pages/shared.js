(()=>{
// Versió sòbria per defecte (UI monocroma). ?colour torna als colors de servei.
const SOBER=!new URLSearchParams(location.search).has('colour');document.documentElement.classList.toggle('sober',SOBER);
// Accent: sorra per defecte. Per provar-ne d'altres: ?accent=terracotta|signal|tobacco o qualsevol hex (?accent=c45a2b); ?accent=sand torna a la sorra, ?accent=none sense accent. Es recorda entre pàgines; el color del text a sobre es tria sol.
{const q=new URLSearchParams(location.search).get('accent');if(q)localStorage.setItem('inf-acc2',q);const v=localStorage.getItem('inf-acc2')||'sand';const de=document.documentElement;if(/^#?[0-9a-f]{6}$/i.test(v)){const h=v.replace('#',''),c=[0,2,4].map(i=>{const x=parseInt(h.slice(i,i+2),16)/255;return x<=.04045?x/12.92:Math.pow((x+.055)/1.055,2.4);}),Y=.2126*c[0]+.7152*c[1]+.0722*c[2];de.style.setProperty('--acc','#'+h);de.style.setProperty('--acc-ink',Y>.18?'var(--t4)':'#fff');de.dataset.acc='custom';}else if(v!=='none')de.dataset.acc=v;}
// Línia d'un color: sincronitzada amb el rellotge perquè el color continuï igual en canviar de pàgina.
document.documentElement.style.setProperty('--lnd',-(Date.now()%20000)+'ms');if(new URLSearchParams(location.search).get('line')==='spectrum')document.documentElement.classList.add('ln-sp');
// Favicon en directe: canvia de color amb la línia (cada 4 s, sincronitzat amb el rellotge). Amb moviment reduït, només en carregar.
{const fi=document.querySelector('link[rel=icon][type="image/svg+xml"]');if(fi&&SOBER)fi.href=fi.href.replace(/favicon(-\w+)?\.svg/,'favicon-mono.svg');else if(fi){const N=['mint','blue','lilac','coral','ochre'],set=()=>{fi.href=fi.href.replace(/favicon(-\w+)?\.svg/,'favicon-'+N[Math.floor((Date.now()%20000)/4000)]+'.svg');};set();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setTimeout(()=>{set();setInterval(set,4000);},4000-Date.now()%4000);}}
const A='https://www.weareinfinit.com/project/assets/';
const R='',enc=s=>s.split(' ').join('%20');
const im=p=>R+enc(p);
const S=[
{n:'Strategy',h:165,d:'Direction aligning business ambition, market opportunity and execution. Positioning, growth systems, strategic clarity and modern brand evolution.',t:['Brand Strategy','Positioning','Growth Strategy','Fractional CMO','Research','AI Opportunity Mapping']},
{n:'Brand',h:255,d:'Scalable visual and verbal systems designed for clarity, recognition and consistency across every touchpoint.',t:['Visual Identity','Naming','Design Systems','Art Direction','Creative Direction']},
{n:'Digital',h:285,d:'Digital experiences built for discoverability, engagement and measurable business impact.',t:['Websites & Platforms','SEO & GEO','Performance Marketing','Analytics & Conversion','AI Experiences']},
{n:'Product',h:30,d:'Product thinking from interface to object. Experiences people understand at first use.',t:['UX / UI Direction','Product Design','Prototyping','Design Systems']},
{n:'Content',h:88,d:'Motion, photo, film and social that keep the brand alive after launch.',t:['Motion','Social & Content','Photo & Film','Campaigns']}];
const P=[
{n:'Bunnker',d:'beyond renting',t:['Strategy','Brand'],img:im('../project/assets/images/Bunnker Final.webp'),g:['../work/bunnker/bunnker-assets/hero.webp','../work/bunnker/bunnker-assets/int-03.webp','../work/bunnker/bunnker-assets/int-12.webp','../work/bunnker/bunnker-assets/art-07.webp','../work/bunnker/bunnker-assets/int-15.webp'].map(im),href:'case-bunnker.html'},
{n:'Relats',d:'ahead of the curve',t:['Strategy','Brand','Digital'],img:im('../project/assets/images/Relats Brand.webp'),g:['../work/relats/relats-assets/tie-cord-poster.jpg','../work/relats/relats-assets/offices.webp'].map(im),href:'case-relats.html'},
{n:'Instellar',d:'mission performance',t:['Strategy','Brand','Digital'],img:im('../project/assets/images/instellar-aircraft.webp'),g:[im('../project/assets/imagery/astronaut-blue.avif')],s:'Work in progress'},
{n:'Induktor',d:'sim racing hardware',t:['Strategy','Brand','Digital'],img:im('../project/assets/imagery/induktor-motor.jpg'),g:[],s:'Work in progress'},
{n:'Julià',d:'premium adventure vans',t:['Strategy','Brand','Digital'],img:im('../project/assets/imagery/Julia Yosemite.webp'),g:['../project/assets/imagery/julia-camper.webp','../project/assets/imagery/mountains-tekapo.webp','../project/assets/imagery/night-lake.webp','../project/assets/imagery/lake-moon.jpg'].map(im),s:'Work in progress'},
{n:'Almirall',d:'beautifully clinical',t:['Strategy','Digital'],img:im('../project/assets/imagery/Almirall.webp'),g:[],s:'Customer NDA'}];
P.forEach(p=>{p.all=[p.img,...p.g];p.h=hueOf(p.t[p.t.length-1]);});
const SEQ=Array.from({length:40},(_,i)=>R+'../project/assets/imagery/approach-seq/frame_'+String(1+i*4).padStart(4,'0')+'.jpg');
const CH={sap:28,glovo:37,almirall:22,instellar:21,relats:22,bunnker:26,'11onze':17,dronparc:21};// alçada per igualar el pes visual (àrea de tinta)
const C=Object.keys(CH).map(n=>A+'clients/'+n+'.png');
function hueOf(t){const s=S.find(x=>x.n===t||(t==='Identity'&&x.n==='Brand'));return s?s.h:255;}
const dot=h=>`oklch(.72 .05 ${h})`,tint=h=>`oklch(.92 .025 ${h})`,line=`linear-gradient(90deg,${S.map(s=>dot(s.h)).join(',')})`;
const dots=p=>`<span class="dots">${p.t.map(t=>`<i style="background:${dot(hueOf(t))}"></i>`).join('')}</span>`;
const img=(p,cls='',src)=>`<div class="img ${cls}">${(src||p.img)?`<img src="${src||p.img}" alt="${p.n}" loading="lazy" decoding="async">`:`<span class="ph">${p.n} — project image</span>`}</div>`;
const clients=(d)=>`<div class="mq${d?' on-d':''}"><div class="mq-t">${[...C,...C].map(s=>`<img src="${s}" alt="" style="height:${CH[s.split('/').pop().replace('.png','')]}px">`).join('')}</div></div>`;
const footer=(b='')=>`<footer class="ft dark" id="contact"><div class="ft-hl"><i></i></div><div class="ft-g">
<div><span class="wm" data-wm="28"></span><p class="lbl" style="margin-top:18px">Built to scale.</p></div>
<div><p class="lbl">Studio</p><a href="${b}#work">Work</a><a href="${b}#services">Services</a><a href="studio.html">Studio</a><a href="journal.html">Journal</a><a href="sectors.html">Sectors</a></div>
<div><p class="lbl">Connect</p><a href="mailto:hello@weareinfinit.com">hello@weareinfinit.com</a><a href="tel:+34689022383">+34 689 022 383</a><a href="https://www.linkedin.com/company/weareinfinit/">LinkedIn ↗</a></div>
<div><p class="lbl">Founder recognised by</p><div class="aw"><img src="${A}clients/Awwwards-Logo-Vector.svg-.png" alt="Awwwards"><img src="${A}clients/Coac.png" alt="COAC"></div></div></div>
<div class="ft-b lbl"><span>Barcelona — Worldwide</span><span class="fl">${['CA','ES','EN'].map(l=>`<button data-l="${l}"${l===(localStorage.getItem('inf-lang')||'EN')?' class="on"':''}>${l}</button>`).join('')}</span><span data-clock></span><span>© 2026 INFINIT©</span></div></footer>`;
const GAP=.035;
function wm(el,size){const cv=document.createElement('canvas').getContext('2d');cv.font=`900 ${size}px Geist`;el.innerHTML='';el.style.fontSize=size+'px';
 [...'INFINIT'].forEach((ch,i)=>{const m=cv.measureText(ch);const s=document.createElement('span');s.textContent=ch;s.style.display='inline-block';s.style.width=(m.actualBoundingBoxLeft+m.actualBoundingBoxRight)+'px';s.style.textIndent=m.actualBoundingBoxLeft+'px';s.style.marginLeft=i?GAP*size+'px':'0';el.appendChild(s);});
 const r=document.createElement('span');r.className='r';r.textContent='©';r.style.fontSize=(size>80?.2:.42)+'em';el.appendChild(r);}
// El wordmark es munta una sola vegada, quan Geist ja és a punt (màx. 1,5 s): així no salta ni reinicia l'animació del preloader. Només es torna a muntar si canvia l'amplada.
const FR=Promise.race([document.fonts.load('900 100px Geist'),new Promise(r=>setTimeout(r,1500))]);
function mountNow(){document.querySelectorAll('[data-wm]').forEach(el=>{const v=el.dataset.wm;if(v==='fit'){const p=el.parentElement,cs=getComputedStyle(p),Wd=p.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);if(el._k===Wd&&el.childElementCount)return;wm(el,100);wm(el,100*Wd/el.offsetWidth*.998);el._k=Wd;}else{if(el._k===v&&el.childElementCount)return;wm(el,+v);el._k=v;}});dispatchEvent(new Event('inf:wm'));}
function mount(){return FR.then(mountNow);}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.fl button');if(!b)return;localStorage.setItem('inf-lang',b.dataset.l);document.querySelectorAll('.fl button').forEach(x=>x.classList.toggle('on',x.dataset.l===b.dataset.l));});
const ftio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ftio.unobserve(e.target);}}),{threshold:.5});
// La línia va on comença el bloc fosc final (transició clar → fosc), no entre dos foscos.
setTimeout(()=>document.querySelectorAll('.ft-hl').forEach(e=>{const ft=e.closest('.ft');let s=ft.parentElement.id==='ft'?ft.parentElement:ft,t=null;while(s.previousElementSibling&&s.previousElementSibling.classList.contains('dark')&&s.previousElementSibling.tagName!=='SCRIPT'){s=s.previousElementSibling;t=s;}if(t){if(getComputedStyle(t).position==='static')t.style.position='relative';t.prepend(e);}ftio.observe(e);}),400);
function clock(){const t=new Date().toLocaleTimeString('en-GB',{timeZone:'Europe/Madrid'})+' BCN';document.querySelectorAll('[data-clock]').forEach(e=>e.textContent=t);}
window.INF={sober:SOBER,S,P,C,SEQ,hue:hueOf,dot,tint,line,dots,img,clients,footer,mount,clock};
const go=()=>{mount();clock();};
addEventListener('DOMContentLoaded',()=>{go();document.fonts.ready.then(go);});
addEventListener('resize',go);setInterval(clock,1000);
})();
