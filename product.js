/* ----------  READ URL PARAMS  ---------- */
const params = new URLSearchParams(location.search);
const id    = params.get('id');
const cat   = params.get('cat');
const img   = params.get('img');
const price = params.get('price');
const disc  = params.get('disc');
const url   = params.get('url');

document.getElementById('detailImg').src   = img;
document.getElementById('detailName').textContent = id;
document.getElementById('detailPrice').textContent = price;
document.getElementById('detailDisc').textContent  = disc;
document.getElementById('detailBuy').href = url;

/* ----------  BUILD “YOU MAY ALSO LIKE” SLIDER  ---------- */
fetch('index.html')
  .then(r => r.text())
  .then(html => {
     const doc = new DOMParser().parseFromString(html, 'text/html');
     const same = [...doc.querySelectorAll('.product-card')]
                  .filter(card => card.dataset.category === cat && card.querySelector('h3').textContent.trim() !== id);

     const wrap = document.getElementById('miniWrapper');
     same.slice(0,8).forEach(card => {
        const clone = card.cloneNode(true);
        clone.className = 'mini-card';

        /* ----  read data from the cloned card  ---- */
        const miniId   = clone.querySelector('h3').textContent.trim();
        const miniCat  = clone.dataset.category;
        const miniImg  = clone.querySelector('img').src;
        const miniPr   = clone.querySelector('p:not(.discount)').textContent.trim();
        const miniDisc = clone.querySelector('.discount')?.textContent.trim() || '';
        const miniUrl  = clone.querySelector('.buy-btn').href;

        /* ----  build same query-string we use for the big card  ---- */
        const params = new URLSearchParams({
            id: miniId, cat: miniCat, img: miniImg,
            price: miniPr, disc: miniDisc, url: miniUrl
        });

        /* ----  wipe old button & make whole card a hyperlink  ---- */
        clone.querySelector('.buy-btn')?.remove();
        clone.addEventListener('click', () => {
            location.href = 'product.html?' + params.toString();
        });

        wrap.appendChild(clone);
     });
  });