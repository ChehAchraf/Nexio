const menutoggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const carttoggle = document.getElementById('cart-toggle');

const cartclose = document.getElementById('cart-close');









menutoggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});


// checkoutBtn.addEventListener("click",function(){
//     const panier = JSON.parse(localStorage.getItem("cart"))
//     console.log(panier)
//     panier.forEach(item => {
//         const tr = document.createElement('tr')
//         tr.className = "border-2"
    
//         tr.innerHTML=`
//           <th class="border-2 px-16">${item.name}</th>
//                         <th class="border-2 ">${item.Bquantity}</th> 
//                         <th class="border-2 ">${item.price}</th>
//                         <th class="border-2 ">Subtotal</th>
//         `
//         document.getElementById('table').appendChild(tr)
//     })
//    modal.style.display="flex"
//     cartmenu.classList.add('translate-x-full');
// })
// modalCloseBtn.addEventListener("click" , function(){
//    modal.style.display="none"
// })


// validationButton.addEventListener("click" , function(){

//     isConfirme = confirm("Valid your cart !");

//     if(isConfirme){
//         modal.style.display = "flex"
//         cartmenu.classList.add('translate-x-full');
//     }
// })