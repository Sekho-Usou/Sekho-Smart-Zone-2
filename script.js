// product.js - Product Detail Page Logic

document.addEventListener('DOMContentLoaded', () => {
  loadProductDetails();
  loadRelatedProducts();
});

/* ---------- LOAD PRODUCT FROM URL PARAMS ---------- */
function loadProductDetails() {
  const params = new URLSearchParams(window.location.search);
  
  // Extract data from URL
  const name = params.get('name') || 'Product Name';
  const price = params.get('price') || '0';
  const discount = params.get('disc') || '';
  const image = params.get('img') || 'Picture/placeholder.jpg';
  const description = params.get('desc') || '';
  const whatsappUrl = params.get('url') || '#';
  const category = params.get('cat') || 'all';
  
  // Populate DOM
  document.getElementById('detailName').textContent = name;
  document.getElementById('detailPrice').textContent = '₹' + price;
  document.getElementById('detailDisc').textContent = discount;
  document.getElementById('detailBuy').href = whatsappUrl;
  
  // Main image
  const mainImg = document.getElementById('detailMain');
  mainImg.src = image;
  mainImg.alt = name;
  
  // Thumbnail strip - since no admin, create single thumb or multiple if available
  const thumbStrip = document.getElementById('thumbStrip');
  
  // For demo purposes, show the main image as thumbnail
  // In a real scenario with multiple images, you'd pass them as img1, img2, etc.
  const thumbs = [image]; // Could expand to [image, image2, image3] if available
  
  if (thumbs.length > 1) {
    thumbs.forEach((thumbSrc, index) => {
      const img = document.createElement('img');
      img.src = thumbSrc;
      img.className = index === 0 ? 'active' : '';
      img.onclick = () => {
        mainImg.src = thumbSrc;
        document.querySelectorAll('.thumb-strip img').forEach(t => t.classList.remove('active'));
        img.classList.add('active');
      };
      thumbStrip.appendChild(img);
    });
  } else {
    // If only one image, hide thumbnail strip or show single thumb
    thumbStrip.style.display = 'none';
  }
}

/* ---------- RELATED PRODUCTS (HARDCODED - NO ADMIN) ---------- */
// Sample products from your existing inventory
const relatedInventory = [
  {
    name: 'Mi Earpiece',
    price: '499',
    image: 'Picture/mi_earpiece.WEBP',
    cat: 'earpiece',
    url: 'https://wa.me/919862494804?text=I want to buy Mi earpiece'
  },
  {
    name: '120W Mi Charger',
    price: '999',
    image: 'Picture/120W Mi.JPG',
    cat: 'charger',
    url: 'https://wa.me/919862494804?text=I want to buy 120W Mi Charger'
  },
  {
    name: 'Mi 20000mAh Power Bank',
    price: '2499',
    image: 'Picture/mi_powerbank.JPG',
    cat: 'powerbank',
    url: 'https://wa.me/919862494804?text=I want to buy 20000mAh Power Bank'
  },
  {
    name: '25W Samsung Adapter',
    price: '1199',
    image: 'Picture/25W sm.JPG',
    cat: 'adapter',
    url: 'https://wa.me/919862494804?text=I want to buy 25W Samsung Adapter'
  },
  {
    name: 'Bluei Earpiece',
    price: '149',
    image: 'Picture/bluei earpiece.WEBP',
    cat: 'earpiece',
    url: 'https://wa.me/919862494804?text=I want to buy Bluei Earpiece'
  },
  {
    name: '65W Realme Cable',
    price: '249',
    image: 'Picture/65W realme cable.JPG',
    cat: 'cable',
    url: 'https://wa.me/919862494804?text=I want to buy 65W Realme Fast Charging Cable'
  }
];

function loadRelatedProducts() {
  const params = new URLSearchParams(window.location.search);
  const currentCat = params.get('cat') || 'all';
  const currentName = params.get('name') || '';
  
  const wrapper = document.getElementById('miniWrapper');
  if (!wrapper) return;
  
  // Filter related products by same category, exclude current product
  let related = relatedInventory.filter(p => 
    p.cat === currentCat && p.name !== currentName
  );
  
  // If no same-category items or too few, fill with random others
  if (related.length < 4) {
    const others = relatedInventory.filter(p => 
      p.name !== currentName && !related.includes(p)
    );
    related = related.concat(others).slice(0, 6);
  }
  
  // Build HTML
  wrapper.innerHTML = related.map(product => `
    <div class="mini-card" onclick="navigateToProduct('${encodeURIComponent(product.name)}', '${product.price}', '${product.cat}', '${product.image}', '${encodeURIComponent(product.url)}')">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <p>${product.name}</p>
      <p style="color:#e63946;font-weight:700">₹${product.price}</p>
    </div>
  `).join('');
}

/* ---------- NAVIGATE TO ANOTHER PRODUCT ---------- */
function navigateToProduct(name, price, cat, img, url) {
  const params = new URLSearchParams({
    name: decodeURIComponent(name),
    price: price,
    cat: cat,
    img: img,
    url: decodeURIComponent(url)
  });
  
  window.location.href = 'product.html?' + params.toString();
}

/* ---------- DRAGGABLE MINI SLIDER ---------- */
const miniWrapper = document.getElementById('miniWrapper');
if (miniWrapper) {
  let down = false;
  let startX;
  let scrollLeft;

  miniWrapper.addEventListener('mousedown', (e) => {
    down = true;
    startX = e.pageX - miniWrapper.offsetLeft;
    scrollLeft = miniWrapper.scrollLeft;
  });

  miniWrapper.addEventListener('mouseleave', () => {
    down = false;
  });

  miniWrapper.addEventListener('mouseup', () => {
    down = false;
  });

  miniWrapper.addEventListener('mousemove', (e) => {
    if (!down) return;
    e.preventDefault();
    const x = e.pageX - miniWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    miniWrapper.scrollLeft = scrollLeft - walk;
  });
}