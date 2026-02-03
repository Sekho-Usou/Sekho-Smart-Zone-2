/* ================= SEKHO SMART ZONE - DYNAMIC PRODUCT STORE ================= */

// Configuration
const CONFIG = {
  contactNumber: '919862494804', // Your WhatsApp number
  productsFolder: 'products'
};

// Store products globally
let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  initSlider();
  initSearch();
  initFilterStrip();
});

/* ---------- LOAD PRODUCTS FROM JSON FILES ---------- */
async function loadProducts() {
  try {
    // Try to load products.json (index of all products)
    const response = await fetch('products.json');    
    if (!response.ok) {
      // Fallback: manually scan directory or use static data
      throw new Error('Dynamic products not found');
    }
    
    const data = await response.json();
    allProducts = data.products || [];
    
    // Sort: newest first (based on filename/date if available)
    allProducts.reverse();
    
    renderProducts(allProducts);
    
  } catch (error) {
    console.log('Using fallback product loading:', error);
    // If CMS hasn't created files yet, show message or load static
    document.getElementById('productList').innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <p>Loading products from admin...</p>
        <p style="color: #666; font-size: 0.9rem; margin-top: 1rem;">
          If no products appear, add them via <a href="/admin/" style="color: #df0808;">Admin Panel</a>
        </p>
      </div>
    `;
  }
}

/* ---------- RENDER PRODUCTS ---------- */
function renderProducts(products) {
  const container = document.getElementById('productList');
  
  if (products.length === 0) {
    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center;">No products found. Add some via Admin!</div>';
    return;
  }
  
  container.innerHTML = products.map(product => createProductCard(product)).join('');
  
  // Add click handlers for product detail navigation
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('buy-btn')) return; // Let buy button work
      navigateToProduct(card.dataset.id);
    });
  });
}

function createProductCard(product) {
  const whatsappUrl = `https://wa.me/${CONFIG.contactNumber}?text=${encodeURIComponent(product.whatsappText || `I want to buy ${product.name}`)}`;
  
  const stockBadge = product.stock === 'out' 
    ? '<span style="position: absolute; top: 10px; right: 10px; background: #999; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">OUT OF STOCK</span>' 
    : '';
  
  const discountHtml = product.discount 
    ? `<p class="discount">${product.discount}</p>` 
    : '';
  
  const descHtml = product.description 
    ? `<p style="color: #666; font-size: 0.85rem; margin: 0.3rem 0;">${product.description}</p>` 
    : '';
  
  return `
    <div class="product-card" data-id="${product.slug || product.name}" data-category="${product.category}" tabindex="0">
      ${stockBadge}
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <h3>${product.name}</h3>
      ${descHtml}
      ${discountHtml}
      <p style="font-weight: 700; color: #111; font-size: 1.1rem; margin: 0.5rem 0;">₹${product.price}</p>
      <a href="${whatsappUrl}" class="buy-btn" target="_blank" ${product.stock === 'out' ? 'style="background: #999; pointer-events: none;"' : ''}>
        ${product.stock === 'out' ? 'Out of Stock' : 'Buy Now'}
      </a>
    </div>
  `;
}

/* ---------- NAVIGATE TO PRODUCT DETAIL ---------- */
function navigateToProduct(productId) {
  const product = allProducts.find(p => (p.slug || p.name) === productId);
  if (!product) return;
  
  const params = new URLSearchParams({
    id: product.slug || product.name,
    name: product.name,
    cat: product.category,
    img: product.image,
    price: product.price,
    disc: product.discount || '',
    desc: product.description || '',
    stock: product.stock,
    url: `https://wa.me/${CONFIG.contactNumber}?text=${encodeURIComponent(product.whatsappText || `I want to buy ${product.name}`)}`
  });
  
  window.location.href = 'product.html?' + params.toString();
}

/* ---------- FILTER PRODUCTS ---------- */
function filterProducts(category) {
  const cards = document.querySelectorAll('.product-card');
  
  cards.forEach(card => {
    const shouldShow = category === 'all' || card.dataset.category === category;
    card.style.display = shouldShow ? 'block' : 'none';
  });
  
  // Update active button state
  document.querySelectorAll('.filter-buttons button').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}

/* ---------- SEARCH ---------- */
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  searchInput.addEventListener('keyup', () => {
    const filter = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = name.includes(filter) ? 'block' : 'none';
    });
  });
}

/* ---------- IMAGE SLIDER ---------- */
function initSlider() {
  const slider = document.querySelector('.slider');
  const slidesContainer = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slides img'));
  const dotsContainer = document.querySelector('.dots');
  
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
    dots.forEach(d => d.classList.remove('active'));
    dots[slideIndex].classList.add('active');
  }

  function moveSlide(n) {
    showSlide(slideIndex + n);
  }

  document.querySelector('.prev')?.addEventListener('click', () => moveSlide(-1));
  document.querySelector('.next')?.addEventListener('click', () => moveSlide(1));

  function startAuto() {
    stopAuto();
    intervalId = setInterval(() => moveSlide(1), 2000);
  }
  
  function stopAuto() {
    if (intervalId) clearInterval(intervalId);
  }

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  showSlide(0);
  startAuto();
}

/* ---------- DRAGGABLE FILTER STRIP ---------- */
function initFilterStrip() {
  const strip = document.querySelector('.filter-buttons');
  if (!strip) return;
  
  let down = false, startX, scrollLeft;

  // Touch events
  strip.addEventListener('touchstart', e => {
    down = true;
    strip.classList.add('grabbing');
    startX = e.touches[0].pageX - strip.offsetLeft;
    scrollLeft = strip.scrollLeft;
  }, {passive: true});

  strip.addEventListener('touchmove', e => {
    if (!down) return;
    const x = e.touches[0].pageX - strip.offsetLeft;
    strip.scrollLeft = scrollLeft - (x - startX) * 1.6;
  }, {passive: true});

  strip.addEventListener('touchend', () => {
    down = false;
    strip.classList.remove('grabbing');
  });

  // Mouse events
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
}