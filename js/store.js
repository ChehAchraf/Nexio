let modal = document.getElementById("modal");
let checkoutBtn = document.getElementById("Checkout-btn");
let modalCloseBtn = document.getElementById("modalCloseBtn");
let validationButton = document.getElementById("validation-btn");

function showCheckout(){
    closeCard()
    const panier = JSON.parse(localStorage.getItem("cart"))
    document.getElementById('table').innerHTML=`
    <tr class="border-2">
                <th class="border-2 px-16">Product/Service</th>
                <th class="border-2 px-16">Quantity</th> 
                <th class="border-2 px-16">Unit Price</th>
                <th class="border-2 px-16">Subtotal</th>
            </tr>
    `
    console.log(panier)
    panier.forEach(item => {
        const tr = document.createElement('tr')
        tr.className = "border-2"
    
        tr.innerHTML=`
          <th class="border-2 px-16">${item.name}</th>
                        <th class="border-2 ">${item.Bquantity}</th> 
                        <th class="border-2 ">${item.price}</th>
                        <th class="border-2 ">Subtotal</th>
        `
        document.getElementById('table').appendChild(tr)
    })
   modal.style.display="flex"
    cartmenu.classList.add('translate-x-full');

}
checkoutBtn.addEventListener("click",showCheckout)
modalCloseBtn.addEventListener("click" , function(){
   modal.style.display="none"
})


validationButton.addEventListener("click" , function(){

    isConfirme = confirm("Valid your cart !");

    if(isConfirme){
        cartmenu.style.transform = "translateX(100%)"
        showCheckout();
    }
})


const menutoggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const carttoggle = document.getElementById('cart-toggle');
const cartmenu = document.getElementById('cart-menu');
const cartclose = document.getElementById('cart-close');
menutoggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

carttoggle.addEventListener('click', function(){
    const cart = JSON.parse(localStorage.getItem('cart') )|| [];

        document.getElementById('item-list').innerHTML = ``
       console.log("aa", cart)
       let total =0;
        cart.forEach(item => {
            
            const li = document.createElement('li')
            li.className = 'flex justify-between text-sm text-gray-600'
            li.innerHTML = `
                            <div class="flex flex-col">
                             <span>${item.name} (${item.Bquantity})</span>
                             <div class="flex gap-4">
                              <label for="cart-quantity" >Quantity:</label>
                                        <input 
                                            type="number" 
                                            id="cart-quantity-${item.id}" 
                                            min="1" 
                                           value="${item.Bquantity}"
                                           onchange="updateQuantity(${item.id}, this)"
                                            class="border border-gray-300 rounded w-16 text-center" 
                                        /> </div>
                             </div>
                            <span>${item.price * item.Bquantity}.00$ </span>`
            document.getElementById('item-list').appendChild(li)
            total += item.price * item.Bquantity
        })
        document.getElementById("total-p").innerText = total + ".00$" 
})
    
 
    

function closeCard(){
    cartmenu.style.transform = "translateX(100%)"

}
let connection = new XMLHttpRequest();
let product_container = document.getElementById('product');
let cate = document.getElementById('sort-by-categorie');
const limit = 12;
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
                localStorage.setItem("data", JSON.stringify(filteredById))
                function getFilteredProducts() {
                    let filteredProducts = filteredById.filter((item) => {
                        if (cate.value && cate.value !== "") {
                            return item.category === cate.value;
                        }
                        return true;  //
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
                                <img class="w-full h-50 object-cover" src="${item.imageUrl}" alt="${item.marque}">
                                <div class="flex justify-between items-center flex-wrap w-full space-y-3">
                                    <p class="text-2xl text-[#1A0B5B] w-1/2">${item.marque}</p>
                                    <p class="text-2xl text-[#1A0B5B] w-1/2 text-right">${item.price}.00$</p>
                                    <div class="flex justify-between space-x-2 w-full">
                                        <a id="cut-btn" href="#" onclick="customizeItem(${item.id})" class="text-xs mt-2 md:w-1/2   text-[#1A0B5B] md:text-lg underline pl-4">Customize</a>
                                        <button id="addToCartt" onclick="addToCart(${item.id})" type="button" class="md:w-1/2 py-1 px-4 text-xs md:text-base md:py-1 md:px-2 mr-8 bg-[#1A0B5B] text-white hover:bg-[#150a42] focus:outline-none focus:ring-2 focus:ring-[#FB2E86] focus:ring-opacity-50">
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    });         
                }

                pagination(1);
                cate.addEventListener('change', function () {
                    pagination(1);  
                });
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

