(function () {
  const types = {
    Dry: { intro: 'Often feels tight, rough or less supple, especially after cleansing.', traits: ['Prefers creamier cleansing textures', 'Often enjoys richer moisturizers', 'May show temporary flaking in dry environments'], routine: ['Gentle cream cleanse', 'Humectant serum', 'Comfort moisturizer', 'Broad-spectrum sunscreen'] },
    Oily: { intro: 'Tends to develop visible shine across much of the face through the day.', traits: ['Often prefers gels and lotions', 'Can still experience dehydration', 'Does not benefit from harsh stripping'], routine: ['Comfortable gel cleanse', 'One focused serum', 'Light moisturizer', 'Fluid sunscreen'] },
    Combination: { intro: 'Different zones behave differently—often an oilier T-zone and drier cheeks.', traits: ['Texture needs can vary by zone', 'Seasonal changes may be noticeable', 'Flexible layers can work well'], routine: ['Balanced gel cleanser', 'Targeted serum', 'Moisturize by zone', 'Daily sunscreen'] },
    Normal: { intro: 'Usually feels broadly comfortable, with manageable oil and dryness.', traits: ['Still needs moisture and protection', 'Can change with weather', 'A simple routine may be enough'], routine: ['Gentle cleanse as needed', 'Optional focused serum', 'Everyday moisturizer', 'Daily sunscreen'] },
    Sensitive: { intro: 'May feel easily uncomfortable with unfamiliar products or environmental shifts.', traits: ['Introduce products one at a time', 'Keep the base routine simple', 'Persistent reactions need medical guidance'], routine: ['Minimal gentle cleanse', 'Simple hydrating layer', 'Comfort moisturizer', 'Tolerable sunscreen'] }
  };
  const root = document.querySelector('#guidePanel');
  if (!root) return;
  let active = 'Dry';
  function draw() {
    const type = types[active];
    const products = Products.filter(product => product.available && (product.skin.includes(active) || product.skin.includes('All'))).slice(0, 3);
    root.innerHTML = `<div class="guide-copy"><span class="eyebrow">${active} skin</span><h2>${type.intro}</h2><p>These are general patterns, not diagnostic criteria. Skin can share characteristics across groups.</p><h3>Common observations</h3><ul>${type.traits.map(trait => `<li>${trait}</li>`).join('')}</ul></div><div class="guide-routine"><span class="eyebrow">A steady starting point</span><h2>Routine shape</h2><ol>${type.routine.map(step => `<li>${step}</li>`).join('')}</ol><div class="guide-recommendations">${products.map(product => `<a class="ingredient-mini" href="product-details.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"><span><strong>${product.name}</strong><small>₹${product.price.toLocaleString('en-IN')}</small></span></a>`).join('')}</div><a class="btn btn-primary" href="shop.html?skin=${active}">Shop the ${active.toLowerCase()}-skin edit</a></div>`;
    document.querySelectorAll('.guide-tab').forEach(button => { const selected = button.dataset.type === active; button.classList.toggle('active', selected); button.setAttribute('aria-selected', String(selected)); });
  }
  document.querySelectorAll('.guide-tab').forEach(button => button.addEventListener('click', () => { active = button.dataset.type; draw(); })); draw();
})();
