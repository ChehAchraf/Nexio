let connection = new XMLHttpRequest();
let product_container = document.getElementById('product');
let cate = document.getElementById('sort-by-categorie');
const limit = 5;
const maxProductId = 34;

function customizeItem(id) {
    localStorage.setItem("id", id);
    window.location.href = "./customize.html";
}

show_products();

function show_products() {
    connection.open("GET", 'https://www.brofortech.com/data.json', true);
    connection.send();

    connection.onreadystatechange = function () {
        if (connection.readyState === 4) {
            if (connection.status === 200) {
                let data = JSON.parse(connection.responseText);
                let filter = data.products;

                let filteredById = filter.filter((item) => item.id >= 1 && item.id <= maxProductId);

                function getFilteredProducts() {
                    let filteredProducts = filteredById.filter((item) => {
                        if (cate.value && cate.value !== "") {
                            return item.category === cate.value;
                        }
                        return true;
                    });
                    return filteredProducts;
                }

                function pagination(number_page) {
                    const filteredProducts = getFilteredProducts();
                    const start = (number_page - 1) * limit;
                    const end = number_page * limit;
                    const paginate_item = filteredProducts.slice(start, end);

                    product_container.innerHTML = '';
                    paginate_item.forEach(item => {
                        product_container.innerHTML += `
                            <div>
                                <img class="w-full h-50" src="${item.imageUrl}" alt="${item.marque}">
                                <div class="flex justify-between items-center flex-wrap w-full space-y-3">
                                    <p class="text-2xl text-[#1A0B5B] w-1/2 ">${item.marque}</p>
                                    <p class="text-2xl text-[#1A0B5B] w-1/2 text-right">${item.price}.00$</p>
                                    <a id='cut-btn' href="#" onclick="customizeItem(${item.id})" class="w-1/2 text-[#1A0B5B] text-lg underline pl-4">Customize</a>
                                    <button type="button" class="w-1/3 text-lg p-2 d mr-8 bg-[#1A0B5B] text-white hover:bg-[#150a42] focus:outline-none focus:ring-2 focus:ring-[#FB2E86] focus:ring-opacity-50">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        `;
                    });
                }

                pagination(1);

                const totalPages = Math.ceil(getFilteredProducts().length / limit);

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
}

cate.addEventListener('change', function() {
    show_products();
});
