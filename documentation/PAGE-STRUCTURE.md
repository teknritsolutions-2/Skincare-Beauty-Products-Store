# Page structure

- `pages/index.html`: primary 11-section storefront
- `pages/home2.html`: editorial Daily Skin Journal alternative
- `pages/shop.html`: filterable 24-product catalog
- `pages/product-details.html`: one query-driven product template
- `pages/ingredients.html`: searchable ingredient education
- `pages/skin-type-guide.html`: interactive type guide
- `pages/skin-quiz.html`: six-question deterministic quiz
- `pages/bundles.html`: six data-driven bundles
- `pages/cart.html`, `checkout.html`: local bag and review-only checkout
- `pages/contact.html`: consultation enquiry
- `pages/about.html`, `faq.html`, legal/support pages, coming soon and 404

Every page loads `products.js`, `cart.js`, then `main.js`; page-specific behavior follows. The shared script injects the single navbar and footer implementation.
