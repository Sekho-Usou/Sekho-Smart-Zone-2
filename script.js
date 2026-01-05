/* =================  SEKHO DEALS – SINGLE SCRIPT  ================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ----------  SEARCH  ---------- */
  const searchInput = document.getElementById('searchInput');
  const productCards = document.querySelectorAll('.product-card');

  if (searchInput) {
    searchInput.addEventListener('keyup', () => {
      const filter = searchInput.value.toLowerCase();
      productCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = name.includes(filter) ? 'block' : 'none';
      });
    });
  }

  /* ----------  CATEGORY FILTER  ---------- */
  window.filterProducts = function (category) {
    productCards.forEach(card => {
      card.style.display =
        category === 'all' || card.dataset.category === category ? 'block' : 'none';
    });
  };

  /* ----------  IMAGE SLIDER  ---------- */
  const slider = document.querySelector('.slider');
  const slidesContainer = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slides img'));
  const dotsContainer = document.querySelector('.dots');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  if (slider && slides.length) {
    let slideIndex = 0;
    let intervalId = null;
    const total = slides.length;

    /* create dots */
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.addEventListener('click', () => showSlide(i));
      dotsContainer.appendChild(dot);
    }
    const dots = Array.from(document.querySelectorAll('.dot'));

    function showSlide(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      slideIndex = index;
      slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      dots[slideIndex].classList.add('active');
    }

    function moveSlide(n) { showSlide(slideIndex + n); }

    prevBtn.addEventListener('click', () => moveSlide(-1));
    nextBtn.addEventListener('click', () => moveSlide(1));

    function startAuto() {
      stopAuto();
      intervalId = setInterval(() => moveSlide(1), 2000);
    }
    function stopAuto() { if (intervalId) clearInterval(intervalId); }

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    showSlide(0);
    startAuto();
  }


  /* ----------  MAKE CARD CLICKABLE  ---------- */
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
     // read the data that are already in the HTML
     const id = card.querySelector('h3').textContent.trim();   // unique name
     const cat = card.dataset.category;
     const img = card.querySelector('img').src;
     const price = card.querySelector('p:not(.discount)').textContent.trim();
     const disc = card.querySelector('.discount')?.textContent.trim() || '';
     const url   = card.querySelector('.buy-btn').href;        // WhatsApp link

     // pass everything as query-string
     const params = new URLSearchParams({ id, cat, img, price, disc, url });
     window.location = 'product.html?' + params.toString();
  });
});



  /* ----------  CHEF-STYLE DRAGGABLE FILTER STRIP  ---------- */
  const strip = document.querySelector('.filter-buttons');
  if (strip) {
    let down = false, startX, scrollLeft;

    /* touch */
    strip.addEventListener('touchstart', e => {
      down = true;
      strip.classList.add('grabbing');
      startX = e.touches[0].pageX - strip.offsetLeft;
      scrollLeft = strip.scrollLeft;
    }, {passive:true});

    strip.addEventListener('touchmove', e => {
      if (!down) return;
      const x = e.touches[0].pageX - strip.offsetLeft;
      strip.scrollLeft = scrollLeft - (x - startX) * 1.6;
    }, {passive:true});

    strip.addEventListener('touchend', () => {
      down = false;
      strip.classList.remove('grabbing');
    });

    /* mouse */
    strip.addEventListener('mousedown', e => {
      down = true;
      startX = e.pageX - strip.offsetLeft;
      scrollLeft = strip.scrollLeft;
      strip.classList.add('grabbing');
    });
    window.addEventListener('mousemove', e => {
      if (!down) return;
      strip.scrollLeft = scrollLeft - (e.pageX - strip.offsetLeft - startX) * 1.6;
    });
    window.addEventListener('mouseup', () => {
      down = false;
      strip.classList.remove('grabbing');
    });

    /* keep red glow on active button */
    strip.addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') return;
      strip.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
    });
  }

  console.log('Sekho Deals – search, filter, slider & chef-strip ready!');
});