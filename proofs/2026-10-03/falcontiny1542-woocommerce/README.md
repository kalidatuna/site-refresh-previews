# FalconTiny1542 WooCommerce first-slice sample

Source request:
https://www.reddit.com/r/wordpressjobs/comments/1wnzt0y/looking_for_a_wordpresswoocommerce_developer_for/

This is a local proof of work built before outreach. It uses original placeholder branding and products.

## Buyer request mapped into this slice

- responsive catalog layout;
- category filtering;
- product add-to-cart behavior;
- quantity controls;
- subtotal, shipping and total recalculation;
- mobile layout;
- explicit checkout handoff state.

## Proposed paid first slice

US$75 fixed for one real WooCommerce storefront slice using the buyer's own theme and products:

1. one agreed homepage or collection section;
2. one product-card/product-detail pattern;
3. cart add/remove/quantity behavior;
4. desktop and mobile verification;
5. handoff notes.

The full store, payment gateway, shipping/tax rules, account flows, SEO and external APIs would be scoped separately after the buyer confirms requirements.

## Acceptance checks

1. Adding a product opens the cart and increments the cart count.
2. Quantity plus/minus controls update subtotal and total.
3. Shipping becomes free at a US$100 demo threshold.
4. Category filters show only matching cards.
5. Checkout with an empty cart gives a clear guard state.
6. Checkout with items shows a ready handoff message.
7. At viewport widths below 760 px the product grid becomes one column and the cart stays within the viewport.