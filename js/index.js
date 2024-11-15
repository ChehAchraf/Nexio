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
/*aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa*/

const menutoggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const carttoggle = document.getElementById('cart-toggle');
const cartmenu = document.getElementById('cart-menu');
const cartclose = document.getElementById('cart-close');
menutoggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
function showOnCart(cart){
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
}
function openCard(){
    cartmenu.style.transform = "translateX(0)"
 const cart = JSON.parse(localStorage.getItem('cart') )|| [];

       showOnCart(cart)
    
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
function closeCard(){
    cartmenu.style.transform = "translateX(100%)"

}

function animation() {
    const slidesContainer = document.querySelector('#slider-conatiner'); // Fixed typo
    const slides = document.querySelectorAll('.slider');
  
    if (!slidesContainer || slides.length === 0) {
      console.error("Le conteneur des slides ou les slides n'ont pas été trouvés.");
      return; 
    }
  
    let slideWidth = slides[0].offsetWidth;
    let currentIndex = 0;
    function startSlider() {
      gsap.to(slidesContainer, {
        x: `-${slideWidth * currentIndex}px`, // Décalage de chaque slide
        duration: 1,                          // Durée de l'animation
        ease: 'power2.inOut',                  // Ease pour une transition fluide
        onComplete: () => {                    // Une fois l'animation terminée
          currentIndex++;                      // Passe à l'image suivante
          if (currentIndex >= slides.length) { // Si fin de la liste des images
            currentIndex = 0;                  // Reviens au début
          }
          setTimeout(startSlider, 3000);       // Attendre 3s avant la prochaine
        }
      });
    }
  
    
    function updateSlideWidth() {
      slideWidth = slides[0].offsetWidth; 
    }
  

    setTimeout(startSlider, 3000);
  

    window.addEventListener('resize', () => {
      updateSlideWidth();
    });
  }
  

  document.addEventListener('DOMContentLoaded', animation);
  