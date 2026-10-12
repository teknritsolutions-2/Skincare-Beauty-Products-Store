(function () {
  const root = document.querySelector('#productDetails');
  if (!root) return;
  const requested = new URLSearchParams(location.search).get('id');
  const product = getProduct(requested) || Products[0];
  const gallery = (product.gallery?.length ? product.gallery : [{ src: product.image, alt: product.name }])
    .map(item => typeof item === 'string' ? { src: item, alt: product.name } : item);
  const related = Products.filter(item => item.id !== product.id && (item.category === product.category || item.skin.some(type => product.skin.includes(type)))).slice(0, 4);
  document.title = `${product.name} — ${StoreConfig.brand}`;

  const structured = document.createElement('script');
  structured.type = 'application/ld+json';
  structured.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: product.name, description: product.description, image: gallery.map(item => new URL(item.src, location.href).href), category: product.category, offers: { '@type': 'Offer', priceCurrency: 'INR', price: product.price, availability: product.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' } });
  document.head.appendChild(structured);

  const previousIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg>';
  const nextIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6"/></svg>';
  root.innerHTML = `<div class="container details-layout"><div class="gallery-stage"><figure class="gallery-main"><img id="galleryImage" src="${gallery[0].src}" alt="${gallery[0].alt}"><figcaption id="galleryCaption">${gallery[0].alt}</figcaption>${gallery.length > 1 ? `<button class="gallery-arrow gallery-prev" type="button" aria-label="Previous image">${previousIcon}</button><button class="gallery-arrow gallery-next" type="button" aria-label="Next image">${nextIcon}</button>` : ''}</figure>${gallery.length > 1 ? `<div class="gallery-thumbs" aria-label="Product gallery">${gallery.map((item, index) => `<button class="gallery-thumb${index === 0 ? ' active' : ''}" type="button" data-index="${index}" aria-label="View image ${index + 1}: ${item.alt}" aria-current="${index === 0 ? 'true' : 'false'}"><img src="${item.src}" alt=""></button>`).join('')}</div>` : ''}</div><div class="details-panel"><span class="eyebrow">${product.category}</span><h1>${product.name}</h1><p class="lead">${product.description}</p><p class="details-price">₹${product.price.toLocaleString('en-IN')} <span class="size">· ${product.size}</span></p><div class="detail-chips">${product.skin.map(type => `<span class="detail-chip">${type}</span>`).join('')}${product.ingredients.map(ingredient => `<a class="detail-chip" href="ingredients.html?ingredient=${encodeURIComponent(ingredient)}">${ingredient}</a>`).join('')}</div><p><strong>${product.available ? 'In stock and ready to add' : 'Currently unavailable'}</strong></p><div class="purchase-row"><div class="qty"><button id="qtyMinus" type="button" aria-label="Decrease quantity">−</button><input id="qtyInput" value="1" inputmode="numeric" aria-label="Quantity"><button id="qtyPlus" type="button" aria-label="Increase quantity">+</button></div><button class="btn btn-primary btn-lg" id="detailAdd" type="button" ${product.available ? '' : 'disabled'}>${product.available ? 'Add to bag' : 'Sold out'}</button></div><div class="detail-accordion accordion"><div class="accordion-item open"><button class="accordion-btn" type="button" aria-expanded="true">How to use <span>＋</span></button><div class="accordion-panel"><p>${product.directions}</p></div></div><div class="accordion-item"><button class="accordion-btn" type="button" aria-expanded="false">Highlighted ingredients <span>＋</span></button><div class="accordion-panel"><p>${product.ingredients.join(', ')}. Refer to final packaging for the complete ingredient list.</p></div></div><div class="accordion-item"><button class="accordion-btn" type="button" aria-expanded="false">Good to know <span>＋</span></button><div class="accordion-panel"><p>${product.precautions}</p></div></div></div></div></div><section class="section related-products"><div class="container"><div class="section-head"><div><span class="eyebrow">Continue the ritual</span><h2>Pair it with</h2></div><a class="btn btn-text" href="shop.html?category=${encodeURIComponent(product.category)}">View ${product.category.toLowerCase()}</a></div><div class="product-grid">${related.map(productCard).join('')}</div></div></section>`;

  const input = root.querySelector('#qtyInput');
  root.querySelector('#qtyMinus').addEventListener('click', () => { input.value = Math.max(1, Number(input.value || 1) - 1); });
  root.querySelector('#qtyPlus').addEventListener('click', () => { input.value = Math.max(1, Number(input.value || 1) + 1); });
  root.querySelector('#detailAdd').addEventListener('click', () => Cart.add(product.id, Math.max(1, Number(input.value || 1))));
  let galleryIndex = 0;
  const selectImage = index => {
    galleryIndex = (index + gallery.length) % gallery.length;
    const selected = gallery[galleryIndex];
    const image = root.querySelector('#galleryImage');
    image.classList.add('changing');
    setTimeout(() => { image.src = selected.src; image.alt = selected.alt; root.querySelector('#galleryCaption').textContent = selected.alt; image.classList.remove('changing'); }, 100);
    root.querySelectorAll('.gallery-thumb').forEach((button, buttonIndex) => { const active = buttonIndex === galleryIndex; button.classList.toggle('active', active); button.setAttribute('aria-current', String(active)); });
  };
  root.querySelectorAll('.gallery-thumb').forEach(button => {
    button.addEventListener('click', () => selectImage(Number(button.dataset.index)));
    button.addEventListener('keydown', event => { if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); const next = (Number(button.dataset.index) + 1) % gallery.length; root.querySelectorAll('.gallery-thumb')[next].focus(); selectImage(next); } if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); const previous = (Number(button.dataset.index) - 1 + gallery.length) % gallery.length; root.querySelectorAll('.gallery-thumb')[previous].focus(); selectImage(previous); } });
  });
  root.querySelector('.gallery-prev')?.addEventListener('click', () => selectImage(galleryIndex - 1));
  root.querySelector('.gallery-next')?.addEventListener('click', () => selectImage(galleryIndex + 1));
})();
