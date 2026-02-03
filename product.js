/* =========================================================
   PRODUCT-DETAIL PAGE  –  reads admin/db.json  (no more hard-code)
   ========================================================= */

/* ----------  READ URL PARAMS  ---------- */
const params = new URLSearchParams(location.search);
const id     = params.get('id');   // product name
const cat    = params.get('cat');

let fullDB = [];          // will hold every product

/* ----------  LOAD CENTRAL DB  ---------- */
fetch('../admin/db.json')
  .then(r => r.json())
  .then(db => {
     fullDB = db;
     renderProduct();     // fill left + right column
     renderMiniSlider();  // bottom “you may also like”
  })
  .catch(err => {
     console.error(err);
     alert('Product database not reachable');
   });

/* ----------  RENDER THIS PRODUCT  ---------- */
function renderProduct(){
  const p = fullDB.find(item => item.name === id);
  if (!p){ location.href = 'index.html'; return; }

  /* right-column info */
  document.getElementById('detailName').textContent  = p.name;
  document.getElementById('detailPrice').textContent = '₹' + p.price;
  document.getElementById('detailDisc').textContent  = p.disc || '';
  document.getElementById('detailBuy').href          = p.url;
  if (p.stock === 'out') {
      const btn = document.getElementById('detailBuy');
      btn.textContent = 'Out of stock';
      btn.style.background = '#999';
      btn.style.pointerEvents = 'none';
  }

  /* gallery – main + thumbs */
  const mainPic = document.getElementById('detailMain');
  mainPic.src = p.img;
  const strip = document.getElementById('thumbStrip');
  strip.innerHTML = '';

  function addThumb(src, active = false){
    const t = document.createElement('img');
    t.src = src;zz
    if (active) t.classList.add('active');
    t.addEventListener('click', () => {
      mainPic.src = src;
      strip.querySelectorAll('img').forEach(i => i.classList.remove('active'));
      t.classList.add('active');
    });
    strip.appendChild(t);
  }
  /* main thumb first, then extras */
  addThumb(p.img, true);
  (p.imgs || []).forEach(u => addThumb(u));
}

/* ----------  “YOU MAY ALSO LIKE”  ---------- */
function renderMiniSlider(){
  const same = fullDB.filter(item => item.cat === cat && item.name !== id).slice(0, 8);
  const wrap = document.getElementById('miniWrapper');
  wrap.innerHTML = '';

  same.forEach(p => {
    const card = document.createElement('div');
    card.className = 'mini-card';

    /* mini thumbnail strip (max 2 extras) */
    card.innerHTML = `
      <img class="thumb-main" src="${p.img}" alt="${p.name}">
      <div class="thumb-strip">
        ${(p.imgs||[]).slice(0,2).map(u=>`<img src="${u}" style="width:32px;height:32px">`).join('')}
      </div>
      <p>${p.name}</p>
      <p style="font-weight:700;color:#e63946">₹${p.price}</p>`;

    /* click whole card → go to that product */
    card.onclick = () => {
      const q = new URLSearchParams({
        id: p.name, cat: p.cat, img: p.img, price: p.price,
        disc: p.disc || '', url: p.url
      });
      location.href = 'product.html?' + q.toString();
    };
    wrap.appendChild(card);
  });
}

