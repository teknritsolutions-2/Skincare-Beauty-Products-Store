(function () {
  const grid = document.querySelector('#catalogGrid');
  if (!grid) return;

  const params = new URLSearchParams(location.search);
  const state = {
    category: params.get('category') || 'All', skin: params.get('skin') || 'All',
    ingredient: params.get('ingredient') || 'All', available: params.get('available') === 'true',
    price: Number(params.get('price')) || 2500, sort: params.get('sort') || 'featured'
  };
  const form = document.querySelector('#filters');
  const count = document.querySelector('#resultCount');
  const sort = document.querySelector('#sortProducts');
  const drawer = document.querySelector('#filterDrawer');
  const toggle = document.querySelector('.filter-toggle');

  function syncControls() {
    form.elements.category.value = state.category;
    form.elements.skin.value = state.skin;
    form.elements.ingredient.value = state.ingredient;
    form.elements.available.checked = state.available;
    form.elements.price.value = state.price;
    sort.value = state.sort;
    document.querySelector('#priceValue').textContent = `₹${state.price.toLocaleString('en-IN')}`;
    document.querySelectorAll('[data-category-pill]').forEach(button => button.classList.toggle('active', button.dataset.categoryPill === state.category));
  }

  function updateUrl() {
    const url = new URL(location);
    ['category', 'skin', 'ingredient', 'sort'].forEach(key => state[key] === 'All' || state[key] === 'featured' ? url.searchParams.delete(key) : url.searchParams.set(key, state[key]));
    state.available ? url.searchParams.set('available', 'true') : url.searchParams.delete('available');
    state.price < 2500 ? url.searchParams.set('price', String(state.price)) : url.searchParams.delete('price');
    history.replaceState({}, '', url);
  }

  function render() {
    const list = Products.filter(product =>
      (state.category === 'All' || product.category === state.category) &&
      (state.skin === 'All' || product.skin.includes(state.skin) || product.skin.includes('All')) &&
      (state.ingredient === 'All' || product.ingredients.includes(state.ingredient)) &&
      (!state.available || product.available) && product.price <= state.price
    );
    const sorts = {
      'price-low': (a, b) => a.price - b.price, 'price-high': (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name), newest: (a, b) => Number(b.new) - Number(a.new)
    };
    if (sorts[state.sort]) list.sort(sorts[state.sort]);
    count.textContent = `${list.length} product${list.length === 1 ? '' : 's'}`;
    grid.innerHTML = list.length ? list.map(productCard).join('') : '<div class="empty-state"><h2>No exact matches</h2><p>Try widening a filter or returning to the full shelf.</p><button class="btn btn-primary" id="emptyReset" type="button">Clear filters</button></div>';
    syncControls(); updateUrl();
  }

  function reset() {
    Object.assign(state, { category: 'All', skin: 'All', ingredient: 'All', available: false, price: 2500, sort: 'featured' });
    render();
  }
  function closeFilters() {
    drawer.classList.remove('open'); document.body.classList.remove('filter-open');
    drawer.setAttribute('aria-hidden', String(matchMedia('(max-width: 1023px)').matches)); toggle.setAttribute('aria-expanded', 'false');
  }

  form.addEventListener('input', event => {
    const target = event.target;
    if (!target.name) return;
    state[target.name] = target.type === 'checkbox' ? target.checked : target.type === 'range' ? Number(target.value) : target.value;
    render();
  });
  sort.addEventListener('change', () => { state.sort = sort.value; render(); });
  document.querySelectorAll('[data-category-pill]').forEach(button => button.addEventListener('click', () => { state.category = button.dataset.categoryPill; render(); }));
  ['#clearFilters', '#desktopClearFilters'].forEach(selector => document.querySelector(selector).addEventListener('click', reset));
  document.querySelector('#applyFilters').addEventListener('click', closeFilters);
  grid.addEventListener('click', event => { if (event.target.id === 'emptyReset') reset(); });
  toggle.addEventListener('click', () => { drawer.classList.add('open'); document.body.classList.add('filter-open'); drawer.setAttribute('aria-hidden', 'false'); toggle.setAttribute('aria-expanded', 'true'); document.querySelector('#closeFilters').focus(); });
  document.querySelector('#closeFilters').addEventListener('click', closeFilters);
  syncControls(); render();
})();
