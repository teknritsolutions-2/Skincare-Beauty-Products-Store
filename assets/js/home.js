(function () {
  const bestsellers = document.querySelector('#homeBestsellers');
  if (bestsellers) bestsellers.innerHTML = Products.filter(product => product.badge === 'Bestseller').slice(0, 6).map(productCard).join('');

  const journalProducts = document.querySelector('#journalProducts');
  if (journalProducts) journalProducts.innerHTML = ['cleansing-balm', 'waterline-serum', 'ceramide-cloud', 'mineral-shield'].map(getProduct).map(productCard).join('');

  const skinGrid = document.querySelector('#skinCollection');
  const skinLink = document.querySelector('#skinCollectionLink');
  const tabs = document.querySelectorAll('[data-skin-tab]');
  function renderSkin(type) {
    if (!skinGrid) return;
    const items = Products.filter(product => product.available && (product.skin.includes(type) || product.skin.includes('All'))).slice(0, 4);
    skinGrid.innerHTML = items.map(productCard).join('');
    if (skinLink) { skinLink.href = `shop.html?skin=${encodeURIComponent(type)}`; skinLink.textContent = `Shop all ${type.toLowerCase()}-skin products`; }
    tabs.forEach(tab => { const active = tab.dataset.skinTab === type; tab.classList.toggle('active', active); tab.setAttribute('aria-selected', String(active)); });
  }
  tabs.forEach(tab => tab.addEventListener('click', () => renderSkin(tab.dataset.skinTab)));
  if (skinGrid) renderSkin('Dry');

  const routine = document.querySelector('#routineSteps');
  if (routine) {
    const ids = ['cloudmilk-cleanser', 'waterline-serum', 'ceramide-cloud', 'mineral-shield'];
    const labels = ['Cleanse', 'Treat', 'Moisturize', 'Protect'];
    routine.innerHTML = ids.map((id, index) => { const product = getProduct(id); return `<article class="routine-step"><span class="routine-number">0${index + 1}</span><div><h3>${labels[index]}</h3><p>${product.name} · ${product.size}</p></div><a class="btn btn-text" href="product-details.html?id=${id}">View</a></article>`; }).join('');
  }

  const homeBundle = document.querySelector('#homeBundle');
  if (homeBundle && window.Bundles) {
    const bundle = Bundles.find(item => item.id === 'hydration');
    const products = bundle.ids.map(getProduct);
    const individual = products.reduce((sum, product) => sum + product.price, 0);
    homeBundle.innerHTML = `<span class="eyebrow">Featured routine set</span><h2>${bundle.name}</h2><p>Three comfort-first essentials selected for dry and sensitive-leaning routines.</p><div class="bundle-thumbs">${products.map(product => `<img src="${product.image}" alt="${product.name}">`).join('')}</div><p><strong>₹${bundle.price.toLocaleString('en-IN')}</strong> <span class="old-price">₹${individual.toLocaleString('en-IN')}</span> · Save ₹${(individual - bundle.price).toLocaleString('en-IN')}</p><div class="actions"><button class="btn btn-primary add-home-bundle" type="button">Add set to bag</button><a class="btn btn-text" href="bundles.html">See all bundles</a></div>`;
    homeBundle.querySelector('.add-home-bundle').addEventListener('click', () => Cart.add(bundle.id, 1, 'bundle', { name: bundle.name, price: bundle.price, image: bundle.image, ids: bundle.ids }));
  }
})();
