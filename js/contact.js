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
// Validation js

let form = document.querySelector('form');

//Ecouter la modification de l'email
form.email.addEventListener('change', function() {
  validEmail(this);
});


// ***************** Validation EMAIL *****************
const validEmail = function(inputEmail) {
  //creation de la reg exp pour validation email
  let emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$',
    'g'
  );

//Recuperation de la balise SMALL
let small = inputEmail.nextElementSibling;

//On test l'expression reguliere
if(emailRegExp.test(inputEmail.value)){
  small.innerHTML = 'Adresse Valide';
  small.classList.remove('text-red-500');
  small.classList.add('text-green-500');
}else{
  small.innerHTML = 'Adresse Non Valide';
  small.classList.remove('ext-green-500');
  small.classList.add('text-red-500');
}
};



// ***************** Validation PRENOM et NOM *****************
// Ecoute pour le prénom
form.firstname.addEventListener('change', function() {
  validName(this);
});
// Ecoute pour le nom de famille
form.lastname.addEventListener('change', function() {
  validName(this);
});

const validName = function(inputName) {
  let nameRegExp = /^[a-zA-ZÀ-ÿ\s-]{3,12}$/;
  let small = inputName.nextElementSibling;
  
  if (nameRegExp.test(inputName.value)) {
    small.innerHTML = 'name Valide';
    small.classList.remove('text-red-500');
    small.classList.add('text-green-500');
  } else {
    small.innerHTML = 'Name is Valide';
    small.classList.remove('text-green-500');
    small.classList.add('text-red-500');
  }
};


// ***************** Validation MESSAGE *****************
form.message.addEventListener('change', function() {
  validMessage(this);
});

const validMessage = function(inputMessage) {
  let small = inputMessage.nextElementSibling;
  
  if (inputMessage.value.length >= 10) {
    small.innerHTML = 'Message Valide';
    small.classList.remove('text-red-500');
    small.classList.add('text-green-500');
  } else {
    small.innerHTML = 'messsage is too short';
    small.classList.remove('text-green-500');
    small.classList.add('text-red-500');
  }
};



// ***************** Validation TELEPHONE *****************
// Écouter les changements du champ de téléphone
form.tel.addEventListener('change', function() {
  validTel(this);
});

const validTel = function(inputTel) {
  // Définition de l'expression régulière pour le format de téléphone
  let telRegExp =  /^\d{10}$/;

  // Sélection de l'élément <small> suivant pour afficher le message
  let small = inputTel.nextElementSibling;
  
  // Teste l'expression régulière
  if (telRegExp.test(inputTel.value)) {
    small.innerHTML = 'number Valide';
    small.classList.remove('text-red-500');
    small.classList.add('text-green-500');
  } else {
    small.innerHTML = 'Number is not Valide';
    small.classList.remove('text-green-500');
    small.classList.add('text-red-500');
  }
};


function validateForm() {
  // Exécute les fonctions de validation pour chaque champ
  validEmail(form.email);
  validName(form.firstname);
  validName(form.lastname);
  validTel(form.tel);
  validMessage(form.message);
  
  // Vérifie si tous les champs sont valides
  let allValid = 
      form.email.nextElementSibling.classList.contains('text-green-500') &&
      form.firstname.nextElementSibling.classList.contains('text-green-500') &&
      form.lastname.nextElementSibling.classList.contains('text-green-500') &&
      form.tel.nextElementSibling.classList.contains('text-green-500') &&
      form.message.nextElementSibling.classList.contains('text-green-500');
  
  if (allValid) {
    // Afficher le message de confirmation
    let confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.classList.remove('hidden');

    // Masquer tous les messages de validation <small>
    document.querySelectorAll('form small').forEach(small => {
      small.innerHTML = '';
    });

    // Réinitialiser le formulaire
    form.reset();

    // Masquer le message de confirmation après 3 secondes
    setTimeout(() => {
      confirmationMessage.classList.add('hidden');
    }, 3000);
  }
}


 let btn=document.getElementById("shop");
 btn.addEventListener('click',function(){
  window.location.href='../pages/store.html';
 })


