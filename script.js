// ========== PRODUCT DATA ==========
const products = [
  { id: 1, title: 'Mi Earpiece', price: 499, originalPrice: 587, discount: '15% OFF', category: 'earpiece', image: 'Picture/mi_earpiece.WEBP', stock: 'in', whatsappText: 'I want to buy Mi earpiece' },
  { id: 2, title: '120W Mi Charger', price: 999, originalPrice: 2270, discount: '56% OFF', category: 'charger', image: 'Picture/120W Mi.JPG', stock: 'in', whatsappText: 'I want to buy 120W Mi Charger' },
  { id: 3, title: '25W BlackKat Cable', price: 149, originalPrice: 186, discount: '20% OFF', category: 'cable', image: 'Picture/25W blackkat.JPG', stock: 'in', whatsappText: 'I want to buy 25W BlackKat Cable', desc: 'USB-A to Type C' },
  { id: 4, title: 'AUX Cable', price: 149, originalPrice: 213, discount: '30% OFF', category: 'other', image: 'Picture/etar aux.JPG', stock: 'in', whatsappText: 'I want to buy AUX' },
  { id: 5, title: 'Mi 20000mAh Power Bank', price: 2499, originalPrice: 3570, discount: '30% OFF', category: 'powerbank', image: 'Picture/mi_powerbank.JPG', stock: 'in', whatsappText: 'I want to buy 20000mAh Power Bank' },
  { id: 6, title: '120W Oppo Charger', price: 999, originalPrice: 2270, discount: '56% OFF', category: 'charger', image: 'Picture/120W Oppo.JPG', stock: 'in', whatsappText: 'I want to buy 120W Oppo Charger' },
  { id: 7, title: 'Original Android Battery', price: 1199, originalPrice: 2180, discount: '45% OFF', category: 'battery', image: 'Picture/Bali Battery.JPG', stock: 'in', whatsappText: 'I want to buy Android Battery', desc: 'Android Battery' },
  { id: 8, title: '85W Realme Charger', price: 599, originalPrice: 1498, discount: '60% OFF', category: 'charger', image: 'Picture/85W Realme.JPG', stock: 'in', whatsappText: 'I want to buy 85W Realme Charger' },
  { id: 9, title: 'Bluetooth Speaker', price: 1499, originalPrice: 1999, discount: '25% OFF', category: 'speaker', image: 'https://via.placeholder.com/300', stock: 'limited', whatsappText: 'I want to buy Bluetooth Speaker' },
  { id: 10, title: '25W Samsung Adapter', price: 1199, originalPrice: 1599, discount: '25% OFF', category: 'adapter', image: 'Picture/25W sm.JPG', stock: 'in', whatsappText: 'I want to buy 25W Samsung Adapter' },
  { id: 11, title: '120W OnePlus Charger', price: 999, originalPrice: 2270, discount: '56% OFF', category: 'charger', image: 'Picture/120W Oneplus.JPG', stock: 'in', whatsappText: 'I want to buy 120W Oneplus Charger' },
  { id: 12, title: 'C to Lightning Cable', price: 799, originalPrice: 1998, discount: '60% OFF', category: 'cable', image: 'Picture/C to Lightning Cable.JPG', stock: 'in', whatsappText: 'I want to buy C to Lightning Cable' },
  { id: 13, title: 'USB to Lightning Cable', price: 699, originalPrice: 1553, discount: '55% OFF', category: 'cable', image: 'Picture/USB to Lightning.JPG', stock: 'in', whatsappText: 'I want to buy USB to Lightning Cable' },
  { id: 14, title: '65W Realme Fast Charging Cable', price: 249, originalPrice: 498, discount: '50% OFF', category: 'cable', image: 'Picture/65W realme cable.JPG', stock: 'in', whatsappText: 'I want to buy 65W Realme Fast Charging Cable', desc: 'USB-A to Micro USB' },
  { id: 15, title: '35W Apple Adapter', price: 2499, originalPrice: 4165, discount: '40% OFF', category: 'adapter', image: 'Picture/35w_adapter.JPG', stock: 'in', whatsappText: 'I want to buy 35W Apple Adapter', desc: 'USB C + C' },
  { id: 16, title: '85W Oppo Charger', price: 599, originalPrice: 1498, discount: '60% OFF', category: 'charger', image: 'Picture/85W Oppo.JPG', stock: 'in', whatsappText: 'I want to buy 85W Oppo Charger' },
  { id: 17, title: 'Bluei Earpiece', price: 149, originalPrice: 186, discount: '20% OFF', category: 'earpiece', image: 'Picture/bluei earpiece.WEBP', stock: 'in', whatsappText: 'I want to buy Bluei Earpiece', desc: 'Bluei Earpiece' },
  { id: 18, title: '65W Vivo Fast Charging Cable', price: 249, originalPrice: 498, discount: '50% OFF', category: 'cable', image: 'Picture/65W vivo cable.JPG', stock: 'in', whatsappText: 'I want to buy 65W Vivo Fast Charging Cable', desc: 'USB-A to Micro USB' },
  { id: 19, title: '45W Samsung Adapter', price: 2499, originalPrice: 3570, discount: '30% OFF', category: 'adapter', image: 'Picture/45W sm.JPG', stock: 'in', whatsappText: 'I want to buy 45W Samsung Adapter' },
  { id: 20, title: '65W Mi Fast Charging Cable', price: 249, originalPrice: 498, discount: '50% OFF', category: 'cable', image: 'Picture/65W mi cable.JPG', stock: 'in', whatsappText: 'I want to buy 65W Mi Fast Charging Cable', desc: 'USB-A to Micro USB' },
  { id: 21, title: 'Lightning to Jack', price: 299, originalPrice: 598, discount: '50% OFF', category: 'other', image: 'Picture/lightning to jack.JPG', stock: 'in', whatsappText: 'I want to buy Lightning to Jack', desc: 'For iPhone' },
  { id: 22, title: 'Type C to C Fast Charging Cable', price: 899, originalPrice: 2248, discount: '60% OFF', category: 'cable', image: 'Picture/type c to c.JPG', stock: 'in', whatsappText: 'I want to buy Type C to C Fast Charging Cable', desc: 'Type C to C' },
  { id: 23, title: '20W Apple Adapter', price: 1499, originalPrice: 1897, discount: '21% OFF', category: 'adapter', image: 'Picture/20w_adapter.PNG', stock: 'in', whatsappText: 'I want to buy 20W Apple Adapter', desc: 'USB C + C' },
  { id: 24, title: '85W Vivo Charger', price: 599, originalPrice: 1498, discount: '60% OFF', category: 'charger', image: 'Picture/85W Vivo.JPG', stock: 'in', whatsappText: 'I want to buy 85W Vivo Charger' },
  { id: 25, title: '65W Oneplus Fast Charging Cable', price: 249, originalPrice: 498, discount: '50% OFF', category: 'cable', image: 'Picture/65W oneplus cable.JPG', stock: 'in', whatsappText: 'I want to buy 65W Oneplus Fast Charging Cable', desc: 'USB-A to Micro USB' },
  { id: 26, title: '120W Realme Charger', price: 999, originalPrice: 2270, discount: '56% OFF', category: 'charger', image: 'Picture/120W Realme.JPG', stock: 'in', whatsappText: 'I want to buy 120W Realme Charger' },
  { id: 27, title: '65W Oppo Fast Charging Cable', price: 249, originalPrice: 498, discount: '50% OFF', category: 'cable', image: 'Picture/65W oppo cable.JPG', stock: 'in', whatsappText: 'I want to buy 65W Oppo Fast Charging Cable', desc: 'USB-A to Micro USB' },
  { id: 28, title: 'iPhone 11 Battery', price: 1799, originalPrice: 3598, discount: '50% OFF', category: 'battery', image: 'Picture/Iphone 11 Battery.JPG', stock: 'in', whatsappText: 'I want to buy iPhone 11 Battery', desc: 'iPhone 11 Battery' },
  { id: 29, title: 'Mobicrown iPhone Battery', price: 1499, originalPrice: 2498, discount: '40% OFF', category: 'battery', image: 'Picture/Mobicrown Battery.JPG', stock: 'in', whatsappText: 'I want to buy Mobicrown iPhone Battery', desc: 'iPhone Battery' },
  { id: 30, title: 'Etar Charger 2', price: 299, originalPrice: 460, discount: '35% OFF', category: 'charger', image: 'Picture/Etar Charger 2.JPG', stock: 'in', whatsappText: 'I want to buy Etar Charger 2', desc: 'Etar Charger' },
  { id: 31, title: 'Bali iPhone Battery', price: 1499, originalPrice: 2998, discount: '50% OFF', category: 'battery', image: 'Picture/Bali Battery.JPG', stock: 'in', whatsappText: 'I want to buy Bali iPhone Battery', desc: 'iPhone Battery' },
  { id: 32, title: 'Etar Charger', price: 299, originalPrice: 460, discount: '35% OFF', category: 'charger', image: 'Picture/Etar Charger.JPG', stock: 'in', whatsappText: 'I want to buy Etar Charger', desc: 'Etar Charger' },
  { id: 33, title: 'Mobicrown Android Battery', price: 1199, originalPrice: 1998, discount: '40% OFF', category: 'battery', image: 'Picture/Mobicrown Battery.JPG', stock: 'in', whatsappText: 'I want to buy Mobicrown Android Battery', desc: 'Android Battery' }
];

