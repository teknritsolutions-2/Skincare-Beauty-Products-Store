(function () {
  const bestsellers = document.querySelector('#homeBestsellers');
  if (bestsellers) bestsellers.innerHTML = Products.filter(product => product.badge === 'Bestseller').slice(0, 6).map(productCard).join('');

  const journalProducts = document.querySelector('#journalProducts');
  if (journalProducts) journalProducts.innerHTML = ['oat-veil-cleanser', 'clear-path-serum', 'squalane-cream', 'fluid-shield', 'dew-gel-cleanser', 'comfort-spf'].map(getProduct).map(productCard).join('');

  const skinGrid = document.querySelector('#skinCollection');
  const skinLink = document.querySelector('#skinCollectionLink');
  const tabs = document.querySelectorAll('[data-skin-tab]');
  function renderSkin(type) {
    if (!skinGrid) return;
    const items = Products.filter(product => product.available && (product.skin.includes(type) || product.skin.includes('All'))).slice(0, 6);
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

  const homeBundleMini = document.querySelector('#homeBundleMini');
  if (homeBundleMini && window.Bundles) {
    homeBundleMini.innerHTML = Bundles.filter(item => item.id !== 'hydration').slice(0, 2).map(bundle => `<a class="bundle-mini" href="bundles.html#all-bundles"><img src="${bundle.image}" alt=""><span><strong>${bundle.name}</strong><small>₹${bundle.price.toLocaleString('en-IN')}</small></span></a>`).join('');
  }

  const routineData = {
    morning: { image: '../assets/images/bundles/bundle-everyday.jpg', alt: 'Morning routine products', eyebrow: '07:30 · Morning', title: 'Start light. Finish protected.', copy: 'Hydrate in comfortable layers, then give sunscreen the final word.', ids: ['dew-gel-cleanser', 'waterline-serum', 'water-gel', 'fluid-shield'], labels: ['Cleanse', 'Hydrate', 'Moisturize', 'Protect'] },
    evening: { image: '../assets/images/home/evening.jpg', alt: 'Evening skincare routine', eyebrow: '21:15 · Evening', title: 'Let the day come off gently.', copy: 'Cleanse thoroughly, choose one purposeful treatment, then settle in with moisture.', ids: ['cleansing-balm', 'cloudmilk-cleanser', 'clear-path-serum', 'ceramide-cloud'], labels: ['First cleanse', 'Second cleanse', 'Treat', 'Moisturize'] }
  };
  const routineButtons = document.querySelectorAll('[data-routine-time]');
  function renderJournalRoutine(key) {
    const data = routineData[key];
    const image = document.querySelector('#journalRoutineImage');
    if (!image) return;
    image.src = data.image; image.alt = data.alt;
    document.querySelector('#journalRoutineEyebrow').textContent = data.eyebrow;
    document.querySelector('#journalRoutineTitle').textContent = data.title;
    document.querySelector('#journalRoutineCopy').textContent = data.copy;
    document.querySelector('#journalRoutineProducts').innerHTML = data.ids.map((id, index) => { const product = getProduct(id); return `<a href="product-details.html?id=${id}"><span>0${index + 1} · ${data.labels[index]}</span><strong>${product.name}</strong></a>`; }).join('');
    routineButtons.forEach(button => { const active = button.dataset.routineTime === key; button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active)); });
  }
  routineButtons.forEach(button => button.addEventListener('click', () => renderJournalRoutine(button.dataset.routineTime)));
  if (routineButtons.length) renderJournalRoutine('morning');

  const journalSkinProducts = document.querySelector('#journalSkinProducts');
  const journalSkinButtons = document.querySelectorAll('[data-journal-skin]');
  function renderJournalSkin(type) {
    if (!journalSkinProducts) return;
    journalSkinProducts.innerHTML = Products.filter(product => product.available && product.skin.includes(type)).slice(0, 3).map(productCard).join('');
    journalSkinButtons.forEach(button => { const active = button.dataset.journalSkin === type; button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active)); });
  }
  journalSkinButtons.forEach(button => button.addEventListener('click', () => renderJournalSkin(button.dataset.journalSkin)));
  if (journalSkinProducts) renderJournalSkin('Dry');

  const journalBundles = document.querySelector('#journalBundles');
  if (journalBundles && window.Bundles) {
    journalBundles.innerHTML = Bundles.slice(0, 3).map(bundle => `<article><img src="${bundle.image}" alt=""><div><span class="eyebrow">Routine set</span><h3>${bundle.name}</h3><p>${bundle.ids.length} coordinated steps · ₹${bundle.price.toLocaleString('en-IN')}</p><a class="btn btn-text" href="bundles.html#all-bundles">See the set</a></div></article>`).join('');
  }
})();
