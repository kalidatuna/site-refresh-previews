# Storefront implementation proof

Small original e-commerce demo built to show implementation quality for freelance project work.

## Demonstrated behavior

- Responsive product grid
- Category filtering
- Product variants
- Cart line identity by product + variant
- Quantity controls
- Cart persistence with localStorage
- Checkout validation
- Accessible labels, focus states and ARIA state
- Reduced-motion support
- No third-party dependencies or paid services
- No real payment processing

## Manual acceptance checks

1. Filter by category and confirm only matching products remain.
2. Add the same product in two variants and confirm separate cart lines.
3. Refresh after adding items and confirm the cart persists.
4. Decrease quantity to zero and confirm the line is removed.
5. Open checkout with an item in the cart.
6. Submit an invalid email and confirm checkout blocks it.
7. Submit missing name/address and confirm field-level blocking.
8. Submit valid demo details and confirm the cart clears without collecting payment.
9. Resize from desktop to 390px mobile width and confirm the grid, header, cart and dialog remain usable.

This is a portfolio proof. It is not client work and it does not claim a production payment integration.