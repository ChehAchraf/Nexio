
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
  let nameRegExp = /^[a-zA-ZÀ-ÿ\s-]{5,12}$/;
  let small = inputName.nextElementSibling;
  
  if (nameRegExp.test(inputName.value)) {
    small.innerHTML = 'Nom Valide';
    small.classList.remove('text-red-500');
    small.classList.add('text-green-500');
  } else {
    small.innerHTML = 'Nom Non Valide';
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
    small.innerHTML = 'Message trop court (min. 10 caractères)';
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
  let telRegExp = /^\+?[0-9\s.-]{10,15}$/;

  // Sélection de l'élément <small> suivant pour afficher le message
  let small = inputTel.nextElementSibling;
  
  // Teste l'expression régulière
  if (telRegExp.test(inputTel.value)) {
    small.innerHTML = 'Numéro Valide';
    small.classList.remove('text-red-500');
    small.classList.add('text-green-500');
  } else {
    small.innerHTML = 'Numéro Non Valide (10-15 chiffres, peut inclure +, espaces, - ou .)';
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