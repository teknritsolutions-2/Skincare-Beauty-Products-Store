import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const required=['assets/css/style.css','assets/css/dark-mode.css','assets/css/rtl.css','assets/js/theme-init.js','assets/js/main.js','assets/js/products.js','assets/js/shop.js','assets/js/product-details.js','assets/js/quiz.js','assets/js/bundles.js','assets/js/cart.js','assets/js/forms.js','assets/js/home.js','assets/brand/logo.svg','assets/brand/logo-white.svg','assets/brand/logo-mark.svg','assets/brand/favicon.svg','documentation/PRODUCT-IMAGE-INVENTORY.md','pages/index.html','pages/home2.html','pages/about.html','pages/shop.html','pages/product-details.html','pages/ingredients.html','pages/skin-type-guide.html','pages/bundles.html','pages/cart.html','pages/checkout.html','pages/contact.html','pages/faq.html','pages/privacy.html','pages/terms.html','pages/shipping-returns.html','pages/coming-soon.html','pages/404.html'];
const errors=[];
for(const file of required)if(!fs.existsSync(path.join(root,file)))errors.push(`Missing ${file}`);
for(const file of fs.readdirSync(path.join(root,'pages')).filter(x=>x.endsWith('.html'))){
 const full=path.join(root,'pages',file),html=fs.readFileSync(full,'utf8');
 const h1Count=(html.match(/<h1[ >]/g)||[]).length;if(h1Count!==1&&!(file==='product-details.html'&&html.includes('id="productDetails"')))errors.push(`${file}: expected exactly one h1`);
 if(!html.includes('main.js'))errors.push(`${file}: missing shared main.js`);
 if(!html.includes('theme-init.js'))errors.push(`${file}: missing synchronous theme initializer`);
 for(const m of html.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)){
  const ref=m[1];if(/^(https?:|mailto:|tel:|data:)/.test(ref))continue;
  const target=path.resolve(path.dirname(full),ref);if(!fs.existsSync(target))errors.push(`${file}: broken reference ${ref}`);
 }
 if(html.includes('${'))errors.push(`${file}: unrendered template expression`);
}
const code=fs.readFileSync(path.join(root,'assets/js/products.js'),'utf8');const context={window:{},console};vm.createContext(context);vm.runInContext(code,context);if(context.window.Products.length!==24)errors.push(`Expected 24 products, got ${context.window.Products.length}`);
if(context.window.StoreConfig.brand!=='Arenne Skin')errors.push('Shared brand config is not Arenne Skin');
const ids=new Set(context.window.Products.map(p=>p.id));if(ids.size!==24)errors.push('Duplicate product IDs');
const imagePaths=new Set(),imageHashes=new Set();
for(const p of context.window.Products){
 const image=path.resolve(root,'pages',p.image);
 if(!fs.existsSync(image))errors.push(`Missing product image for ${p.id}`);
 if(imagePaths.has(p.image))errors.push(`Shared main image path for ${p.id}`);imagePaths.add(p.image);
 if(fs.existsSync(image)){const hash=crypto.createHash('sha1').update(fs.readFileSync(image)).digest('hex');if(imageHashes.has(hash))errors.push(`Duplicated main image content for ${p.id}`);imageHashes.add(hash)}
 if(!Array.isArray(p.gallery)||p.gallery.length<1||p.gallery.length>4)errors.push(`${p.id}: gallery must contain 1–4 images`);
 for(const item of p.gallery||[]){if(!item?.src||!item?.alt)errors.push(`${p.id}: gallery entry missing src or alt`);else if(!fs.existsSync(path.resolve(root,'pages',item.src)))errors.push(`${p.id}: missing gallery image ${item.src}`)}
}
const main=fs.readFileSync(path.join(root,'assets/js/main.js'),'utf8');
const navTokens=["Home <span", "link('about.html', 'About'", "link('shop.html', 'Shop'", "link('ingredients.html', 'Ingredients'", "link('skin-type-guide.html', 'Skin Guide'", "link('bundles.html', 'Bundles'", "link('contact.html', 'Contact'"];
let previous=-1;for(const token of navTokens){const current=main.indexOf(token);if(current<0||current<previous)errors.push('Desktop navigation order does not match the required sequence');previous=current}
const homeMenu=main.slice(main.indexOf('<ul class="dropdown">'),main.indexOf('</ul></div>'));
if(!homeMenu.includes("'Home 1'")||!homeMenu.includes("'Home 2'")||homeMenu.includes('Skin finder'))errors.push('Home dropdown must contain only Home 1 and Home 2');
const discover=main.slice(main.indexOf('<h3>Discover</h3>'),main.indexOf('<h3>Help</h3>'));
for(const item of ['Home 1','Home 2','About','Ingredients','Skin Guide'])if(!discover.includes(`>${item}<`))errors.push(`Footer Discover is missing ${item}`);
for(const symbol of ['◐','☰','✕'])if(main.includes(symbol))errors.push(`Text-symbol interface icon remains: ${symbol}`);
for(const file of ['logo.svg','logo-white.svg']){const svg=fs.readFileSync(path.join(root,'assets/brand',file),'utf8');if(svg.includes('<text'))errors.push(`${file}: wordmark must use vector paths, not SVG text`)}
const themeInit=fs.readFileSync(path.join(root,'assets/js/theme-init.js'),'utf8');if(!themeInit.includes('prefers-color-scheme')||!themeInit.includes('try'))errors.push('Theme initializer lacks system fallback or storage protection');
if(fs.existsSync(path.join(root,'pages/skin-quiz.html')))errors.push('Standalone quiz page should remain removed');
const textFiles=['README.md',...required,...fs.readdirSync(path.join(root,'documentation')).filter(file=>file.endsWith('.md')).map(file=>`documentation/${file}`)];
for(const file of textFiles){if(fs.readFileSync(path.join(root,file),'utf8').match(/Veloura/i))errors.push(`Legacy brand reference in ${file}`)}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`QA passed: ${required.length} required files, 17 pages, exact navigation, clean brand references, ${context.window.Products.length} unique products, local references resolved.`);
