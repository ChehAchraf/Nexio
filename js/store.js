let connection = new XMLHttpRequest();
let product_container = document.getElementById('product');
const limit = 12;

connection.open("GET", 'https://www.brofortech.com/data.json', true);
connection.send();

connection.onreadystatechange = function () {
    if (connection.readyState === 4) {
        if (connection.status === 200) {
            let data = JSON.parse(connection.responseText);
            let filter = data.products.filter((item => item.id <= 35));
            function pagination(number_page) {
                const start = (number_page - 1) * limit;
                const end =    number_page * limit;
                const paginate_item = filter.slice(start, end);
                product_container.innerHTML = '';
                paginate_item.forEach(item => {
                    product_container.innerHTML += `
                    <div class="flex flex-col space-y-4">
            <img class="w-full h-56 sm:h-64 md:h-72 object-cover" src="${item.imageUrl}" alt="Dell Laptop">
            <div class="flex justify-between items-center flex-wrap w-full space-y-2">
                <p class="text-xl text-[#1A0B5B] w-1/2 text-base">${item.marque}</p>
                <p class="text-xl text-[#1A0B5B] w-1/2 text-right text-base">${item.price}.00$</p>
                <a href="#" class="w-full sm:w-1/2 text-[#1A0B5B] text-sm underline">Customize</a>
                <button type="button" class="w-full sm:w-1/4 text-lg p-2 bg-[#1A0B5B] text-white hover:bg-[#150a42] focus:outline-none focus:ring-2 focus:ring-[#FB2E86] focus:ring-opacity-50">
                    Add to cart
                </button>
            </div>
        </div>
                    `;
                });
            }
            pagination(3);
            const totalPages = Math.ceil(data.products.length / limit);
            console.log('Total Pages:', totalPages);
            const paginationContainer = document.getElementById('pagination-buttons');
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
}