// ========== STATE ==========
let currentSlide = 0;
let isAutoPlaying = true;
let autoPlayInterval;
let currentFilter = 'all';

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  startAutoPlay();
  setupHeaderScroll();
  setupFilterDrag();
  setupScrollAnimations();
});

// ========== HEADER FUNCTIONS ==========
function setupHeaderScroll() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');

  menu.classList.toggle('open');
  if (menu.classList.contains('open')) {
    menuIcon.style.display = 'none';
    closeIcon.style.display = 'block';
  } else {
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  }
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });

    // Update active nav
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + sectionId) {
        link.classList.add('active');
      }
    });

    // Close mobile menu
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('menuIcon').style.display = 'block';
    document.getElementById('closeIcon').style.display = 'none';
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shareStore() {
  const shareData = {
    title: 'Sekho Smart Zone',
    text: 'Check out Sekho Smart Zone - Mobile Accessories and Electronics!',
    url: window.location.origin
  };

  if (navigator.share) {
    navigator.share(shareData);
  } else {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text + '\n' + shareData.url)}`;
    window.open(whatsappUrl, '_blank');
  }
}

// ========== HERO SLIDER ==========
function showSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const contents = document.querySelectorAll('.hero-slide-content');
  const dots = document.querySelectorAll('.hero-dot');

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  contents.forEach((content, i) => {
    content.classList.toggle('active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentSlide = index;
}

function nextSlide() {
  showSlide((currentSlide + 1) % 4);
}

function prevSlide() {
  showSlide((currentSlide - 1 + 4) % 4);
}

function goToSlide(index) {
  showSlide(index);
}

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000);
}

function pauseAutoPlay() {
  clearInterval(autoPlayInterval);
}

function resumeAutoPlay() {
  if (isAutoPlaying) {
    startAutoPlay();
  }
}

// ========== PRODUCTS FUNCTIONS ==========
function renderProducts(filter = 'all', searchTerm = '') {
  const container = document.getElementById('productList');
  let filtered = products;

  if (filter !== 'all') {
    filtered = filtered.filter(p => p.category === filter);
  }

  if (searchTerm) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  container.innerHTML = filtered.map(product => `
    <div class="product-card" data-category="${product.category}">
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy" onerror="this.src='https://via.placeholder.com/300'">
        ${product.discount ? `<span class="product-discount">${product.discount}</span>` : ''}
        <span class="product-stock ${product.stock}">${product.stock === 'in' ? 'In Stock' : product.stock === 'limited' ? 'Limited' : 'Out of Stock'}</span>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3 class="product-title">${product.title}</h3>
        ${product.desc ? `<p class="product-desc">${product.desc}</p>` : ''}
        <div class="product-price-row">
          <div class="product-price">
            <span class="current-price">₹${product.price}</span>
            ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
          </div>
        </div>
        <a href="https://wa.me/919862494804?text=${encodeURIComponent(product.whatsappText)}" target="_blank" class="product-buy-btn">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Buy Now
        </a>
      </div>
    </div>
  `).join('');
}

function filterProducts(category) {
  currentFilter = category;

  // Update button states
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    const btnText = btn.textContent.toLowerCase();
    if ((category === 'all' && btn.textContent === 'All') ||
        (category === 'earpiece' && btnText.includes('earpiece')) ||
        (category === 'cable' && btnText.includes('cable')) ||
        (category === 'charger' && btnText.includes('charger')) ||
        (category === 'speaker' && btnText.includes('speaker')) ||
        (category === 'adapter' && btnText.includes('adapter')) ||
        (category === 'powerbank' && btnText.includes('power')) ||
        (category === 'battery' && btnText.includes('battery')) ||
        (category === 'other' && btnText.includes('other'))) {
      btn.classList.add('active');
    }
  });

  const searchTerm = document.getElementById('searchInput').value;
  renderProducts(category, searchTerm);
}

function searchProducts() {
  const searchTerm = document.getElementById('searchInput').value;
  renderProducts(currentFilter, searchTerm);
}

function setupFilterDrag() {
  const slider = document.getElementById('filterSlider');
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.cursor = 'grabbing';
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.style.cursor = 'grab';
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.cursor = 'grab';
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
}

// ========== SCROLL ANIMATIONS ==========
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .stat-card, .contact-method-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}