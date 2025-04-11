const menuToggle = document.querySelector('.menu-toggle');
const menuContainer = document.querySelector('.menu-container');

menuToggle.addEventListener('click', function() {
    menuContainer.classList.toggle('menu-container-after');
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalContainer = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-btn');

// Cart array to store the items
let cart = [];

// Add event listener to each "Add to Cart" button
addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const item = {
            title: button.parentElement.querySelector('.item-title').innerText,
            price: button.parentElement.querySelector('.item-price').innerText
        };

        addToCart(item);
    });
});

function addToCart(item) {
    // Check if the item is already in the cart
    const existingItem = cart.find(cartItem => cartItem.title === item.title);

    if (existingItem) {
        // If item already exists, increment the quantity
        existingItem.quantity++;
    } else {
        // If item does not exist, add it to the cart with quantity of 1
        item.quantity = 1;
        cart.push(item);
    }

    // Update the cart UI
    displayCartItems();
    alert("item added to cart successfully");

}

function displayCartItems() {
    cartItemsContainer.innerHTML = '';

    cart.forEach(function(item) {
        const cartItemElement = document.createElement('li');
        cartItemElement.innerText = ${item.title} - Quantity: ${item.quantity};
        cartItemsContainer.appendChild(cartItemElement);
    });

    calculateCartTotal();
}

function calculateCartTotal() {
    let total = 0;

    cart.forEach(function(item) {
        const price = parseFloat(item.price.replace('$', ''));
        total += price * item.quantity;
    });

    cartTotalContainer.innerText = Total: $${total.toFixed(2)};
}

checkoutButton.addEventListener('click', function() {
    // Handle the checkout logic
    console.log('Checkout clicked!');
    console.log('Cart:', cart);
    // You can perform further actions like sending the cart to a server, processing payment, etc.
});

checkoutButton.addEventListener('click', function() {
    // Handle the checkout logic
    if (cart.length > 0) {
        // Send the order to a server or perform further processing
        sendOrderToServer(cart);

        // Clear the cart and display a confirmation message
        cart = [];
        displayCartItems();
        cartTotalContainer.innerText = 'Total: $0.00';
        showConfirmationMessage();
    } else {
        // Display an error message if the cart is empty
        showErrorMessage();
    }
});

function sendOrderToServer(order) {
    // Perform the necessary actions to send the order to the server
    console.log('Order sent to the server:', order);
}

function showConfirmationMessage() {
    // Display a confirmation message to the user
    const confirmationMessage = document.createElement('p');
    confirmationMessage.innerText = 'Thank you for your order! Please pay the amount at the time of receiving your food item';
    confirmationMessage.style.color = 'green';

    cartItemsContainer.appendChild(confirmationMessage);

}


function showErrorMessage() {
    // Display an error message when the cart is empty
    const errorMessage = document.createElement('p');
    errorMessage.innerText = 'Your cart is empty. Please add items before checking out.';
    errorMessage.style.color = 'red';

    cartItemsContainer.appendChild(errorMessage);
}