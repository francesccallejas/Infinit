// Journal: pinta la llista i l'article a partir de window.ARTICLES (generat des de journal/*.md). En producció, generar HTML estàtic.
(()=>{const A=window.ARTICLES||[];
const CL={why:'Why rebrand',when:'When to act',cost:'Cost & timing',process:'How it works',website:'Website & GEO'};
const SEC={'/en/industrial-branding/':["Industrial &amp; B2B",'sector.html'],'/en/automotive-branding/':["Automotive &amp; mobility",'sector-automotive-branding.html'],'/en/food-branding/':["Food &amp; beverage",'sector-food-branding.html'],'/en/pharma-branding/':["Pharma, health &amp; dermocosmetics",'sector-pharma-branding.html'],'/en/real-estate-branding/':["Real estate &amp; proptech",'sector-real-estate-branding.html'],'/en/tech-branding/':["Tech, startups &amp; scaleups",'sector-tech-branding.html'],'/en/fashion-branding/':["Fashion &amp; retail",'sector-fashion-branding.html'],'/en/energy-branding/':["Energy &amp; renewables",'sector-energy-branding.html'],'/en/outdoor-leisure-branding/':["Outdoor, leisure &amp; sport",'sector-outdoor-leisure-branding.html'],'/en/family-business-branding/':["Family business branding",'sector-family-business-branding.html'],'/en/international-branding/':["Branding for going international",'sector-international-branding.html'],'/en/merger-acquisition-branding/':["Branding for mergers &amp; acquisitions",'sector-merger-acquisition-branding.html'],'/en/brand-launch/':["Branding for new launches",'sector-brand-launch.html'],'/en/employer-branding/':["Employer branding",'sector-employer-branding.html'],'/en/b2b-website-design/':["B2B websites",'sector-b2b-website-design.html'],'/en/geo-ai-search/':["GEO — Generative Engine Optimisation",'sector-geo-ai-search.html'],'/en/fractional-cmo/':["Fractional CMO",'sector-fractional-cmo.html']};
const LIVE='https://www.weareinfinit.com';
const href=u=>{const[p,h]=u.split('#');if(SEC[p])return SEC[p][1]+(h?'#'+h:'');if(p==='/en/sectors/')return'sectors.html';if(p==='/en/work/relats/')return'case-relats.html';if(p==='/en/work/bunnker/')return'case-bunnker.html';const j=p.match(/^\/en\/journal\/([^/]+)\/?$/);if(j)return'article.html?a='+j[1];return p.startsWith('/')?LIVE+u:u;};
const esc=s=>s.replace(/&(?!amp;|lt;|gt;|quot;|#\d+;)/g,'&amp;').replace(/</g,'&lt;');
const inl=s=>esc(s).replace(/\[([^\]]+)\]\(([^)]+)\)/g,(m,t,u)=>`<a href="${href(u)}">${t}</a>`).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>');
const sl=t=>t.toLowerCase().replace(/&[a-z]+;/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const mins=a=>Math.max(2,Math.round(a.md.split(/\s+/).length/220));
const ttl=t=>{const m=t.match(/^(.+?[?.:])\s(.+)$/)||t.match(/^(.+?)\s(\(.+\))$/);return m?`<b>${esc(m[1])}</b> ${esc(m[2])}`:`<b>${esc(t)}</b>`;};
const sec=a=>SEC[a.related_sector]||['Sectors'];
const secHref=a=>{const s=sec(a);return s[1]||LIVE+a.related_sector;};
function parse(md){const L=md.replace(/\r/g,'').split('\n'),out=[],toc=[],faq=[];let i=0,inFaq=false,ans='',end='';
 const blk=/^(#|\||- |\d+\. |---)/;
 while(i<L.length){const l=L[i];
  if(!l.trim()||/^# /.test(l)){i++;continue;}
  if(/^---\s*$/.test(l)){end=inl(L.slice(i+1).join(' ').trim().replace(/^\*|\*$/g,''));break;}
  if(/^## /.test(l)){const t=l.slice(3).trim(),id=sl(t);inFaq=/^faq$/i.test(t);toc.push([id,t]);out.push(`<h2 id="${id}">${inl(t)}</h2>`);i++;continue;}
  if(/^### /.test(l)){out.push(`<h3>${inl(l.slice(4).trim())}</h3>`);i++;continue;}
  if(/^\|/.test(l)){const R=[];while(i<L.length&&/^\|/.test(L[i]))R.push(L[i++]);const c=r=>r.trim().replace(/^\||\|$/g,'').split('|').map(x=>x.trim());out.push(`<div class="tbw"><table class="tb"><thead><tr>${c(R[0]).map(x=>`<th>${inl(x)}</th>`).join('')}</tr></thead><tbody>${R.slice(2).map(r=>`<tr>${c(r).map(x=>`<td>${inl(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);continue;}
  if(/^\d+\. /.test(l)){const it=[];while(i<L.length&&/^\d+\. /.test(L[i]))it.push(L[i++].replace(/^\d+\. /,''));out.push(`<ol>${it.map(x=>`<li>${inl(x)}</li>`).join('')}</ol>`);continue;}
  if(/^- /.test(l)){const it=[];while(i<L.length&&/^- /.test(L[i]))it.push(L[i++].slice(2));out.push(`<ul>${it.map(x=>`<li>${inl(x)}</li>`).join('')}</ul>`);continue;}
  const p=[];while(i<L.length&&L[i].trim()&&!blk.test(L[i]))p.push(L[i++]);const t=p.join(' ');
  const sa=t.match(/^\*\*Short answer:\*\*\s*(.+)$/i);if(sa){ans=sa[1].charAt(0).toUpperCase()+sa[1].slice(1);continue;}
  const q=t.match(/^\*\*(.+?\?)\*\*\s*(.+)$/);if(inFaq&&q){faq.push([q[1],q[2]]);out.push(`<details class="qa"${faq.length===1?' open':''}><summary>${inl(q[1])}<i></i></summary><p>${inl(q[2])}</p></details>`);continue;}
  out.push(`<p>${inl(t)}</p>`);}
 return{html:out.join(''),toc,faq,ans,end};}
// Portada: per defecte omple (cover); al .md es pot posar cover_fit, cover_pos i cover_bg per a captures de web
const cst=a=>a.cover_fit||a.cover_pos?` style="object-fit:${a.cover_fit||'cover'};object-position:${a.cover_pos||'50% 50%'}"`:'',cbg=a=>a.cover_bg?` style="background:${a.cover_bg}"`:'';
const row=(a,n,big)=>`<li data-c="${a.cluster}"><a href="article.html?a=${a.slug}" data-cur="Read">${big?`<span class="lbl">${String(n).padStart(2,'0')}</span>`:''}${a.cover?`<div class="img"${cbg(a)}><img src="${a.cover}" alt="" loading="lazy" decoding="async"${cst(a)}></div>`:''}<div><${big?'h2':'h3'}>${esc(a.title)}</${big?'h2':'h3'}>${big?`<p>${esc(a.description)}</p>`:''}</div><div class="jl-m"><span class="tg">${esc(CL[a.cluster]||'')}</span>${big?`<span class="lbl">${esc(sec(a)[0])} · ${mins(a)} min read</span>`:''}</div><span class="ar">↗</span></a></li>`;
const JR={A,parse,
 list(ol,seg){ol.innerHTML=A.map((a,i)=>row(a,i+1,1)).join('');if(!seg)return;const keys=['all','why','when','cost','process','website'];
  KIT.seg(seg,['All','Why','When','Cost','Process','Website'],k=>ol.querySelectorAll('li').forEach(li=>li.hidden=k>0&&li.dataset.c!==keys[k]));},
 mini(el){const S=el.dataset.jr.split(',');el.innerHTML=S.map(s=>A.find(a=>a.slug===s)).filter(Boolean).map(a=>row(a)).join('');},
 article(){const q=new URLSearchParams(location.search).get('a'),k=Math.max(0,A.findIndex(a=>a.slug===q)),a=A[k];if(!a)return;const r=parse(a.md),$=id=>document.getElementById(id);
  document.title=a.title+' | INFINIT©';const md=document.querySelector('meta[name=description]');if(md)md.content=a.description;
  $('a-k').textContent=sec(a)[0]+' · '+(CL[a.cluster]||'');$('a-h').innerHTML=ttl(a.title);$('a-d').textContent=a.description;const cv=$('a-cv');if(cv&&a.cover)cv.innerHTML=`<div class="img"${cbg(a)}><img src="${a.cover}" alt="${esc(a.cover_alt||'')}" fetchpriority="high" decoding="async"${cst(a)}></div>`;$('a-t').textContent=mins(a)+' min read';
  $('a-toc').innerHTML='<span class="lbl">In this article</span>'+r.toc.map(([id,t])=>`<a href="#${id}">${inl(t)}</a>`).join('');
  $('a-b').innerHTML=(r.ans?`<div class="ans"><span class="lbl">Short answer</span>${inl(r.ans)}</div>`:'')+r.html+(r.end?`<p class="end">${r.end}</p>`:'');
  $('a-r').innerHTML=`<a class="rel" href="${secHref(a)}"><span class="lbl">Related</span><b>${esc(sec(a)[0])}</b><span class="go">See how we work ↗</span></a>`;
  $('a-n').innerHTML=[A[(k+1)%A.length],A[(k+2)%A.length]].map(x=>row(x)).join('');
  const ld={'@context':'https://schema.org','@graph':[{'@type':'Article',headline:a.title,description:a.description,author:{'@type':'Person',name:a.author},publisher:{'@id':'https://www.weareinfinit.com/#org'},inLanguage:a.lang,mainEntityOfPage:LIVE+'/en/journal/'+a.slug+'/',image:a.cover?new URL(a.cover,location.href).href:undefined},{'@type':'BreadcrumbList',itemListElement:[['Home','/en/'],['Journal','/en/journal/'],[a.title,'/en/journal/'+a.slug+'/']].map(([n,u],i)=>({'@type':'ListItem',position:i+1,name:n,item:LIVE+u}))}].concat(r.faq.length?[{'@type':'FAQPage',mainEntity:r.faq.map(([qq,aa])=>({'@type':'Question',name:qq,acceptedAnswer:{'@type':'Answer',text:aa.replace(/\*|\[|\]\([^)]*\)/g,'')}}))}]:[])};
  const s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(ld);document.head.appendChild(s);
  const T=[...$('a-toc').querySelectorAll('a')],H=T.map(x=>document.getElementById(x.getAttribute('href').slice(1)));
  const spy=()=>{let n=0;H.forEach((h,i)=>{if(h&&h.getBoundingClientRect().top<innerHeight*.35)n=i;});T.forEach((x,i)=>x.classList.toggle('on',i===n));};addEventListener('scroll',spy,{passive:true});spy();}};
document.querySelectorAll('[data-jr]').forEach(JR.mini);
window.JR=JR;})();
