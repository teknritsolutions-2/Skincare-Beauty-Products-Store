(function () {
  const data = [
    { name: 'Glycerin', fn: 'Hydration', image: '../assets/images/ingredients/glycerin.jpg', what: 'A widely used humectant that helps hold water in the upper layers of skin.', context: 'Useful across many skin types and formats. Performance depends on the full formula and its supporting emollients.', pair: 'Most routine steps' },
    { name: 'Hyaluronic Acid', fn: 'Hydration', image: '../assets/images/ingredients/hyaluronic-acid.jpg', what: 'A family of humectants used to support surface hydration and a plumper-looking finish.', context: 'Best understood as one hydration tool, not a complete moisturizer by itself.', pair: 'Moisturizer on top' },
    { name: 'Niacinamide', fn: 'Balance', image: '../assets/images/ingredients/niacinamide.jpg', what: 'A form of vitamin B3 used for barrier support and a more even-looking appearance.', context: 'More is not always better; concentration, formula and individual tolerance matter.', pair: 'Moisturizer and SPF' },
    { name: 'Ceramides', fn: 'Barrier support', image: '../assets/images/ingredients/ceramides.jpg', what: 'Skin-identical lipids often included in moisturizers designed to support barrier function.', context: 'Commonly combined with humectants and emollients in complete moisturizing systems.', pair: 'Glycerin or squalane' },
    { name: 'Salicylic Acid', fn: 'Exfoliation', image: '../assets/images/ingredients/salicylic-acid.jpg', what: 'A beta hydroxy acid used in cosmetic products for exfoliation and oil-prone areas.', context: 'Introduce gradually. Over-layering exfoliants can increase discomfort.', pair: 'Simple moisturizer and SPF' },
    { name: 'Vitamin C', fn: 'Antioxidant', image: '../assets/images/ingredients/vitamin-c.jpg', what: 'A family of antioxidant ingredients used for brighter-looking skin and environmental support.', context: 'Derivative type, stability, packaging and the complete formula shape performance.', pair: 'Morning sunscreen' },
    { name: 'Azelaic Acid', fn: 'Tone support', image: '../assets/images/ingredients/azelaic-acid.jpg', what: 'An ingredient used in formulas focused on a more even-looking tone and calmer appearance.', context: 'Tolerance varies. Start slowly and introduce one active product at a time.', pair: 'Comfort moisturizer' },
    { name: 'Squalane', fn: 'Emollient', image: '../assets/images/ingredients/squalane.jpg', what: 'A lightweight emollient used to improve softness, slip and reduce moisture loss.', context: 'It supports comfort but does not replace every part of a complete moisturizer.', pair: 'Humectant serum' },
    { name: 'Zinc Oxide', fn: 'UV filter', image: '../assets/images/ingredients/zinc-oxide.jpg', what: 'A mineral ultraviolet filter used in properly formulated and tested sunscreens.', context: 'Rely only on finished sunscreens with verified SPF and broad-spectrum testing.', pair: 'Final morning step' },
    { name: 'Panthenol', fn: 'Comfort', image: '../assets/images/ingredients/panthenol.jpg', what: 'Provitamin B5, used as a humectant and conditioning ingredient in comfort-focused formulas.', context: 'Often appears alongside glycerin, emollients and barrier-supporting ingredients.', pair: 'Simple routines' }
  ];
  window.Ingredients = data;
  const list = document.querySelector('#ingredientList');
  if (!list) return;
  const detail = document.querySelector('#ingredientDetail');
  const search = document.querySelector('#ingredientSearch');
  const functionFilter = document.querySelector('#ingredientFunction');
  let active = new URLSearchParams(location.search).get('ingredient') || data[0].name;

  function renderDetail() {
    const item = data.find(entry => entry.name === active) || data[0];
    const products = Products.filter(product => product.ingredients.includes(item.name)).slice(0, 3);
    detail.innerHTML = `<article class="ingredient-detail-card">
      <div class="ingredient-hero">
        <div class="ingredient-visual-wrap">
          <img class="ingredient-visual" src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="ingredient-hero-copy">
          <span class="eyebrow">${item.fn}</span>
          <h2>${item.name}</h2>
          <p class="lead">${item.what}</p>
        </div>
      </div>
      <div class="ingredient-meta-grid">
        <div class="meta-card">
          <span class="meta-label">Formula Context</span>
          <p>${item.context}</p>
        </div>
        <div class="meta-card">
          <span class="meta-label">Common Companions</span>
          <p>${item.pair}</p>
        </div>
      </div>
      <div class="ingredient-products-section">
        <div class="section-topline">
          <h3>Arenne formulations with ${item.name}</h3>
          <a class="btn btn-text" href="shop.html?ingredient=${encodeURIComponent(item.name)}">View all (${products.length})</a>
        </div>
        <div class="ingredient-products-grid">
          ${products.map(product => `<article class="ingredient-product-card">
            <a class="ingredient-product-media" href="product-details.html?id=${product.id}">
              <img src="${product.image}" alt="${product.name}" loading="lazy">
            </a>
            <div class="ingredient-product-body">
              <div>
                <span class="kicker">${product.category}</span>
                <h4><a href="product-details.html?id=${product.id}">${product.name}</a></h4>
              </div>
              <strong class="price">₹${product.price.toLocaleString('en-IN')}</strong>
            </div>
          </article>`).join('')}
        </div>
      </div>
      <div class="ingredient-footer-action">
        <a class="btn btn-primary" href="shop.html?ingredient=${encodeURIComponent(item.name)}">Shop all products with ${item.name}</a>
        <p class="notice">General cosmetic functions only. Complete formulation, concentration and individual tolerance matter.</p>
      </div>
    </article>`;
    const url = new URL(location); url.searchParams.set('ingredient', item.name); history.replaceState({}, '', url);
  }
  function render() {
    const query = search.value.toLowerCase();
    const selectedFunction = functionFilter.value;
    const shown = data.filter(item => item.name.toLowerCase().includes(query) && (selectedFunction === 'All' || item.fn === selectedFunction));
    list.innerHTML = shown.length ? shown.map(item => `<button class="ingredient-btn${item.name === active ? ' active' : ''}" type="button" data-name="${item.name}"><strong>${item.name}</strong><br><small>${item.fn}</small></button>`).join('') : '<p>No ingredients match that search.</p>';
    renderDetail();
  }
  list.addEventListener('click', event => { const button = event.target.closest('.ingredient-btn'); if (button) { active = button.dataset.name; render(); } });
  search.addEventListener('input', render); functionFilter.addEventListener('change', render); render();
})();
