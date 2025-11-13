/* ================= SEKHO DEALS SCRIPT ================= */
document.addEventListener('DOMContentLoaded', () => {
  /* ---------- SEARCH FUNCTION ---------- */
  const searchInput = document.getElementById("searchInput");
  const productCards = document.querySelectorAll(".product-card");

  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      const filter = searchInput.value.toLowerCase();
      productCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(filter) ? "block" : "none";
      });
    });
  }

  /* ---------- CATEGORY FILTER ---------- */
  window.filterProducts = function(category) {
    productCards.forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };

  /* ---------- IMAGE SLIDER ---------- */
  const slider = document.querySelector('.slider');
  const slidesContainer = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slides img'));
  const dotsContainer = document.querySelector('.dots');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  if (!slider || slides.length === 0) return;

  let slideIndex = 0;
  let intervalId = null;
  const total = slides.length;

  // Create dots
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
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
  }

  function moveSlide(n) { showSlide(slideIndex + n); }

  prevBtn.addEventListener('click', () => moveSlide(-1));
  nextBtn.addEventListener('click', () => moveSlide(1));

  function startAuto() {
    stopAuto();
    intervalId = setInterval(() => moveSlide(1), 2000); // 2 seconds
  }

  function stopAuto() {
    if (intervalId) clearInterval(intervalId);
  }

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  // Swipe support for touch devices
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
  slider.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) moveSlide(diff > 0 ? -1 : 1);
  });

  // Initialize
  showSlide(0);
  startAuto();

  console.log("Sekho Deals website fully loaded with Search, Filter & Slider!");
});
