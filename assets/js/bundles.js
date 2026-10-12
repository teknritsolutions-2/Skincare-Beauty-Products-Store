(function () {
  window.Bundles = [
    { id: 'everyday', name: 'Everyday Essentials', ids: ['dew-gel-cleanser', 'daily-lotion', 'fluid-shield'], price: 3490, image: '../assets/images/bundles/bundle-1.jpg', skin: ['Normal', 'Combination'], note: 'A light morning foundation for skin that prefers breathable layers.' },
    { id: 'hydration', name: 'Hydration Routine', ids: ['cloudmilk-cleanser', 'waterline-serum', 'ceramide-cloud'], price: 3690, image: '../assets/images/bundles/bundle-2.jpg', skin: ['Dry', 'Sensitive'], note: 'Comfort-focused cleansing, water-binding hydration and a plush finish.' },
    { id: 'balanced', name: 'Balanced Skin Set', ids: ['dew-gel-cleanser', 'balance-niacinamide', 'water-gel'], price: 3290, image: '../assets/images/bundles/bundle-3.jpg', skin: ['Oily', 'Combination'], note: 'Fresh, light textures for routines navigating oil and dehydration.' },
    { id: 'morning', name: 'Morning Routine', ids: ['morning-c-serum', 'daily-lotion', 'mineral-shield'], price: 3890, image: '../assets/images/bundles/bundle-4.jpg', skin: ['Normal', 'Dry'], note: 'An antioxidant layer, daily moisture and mineral sun protection.' },
    { id: 'evening', name: 'Quiet Evening Set', ids: ['cleansing-balm', 'barrier-serum', 'squalane-cream'], price: 3850, image: '../assets/images/bundles/bundle-5.jpg', skin: ['Dry', 'Sensitive'], note: 'A soft-landing trio for removing the day and restoring comfort.' },
    { id: 'travel', name: 'Travel Essentials', ids: ['oat-veil-cleanser', 'water-gel', 'fluid-shield'], price: 3190, image: '../assets/images/bundles/bundle-6.jpg', skin: ['All'], note: 'Three adaptable staples for a smaller, steadier travel routine.' }
  ];
  const root = document.querySelector('#bundleGrid');
  if (!root) return;
  root.innerHTML = Bundles.map(bundle => {
    const products = bundle.ids.map(getProduct);
    const total = products.reduce((sum, product) => sum + product.price, 0);
    const saving = total - bundle.price;
    return `<article class="bundle-card"><img src="${bundle.image}" alt="${bundle.name}" loading="lazy"><div class="bundle-body"><span class="eyebrow">${bundle.skin.join(' · ')}</span><h3>${bundle.name}</h3><p>${bundle.note}</p><div class="bundle-products">${products.map(product => `<a href="product-details.html?id=${product.id}" title="${product.name}"><img src="${product.image}" alt="${product.name}" loading="lazy"></a>`).join('')}</div><p class="size">Includes ${products.map(product => product.name).join(' · ')}</p><div class="bundle-price"><strong class="price">₹${bundle.price.toLocaleString('en-IN')}</strong><span class="old-price">₹${total.toLocaleString('en-IN')}</span><span class="saving">Save ₹${saving.toLocaleString('en-IN')}</span></div><button class="btn btn-primary add-bundle" type="button" data-id="${bundle.id}">Add set to bag</button></div></article>`;
  }).join('');
  root.addEventListener('click', event => {
    const button = event.target.closest('.add-bundle');
    if (!button) return;
    const bundle = Bundles.find(item => item.id === button.dataset.id);
    Cart.add(bundle.id, 1, 'bundle', { name: bundle.name, price: bundle.price, image: bundle.image, ids: bundle.ids });
  });
})();
