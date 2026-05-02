export const cartLocators = {
    cartItems: '.cart_item',
    quantity: '[data-test="item-quantity"]',
    itemDescription: '[data-test="inventory-item-desc"]',
    removeButton: ['button', { name: 'Remove' }] as const,
    checkoutButton: '[data-test="checkout"]',
    continueButton: '[data-test="continue"]'
};