const menutoggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const carttoggle = document.getElementById('cart-toggle');
const cartmenu = document.getElementById('cart-menu');
const cartclose = document.getElementById('cart-close');
const bteShopNow = document.getElementById('shopNowButton');
const carousel = document.getElementsByClassName('carousel');

let currentPosition = 0;
const scrollSpeed = 1; // Ajustez la vitesse de défilement en pixels

menutoggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

carttoggle.addEventListener('click', () => {
    cartmenu.classList.toggle('translate-x-full'); 
});

cartclose.addEventListener('click', () => {
    cartmenu.classList.add('translate-x-full'); 
});

bteShopNow.addEventListener('click',function(){
   
    window.location.href='../pages/store.html'
});


// document.addEventListener("DOMContentLoaded", function () {
//     const titles = [
//         "Discover Our new high-quality Products",
//         "Top-notch Electronics Just for You",
//         "Uncover the Latest in Tech Innovation"
//     ];
//     const descriptions = [
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
//         "Explore a variety of high-quality electronics that fit your lifestyle and budget.",
//         "Our selection of gadgets and devices will enhance your experience in everyday life."
//     ];

//     let currentIndex = 0;

//     function updateCarouselText() {
//         const titleElement = document.getElementById("carousel-title");
//         const descriptionElement = document.getElementById("carousel-description");

//         titleElement.textContent = titles[currentIndex];
//         descriptionElement.textContent = descriptions[currentIndex];

//         currentIndex = (currentIndex + 1) % titles.length;
//     }

//     // Change text every 3 seconds
//     setInterval(updateCarouselText, 3000);
// });