function showOnCart(cart){
    document.getElementById('item-list').innerHTML = ``
   let total =0;
    cart.forEach(item => {
        console.log(item.imageUrl)
        const li = document.createElement('li')
        li.className = 'flex justify-between text-sm text-gray-600'
        li.innerHTML = `
                        <div class="flex flex-col">
                         <span>${item.name} (${item.Bquantity})</span>
                         <div class="flex gap-4">
                          <label for="cart-quantity" >Quantity:</label>
                                    <input 
                                        type="number" 
                                        id="cart-quantity-${item.id}" 
                                        min="1" 
                                       value="${item.Bquantity}"
                                       onchange="updateQuantity(${item.id}, this)"
                                        class="border border-gray-300 rounded w-16 text-center" 
                                    /> </div>
                         </div>
                        <span>${item.price * item.Bquantity}.00$ </span>`
        document.getElementById('item-list').appendChild(li)
        total += item.price * item.Bquantity
    });
    document.getElementById("total-p").innerText = total + ".00$"; 
    document.getElementById("Total-tax").innerHTML=`<li class="font-bold ml-5">Total Amount, TAX:</li>`
    const taxTotalList = document.createElement('div');

const totalBeforeTaxes = document.createElement('li');
totalBeforeTaxes.classList.add('ml-10', 'font-secondary');
totalBeforeTaxes.innerHTML = `Total Before Taxes: ${total}.00$`;

const taxAmount = document.createElement('li');
taxAmount.classList.add('ml-10', 'font-secondary')
taxAmount.innerHTML = `TAX: ${(total / 5)}$`;

const totalAfterTaxes = document.createElement('li');
totalAfterTaxes.classList.add('ml-10', 'font-secondary')
totalAfterTaxes.innerHTML = `Total After Taxes: ${(total - (total / 5 ))}$`;

taxTotalList.appendChild(totalBeforeTaxes);
taxTotalList.appendChild(taxAmount);
taxTotalList.appendChild(totalAfterTaxes);

document.getElementById("Total-tax").appendChild(taxTotalList);

}
function updateQuantity(id, element){
    console.log(element)
    const carrt = JSON.parse(localStorage.getItem('cart') )|| [];
    for(let i =0; i< carrt.length;i++){
        if (carrt[i].id == id){
            carrt[i].Bquantity=parseInt(element.value)
            console.log()
            
        }
   }
   showOnCart(carrt)

    localStorage.setItem("cart", JSON.stringify(carrt))

}
function addToCart(pro) {
    let product;
    const data = JSON.parse(localStorage.getItem('data'));
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == pro) {
            product = data[i];
        }
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const quantity = 1;
    const it = {
        id: product.id,
        name: product.marque,
        price: product.price,
        Bquantity: quantity,
        img: product.imageUrl 
    };

    let found = false;
    let j;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == it.id) {
            found = true;
            j = i;
        }
    }
    if (found) {
        cart[j].Bquantity += 1;
    } else {
        cart.push(it);
    }

    showOnCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));

    cartmenu.style.transform = "translateX(0)";
}
function showCheckout() {
    closeCard();
    const panier = JSON.parse(localStorage.getItem("cart")) || [];
    
    document.getElementById('table').innerHTML = `
        <tr class="border-2">
            <th class="border-2 px-16">Product/Service</th>
            <th class="border-2 px-16">Quantity</th>
            <th class="border-2 px-16">Unit Price</th>
            <th class="border-2 px-16">Subtotal</th>
        </tr>
    `;
    
    let total = 0;
    
    panier.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = "border-2";
        
    
        const subtotal = item.price * item.Bquantity;
        total += subtotal;
        
        tr.innerHTML = `
            <th class="border-2 px-16">${item.name}</th>
            <th class="border-2">${item.Bquantity}</th>
            <th class="border-2">${item.price}.00$</th>
            <th class="border-2">${subtotal}.00$</th>
        `;
        
        document.getElementById('table').appendChild(tr);
    });
  
    
    const taxRate = 0.2;
    const taxAmount = total * taxRate;
    const totalAfterTaxes = total + taxAmount;
  
  
    const taxTotalList = document.createElement('div');
    taxTotalList.innerHTML = `
        <li class="font-bold ml-5">Total Amount, TAX:</li>
        <li class="ml-10 font-secondary">Total Before Taxes: ${total}.00$</li>
        <li class="ml-10 font-secondary">TAX: ${taxAmount.toFixed(2)}$</li>
        <li class="ml-10 font-secondary">Total After Taxes: ${totalAfterTaxes.toFixed(2)}$</li>
    `;
    
    document.getElementById("Total-tax").innerHTML = '';
    document.getElementById("Total-tax").appendChild(taxTotalList);
    
  
    modal.style.display = "flex";
    cartmenu.classList.add('translate-x-full');
  }
  
  modalCloseBtn.addEventListener("click", function() {
    modal.style.display = "none";
  });
