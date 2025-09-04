document.addEventListener('DOMContentLoaded', function() {
    // Initialize the cart
    updateCartTotals();
    
    // Add event listeners to all quantity buttons
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');
    const removeButtons = document.querySelectorAll('.remove-btn');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    
    // Decrease quantity
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.nextElementSibling;
            if (input.value > 1) {
                input.value--;
                updateProductTotal(input);
                updateCartTotals();
            }
        });
    });
    
    // Increase quantity
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            input.value++;
            updateProductTotal(input);
            updateCartTotals();
        });
    });
    
    // Remove product
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.style.opacity = '0';
            setTimeout(() => {
                cartItem.remove();
                updateCartTotals();
            }, 300);
        });
    });
    
    // Input change event
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value < 1) this.value = 1;
            updateProductTotal(this);
            updateCartTotals();
        });
    });
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        alert('Proceeding to checkout! In a real application, this would take you to the payment page.');
    });
    
    // Function to update individual product total
    function updateProductTotal(input) {
        const cartItem = input.closest('.cart-item');
        const price = parseFloat(cartItem.querySelector('.product-price').textContent.replace('$', ''));
        const quantity = parseInt(input.value);
        const total = price * quantity;
        cartItem.querySelector('.product-total').textContent = '$' + total.toFixed(2);
    }
    
    // Function to update cart totals
    function updateCartTotals() {
        let subtotal = 0;
        const productTotals = document.querySelectorAll('.product-total');
        
        productTotals.forEach(totalElement => {
            subtotal += parseFloat(totalElement.textContent.replace('$', ''));
        });
        
        const shipping = subtotal > 0 ? 9.99 : 0;
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + shipping + tax;
        
        document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
        document.getElementById('shipping').textContent = '$' + shipping.toFixed(2);
        document.getElementById('tax').textContent = '$' + tax.toFixed(2);
        document.getElementById('total').textContent = '$' + total.toFixed(2);
    }
});