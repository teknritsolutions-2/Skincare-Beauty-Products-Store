import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..'),store=new Map();
const toast={textContent:'',hidden:true};const context={console,Intl,URLSearchParams,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},document:{querySelector:s=>s==='.cart-toast'?toast:null,addEventListener:()=>{},dispatchEvent:()=>{}},CustomEvent:class{constructor(type,init){this.type=type;this.detail=init?.detail}},setTimeout:()=>0,clearTimeout:()=>{}};context.window=context;vm.createContext(context);
for(const file of ['products.js','cart.js','bundles.js'])vm.runInContext(fs.readFileSync(path.join(root,'assets/js',file),'utf8'),context);
context.Cart.add('waterline-serum',2);if(context.Cart.count()!==2)throw Error('Cart add/count failed');if(context.Cart.total()!==2980)throw Error('Cart product total failed');
context.Cart.update('waterline-serum',3);if(context.Cart.total()!==4470)throw Error('Cart quantity update failed');context.Cart.remove('waterline-serum');if(context.Cart.count()!==0)throw Error('Cart remove failed');
for(const bundle of context.Bundles){const individual=bundle.ids.map(context.getProduct).reduce((sum,p)=>sum+p.price,0);if(bundle.price>=individual)throw Error(`${bundle.name} does not provide a saving`);context.Cart.add(bundle.id,1,'bundle',{name:bundle.name,price:bundle.price,image:bundle.image,ids:bundle.ids});if(context.Cart.total()!==bundle.price)throw Error(`${bundle.name} cart price mismatch`);context.Cart.clear()}
const filtered=context.Products.filter(p=>p.category==='Serums'&&p.skin.includes('Dry')&&p.available);if(!filtered.length||filtered.some(p=>p.category!=='Serums'))throw Error('Combined catalog filtering failed');
console.log(`Functionality passed: cart CRUD, ${context.Bundles.length} bundle calculations, and combined catalog filtering.`);
