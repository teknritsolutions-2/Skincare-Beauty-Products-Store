(function () {
  const KEY = 'veloura-cart';
  const read = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  };
  const write = cart => {
    localStorage.setItem(KEY, JSON.stringify(cart));
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
  };

  window.Cart = {
    items: read,
    add(id, qty = 1, type = 'product', meta = {}) {
      const cart = read();
      const key = type === 'bundle' ? `bundle:${id}` : id;
      const item = cart.find(entry => entry.key === key);
      if (item) item.qty += qty;
      else cart.push({ key, id, qty, type, ...meta });
      write(cart);
      this.toast(type === 'bundle' ? 'Bundle added to your bag' : 'Added to your bag');
      document.dispatchEvent(new CustomEvent('cart:open'));
    },
    remove(key) { write(read().filter(item => item.key !== key)); },
    update(key, qty) {
      if (qty < 1) return this.remove(key);
      const cart = read();
      const item = cart.find(entry => entry.key === key);
      if (item) { item.qty = qty; write(cart); }
    },
    clear() { write([]); },
    count() { return read().reduce((sum, item) => sum + item.qty, 0); },
    total() {
      return read().reduce((sum, item) => {
        if (item.type === 'bundle') return sum + item.price * item.qty;
        const product = getProduct(item.id);
        return sum + (product ? product.price * item.qty : 0);
      }, 0);
    },
    toast(message) {
      let toast = document.querySelector('.cart-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'cart-toast';
        toast.setAttribute('role', 'status');
        document.body.appendChild(toast);
      }
      toast.textContent = message;
      toast.hidden = false;
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => { toast.hidden = true; }, 1800);
    }
  };

  document.addEventListener('click', event => {
    const button = event.target.closest('.add-to-cart');
    if (!button) return;
    event.preventDefault();
    Cart.add(button.dataset.product, Number(button.dataset.qty || 1));
  });
})();
