(function () {
  const data = [
    { name: 'Glycerin', fn: 'Hydration', what: 'A widely used humectant that helps hold water in the upper layers of skin.', context: 'Useful across many skin types and formats. Performance depends on the full formula and its supporting emollients.', pair: 'Most routine steps' },
    { name: 'Hyaluronic Acid', fn: 'Hydration', what: 'A family of humectants used to support surface hydration and a plumper-looking finish.', context: 'Best understood as one hydration tool, not a complete moisturizer by itself.', pair: 'Moisturizer on top' },
    { name: 'Niacinamide', fn: 'Balance', what: 'A form of vitamin B3 used for barrier support and a more even-looking appearance.', context: 'More is not always better; concentration, formula and individual tolerance matter.', pair: 'Moisturizer and SPF' },
    { name: 'Ceramides', fn: 'Barrier support', what: 'Skin-identical lipids often included in moisturizers designed to support barrier function.', context: 'Commonly combined with humectants and emollients in complete moisturizing systems.', pair: 'Glycerin or squalane' },
    { name: 'Salicylic Acid', fn: 'Exfoliation', what: 'A beta hydroxy acid used in cosmetic products for exfoliation and oil-prone areas.', context: 'Introduce gradually. Over-layering exfoliants can increase discomfort.', pair: 'Simple moisturizer and SPF' },
    { name: 'Vitamin C', fn: 'Antioxidant', what: 'A family of antioxidant ingredients used for brighter-looking skin and environmental support.', context: 'Derivative type, stability, packaging and the complete formula shape performance.', pair: 'Morning sunscreen' },
    { name: 'Azelaic Acid', fn: 'Tone support', what: 'An ingredient used in formulas focused on a more even-looking tone and calmer appearance.', context: 'Tolerance varies. Start slowly and introduce one active product at a time.', pair: 'Comfort moisturizer' },
    { name: 'Squalane', fn: 'Emollient', what: 'A lightweight emollient used to improve softness, slip and reduce moisture loss.', context: 'It supports comfort but does not replace every part of a complete moisturizer.', pair: 'Humectant serum' },
    { name: 'Zinc Oxide', fn: 'UV filter', what: 'A mineral ultraviolet filter used in properly formulated and tested sunscreens.', context: 'Rely only on finished sunscreens with verified SPF and broad-spectrum testing.', pair: 'Final morning step' },
    { name: 'Panthenol', fn: 'Comfort', what: 'Provitamin B5, used as a humectant and conditioning ingredient in comfort-focused formulas.', context: 'Often appears alongside glycerin, emollients and barrier-supporting ingredients.', pair: 'Simple routines' }
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
    detail.innerHTML = `<span class="eyebrow">${item.fn}</span><h2>${item.name}</h2><p class="lead">${item.what}</p><h3>Formula context</h3><p>${item.context}</p><h3>Common routine companion</h3><p>${item.pair}</p><div class="ingredient-products">${products.map(product => `<a class="ingredient-mini" href="product-details.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"><span><strong>${product.name}</strong><small>₹${product.price.toLocaleString('en-IN')}</small></span></a>`).join('')}</div><a class="btn btn-outline" href="shop.html?ingredient=${encodeURIComponent(item.name)}">Shop all with ${item.name}</a><p class="notice">General cosmetic functions only. Complete formulation, concentration and individual tolerance matter.</p>`;
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
