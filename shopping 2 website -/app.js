// Wait until the DOM content is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
    // Initialize an empty array to store cart items
    const cart = [];
    // Select the container where cart items will be displayed
    const cartItemsContainer = document.querySelector(".cart-items");
    // Select the element where the total price will be displayed
    const totalPriceElement = document.getElementById("total-price");

    // Add to Cart functionality: Attach event listeners to all "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            // Find the closest parent element with the class "product-card" for the clicked button
            const productCard = button.closest(".product-card");
            // Extract the product name from the "h3" element inside the product card
            const productName = productCard.querySelector("h3").innerText;
            // Extract and convert the product price from the "p" element, removing "LE" and commas
            const productPrice = parseFloat(
                productCard.querySelector("p").innerText.replace("LE", "").replace(",", "")
            );
            // Extract the product image source from the "img" element
            const productImage = productCard.querySelector("img").src;

            // Create a product object with the extracted data and add it to the cart array
            const product = { name: productName, price: productPrice, image: productImage };
            cart.push(product);

            // Update the cart display to reflect the new item
            updateCartDisplay();
        });
    });

    // Function to update the cart display in the UI
    function updateCartDisplay() {
        // Clear the current cart items displayed in the container
        cartItemsContainer.innerHTML = "";
        // Initialize the total price to 0
        let total = 0;

        // Loop through each product in the cart array
        cart.forEach((product, index) => {
            // Create a new div for each cart item
            const item = document.createElement("div");
            item.classList.add("cart-item"); // Add a class for styling

            // Set the inner HTML of the cart item with product details and a remove button
            item.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <div>
                    <h4>${product.name}</h4>
                    <p>LE ${product.price.toFixed(2)} EGP</p>
                </div>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            // Append the cart item to the container
            cartItemsContainer.appendChild(item);
            // Add the product's price to the total
            total += product.price;
        });

        // Update the total price element with the calculated total
        totalPriceElement.innerText = total.toFixed(2);

        // Attach event listeners to all "Remove" buttons in the cart
        // handling remove from cart button
        document.querySelectorAll(".remove-from-cart").forEach(button => {
            button.addEventListener("click", () => {
                // Get the index of the item to be removed from the data attribute
                const index = button.getAttribute("data-index");
                // Remove the product from the cart array
                cart.splice(index, 1);
                // Update the cart display after removal
                updateCartDisplay();
            });
        });
    }

    // Checkout functionality: Handle the "Checkout" button click
    document.getElementById("checkout").addEventListener("click", () => {
        // If the cart is not empty, show a success message and clear the cart
        if (cart.length > 0) {
            alert("Thank you for your purchase!");
            cart.length = 0; // Clear the cart
            updateCartDisplay(); // Refresh the cart display
        } else {
            // Show a message if the cart is empty
            alert("Your cart is empty.");
        }
    });
});

// Handle the payment display when the "Checkout" button is clicked
const productButton = document.querySelector(".checkout"); // Select the checkout button
const payment = document.querySelector(".payment"); // Select the payment container
const close = document.querySelector(".close"); // Select the close button for the payment section
const currentProductSizes = document.querySelectorAll(".size"); // Select all size options

// Show the payment section when the checkout button is clicked
productButton.addEventListener("click", () => {
    payment.style.display = "flex"; // Make the payment section visible
});

// Hide the payment section when the close button is clicked
close.addEventListener("click", () => {
    payment.style.display = "none"; // Hide the payment section
});

// Handle size selection for product options
currentProductSizes.forEach((size, index) => {
    size.addEventListener("click", () => {
        // Reset all size options to default styles
        currentProductSizes.forEach((size) => {
            size.style.backgroundColor = "white";
            size.style.color = "black";
        });
        // Highlight the selected size option
        size.style.backgroundColor = "black";
        size.style.color = "white";
    });
});
