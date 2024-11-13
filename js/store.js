let connection = new XMLHttpRequest();
let product_container = document.getElementById('product');
const limit = 12;
let cart = []; 
let totalPrice = 0; 

connection.open("GET", 'https://www.brofortech.com/data.json', true);
connection.send();

connection.onreadystatechange = function () {
    if (connection.readyState === 4) {
        if (connection.status === 200) {
            let data = JSON.parse(connection.responseText);
            let filter = data.products.filter((item => item.id <= 35));

            function pagination(number_page) {
                const start = (number_page - 1) * limit;
                const end = number_page * limit;
                const paginate_item = filter.slice(start, end);
                product_container.innerHTML = '';
                
                paginate_item.forEach(item => {
                    product_container.innerHTML += `
                        <div class="flex flex-col space-y-4">
                            <img class="w-full h-56 sm:h-64 md:h-72 object-cover" src="${item.imageUrl}" alt="${item.marque}">
                            <div class="flex justify-between items-center flex-wrap w-full space-y-2">
                                <p class="text-xl text-[#1A0B5B] w-1/2 text-base">${item.marque}</p>
                                <p class="text-xl text-[#1A0B5B] w-1/2 text-right text-base">${item.price}.00$</p>
                                <a href="#" class="w-full sm:w-1/2 text-[#1A0B5B] text-sm underline">Customize</a>
                                <button type="button" onclick="addToCart('${item.marque}', ${item.price}, '${item.imageUrl}')" class="w-full sm:w-1/4 text-lg p-2 bg-[#1A0B5B] text-white hover:bg-[#150a42] focus:outline-none focus:ring-2 focus:ring-[#FB2E86] focus:ring-opacity-50">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    `;
                });
            }

            pagination(1);
            const totalPages = Math.ceil(filter.length / limit);
            const paginationContainer = document.getElementById('pagination-buttons');
            paginationContainer.innerHTML = ''; 
            
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = `${i}`;
                pageButton.onclick = function () {
                    pagination(i);
                };
                paginationContainer.appendChild(pageButton);
            }
        } else {
            console.error("Error fetching data: " + connection.status);
        }
    }
};


function addToCart(productName, productPrice, productImage) {
    let product = cart.find(item => item.name == productName);
    if (product) {
        product.productCounter += 1;
        product.price = product.productCounter * productPrice;
    } else {
        cart.push({ name: productName, price: productPrice, productCounter: 1, image: productImage });
    }
    totalPrice += productPrice;
    displayCart();
}

function displayCart() {
    const cartMenu = document.getElementById('cart-menu');
    const cartList = cartMenu.querySelector('ul');
    const totalPrices = cartMenu.querySelector('#total-prix');

    cartList.innerHTML = ''; 

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('flex', 'justify-between', 'gap-5', 'text-gray-800', 'font-semibold');
        listItem.innerHTML = `
            <img src="${item.image}" class="w-11 h-11 my-[-12px] object-cover ">
            <p>${item.name}</p>
            <span>${item.productCounter}</span>
            <p>$${item.price}</p>
        `;
        cartList.appendChild(listItem);
    });

    totalPrices.textContent = `Total: $${totalPrice}`;
}
