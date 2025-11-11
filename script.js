
// Search function
const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");

searchInput.addEventListener("keyup", () => {
  const filter = searchInput.value.toLowerCase();
  productCards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(filter) ? "inline-block" : "none";
  });
});

// Category filter
function filterProducts(category) {
  productCards.forEach(card => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "inline-block";
    } else {
      card.style.display = "none";
    }
  });
}

console.log("Sekho Gadgets website with search and filter loaded!");

// ==========  NEW ARROW-SLIDER CODE  ==========
const slider = document.getElementById("filterSlider");
const leftBtn  = document.querySelector(".scroll-btn.left");
const rightBtn = document.querySelector(".scroll-btn.right");

if (slider && leftBtn && rightBtn) {   // safety check
  leftBtn.addEventListener("click",  () => slider.scrollBy({left:-160, behavior:"smooth"}));
  rightBtn.addEventListener("click", () => slider.scrollBy({left: 160, behavior:"smooth"}));
}