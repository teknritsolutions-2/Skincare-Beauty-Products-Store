(function(){
  const KEY='veloura-cart';
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return[]}};
  const write=(cart)=>{localStorage.setItem(KEY,JSON.stringify(cart));document.dispatchEvent(new CustomEvent('cart:updated',{detail:cart}))};
  window.Cart={
    items:read,
    add(id,qty=1,type='product',meta={}){const cart=read();const key=type==='bundle'?`bundle:${id}`:id;const found=cart.find(i=>i.key===key);if(found)found.qty+=qty;else cart.push({key,id,qty,type,...meta});write(cart);this.toast(type==='bundle'?'Bundle added to bag':'Added to bag')},
    remove(key){write(read().filter(i=>i.key!==key))},
    update(key,qty){const cart=read();const item=cart.find(i=>i.key===key);if(item){item.qty=Math.max(1,qty);write(cart)}},
    clear(){write([])},
    count(){return read().reduce((n,i)=>n+i.qty,0)},
    total(){return read().reduce((sum,i)=>{if(i.type==='bundle')return sum+i.price*i.qty;const p=getProduct(i.id);return sum+(p?p.price*i.qty:0)},0)},
    toast(message){let el=document.querySelector('.cart-toast');if(!el){el=document.createElement('div');el.className='cart-toast';el.setAttribute('role','status');el.style.cssText='position:fixed;z-index:2000;inset-inline-end:20px;inset-block-end:78px;background:#365346;color:#fff;padding:13px 18px;border-radius:999px;box-shadow:0 12px 30px #0003';document.body.appendChild(el)}el.textContent=message;el.hidden=false;clearTimeout(this._t);this._t=setTimeout(()=>el.hidden=true,1800)}
  };
  document.addEventListener('click',e=>{const b=e.target.closest('.add-to-cart');if(!b)return;Cart.add(b.dataset.product,Number(b.dataset.qty||1));});
})();
