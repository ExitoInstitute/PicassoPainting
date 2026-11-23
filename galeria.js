// Galería: carrusel de la portada, franja de fotos en cada página y cuadrícula de galeria.html
(function(){
const N=32,photos=Array.from({length:N},(_,i)=>'img/galeria/g'+String(i+1).padStart(2,'0')+'.jpg');
const alt='Picasso Painting project photo';
const arrow=(cls,label,txt)=>`<button type="button" class="gal-arrow ${cls}" aria-label="${label}">${txt}</button>`;

// Portada: la foto actual del hero pasa a ser la primera de un carrusel con flechas.
const hero=document.querySelector('.hero-photo');
if(hero){
  const img=hero.querySelector('img'),slides=[img.src,...photos.slice(0,6)];let i=0;
  hero.insertAdjacentHTML('beforeend',arrow('gal-prev','Previous photo','‹')+arrow('gal-next','Next photo','›'));
  const go=d=>{i=(i+d+slides.length)%slides.length;img.src=slides[i];img.alt=i?alt:img.dataset.alt;new Image().src=slides[(i+1)%slides.length];};
  img.dataset.alt=img.alt;
  hero.querySelector('.gal-prev').onclick=()=>go(-1);
  hero.querySelector('.gal-next').onclick=()=>go(1);
}

// Franja tipo collage (4 fotos) con flechas, en todas las páginas.
const banner=document.querySelector('[data-gal-banner]');
if(banner){
  const per=4,groups=Math.ceil(N/per);let g=Math.floor(Math.random()*groups);
  banner.innerHTML=`<div class="wrap"><div class="gal-head"><div><div class="eyebrow">Project gallery</div><h2>Our recent work</h2></div><div class="gal-controls">${arrow('gal-prev','Previous photos','‹')}${arrow('gal-next','Next photos','›')}</div></div><div class="gal-row"></div><a class="text-link gal-more" href="galeria.html">View full gallery</a></div>`;
  const row=banner.querySelector('.gal-row');
  const show=()=>{row.innerHTML=[0,1,2,3].map(k=>`<img src="${photos[(g*per+k)%N]}" alt="${alt}" loading="lazy" decoding="async">`).join('');};
  banner.querySelector('.gal-prev').onclick=()=>{g=(g-1+groups)%groups;show();};
  banner.querySelector('.gal-next').onclick=()=>{g=(g+1)%groups;show();};
  show();
}

// Página de galería: todas las fotos; cada una abre a tamaño completo.
const grid=document.querySelector('[data-gal-grid]');
// Menú móvil: al tocar Painting/Scaffolding dentro de Servicios, cerrar el menú.
document.querySelectorAll('.nav-sub a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.nav').classList.remove('open');document.querySelector('.menu')?.setAttribute('aria-expanded','false');}));

if(grid)grid.innerHTML=photos.map(p=>`<a href="${p}" target="_blank" rel="noopener"><img src="${p}" alt="${alt}" loading="lazy" decoding="async"></a>`).join('');
})();
