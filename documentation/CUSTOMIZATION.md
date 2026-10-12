# Customization

## Brand

Change `StoreConfig.brand` in `assets/js/products.js`, visible copy in the shared header/footer within `assets/js/main.js`, and the four SVGs in `assets/brand/`.

## Colors and type

Global color, spacing and typography tokens are at the start of `assets/css/style.css`. Dark overrides live only in `dark-mode.css`; RTL overrides live only in `rtl.css`. Google Fonts load Manrope and DM Sans from the stylesheet import.

## Products and prices

All 24 records are in `assets/js/products.js`. Keep IDs unique. Price values are integer INR amounts and the display currency comes from `StoreConfig.currency`. Product category names must remain aligned with the shop radio values unless both are updated.

## Images

Use exact, licensed product packshots in `assets/images/products/` before launching commerce. Preserve a 4:5-safe composition and update `documentation/IMAGE-SOURCES.md`.

## Ingredients

Edit the directory in `assets/js/ingredients.js` and product associations in `products.js`. Do not publish a complete INCI list unless verified from final manufacturer documentation.

## Quiz

Questions and deterministic answer tags live in `assets/js/quiz.js`. Results count answer tags and link to the corresponding shop filter. Keep outcomes general and non-diagnostic.

## Forms and payments

Connect the consultation form to Formspree, Netlify Forms or a chosen backend and update Privacy before changing the local-only message. Checkout intentionally collects no payment data. Add a hosted payment provider later; never handle card credentials in this static code.
