# Page structure

- `pages/index.html`: primary product-first storefront with inline skin finder
- `pages/home2.html`: distinct editorial Daily Skin Journal with inline skin finder
- `pages/shop.html`: filterable 24-product catalog
- `pages/product-details.html`: one query-driven product template
- `pages/ingredients.html`: searchable ingredient education
- `pages/skin-type-guide.html`: interactive type guide
- `pages/bundles.html`: six data-driven bundles
- `pages/cart.html`, `checkout.html`: local bag and review-only checkout
- `pages/contact.html`: consultation enquiry
- `pages/about.html`, `faq.html`, legal/support pages, coming soon and 404

Every page loads `products.js`, `cart.js`, then `main.js`; page-specific behavior follows. The shared script injects the single navbar and footer implementation.
