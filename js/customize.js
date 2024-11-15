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
   document.getElementById('cart-menu').classList.add('translate-x-full');

}
checkoutBtn.addEventListener("click",showCheckout)
modalCloseBtn.addEventListener("click" , function(){
   modal.style.display="none"
})


validationButton.addEventListener("click" , function(){

    isConfirme = confirm("Valid your cart !");

    if(isConfirme){
        document.getElementById('cart-menu').style.transform = "translateX(100%)"
        showCheckout();
    }
})

const id = localStorage.getItem('id')
const productDetail = document.getElementById('product-detail')
console.log(id)
let firstTime = true;

let connection = new XMLHttpRequest();
connection.open("GET", 'https://www.brofortech.com/data.json', true);
connection.send();

connection.onreadystatechange = function () {
    if (connection.readyState === 4) {
        if (connection.status === 200) {
           
            let data = JSON.parse(connection.responseText);
            const allProducts = data.products
            const pro = allProducts[id-1]
            console.log(allProducts[id-1])
            const gpu = data.products.filter(item => item.category === 'GPU');
            const cpu = data.products.filter(item => item.category === 'CPU');

            const memory = data.products.filter(item => item.category === 'memoire');
            function fetchGpu(id){
                for (let i=0; i<gpu.length;i++){
                    if (gpu[i].id == id){
                       return gpu[i]
                    }
                }
            
            }
            function fetchCpu(id){
                for (let i=0; i<cpu.length;i++){
                    if (cpu[i].id == id){
                        return cpu[i]
                    }
                }
                
            }
            function fetchMemoire(id){
                for (let i=0; i<memory.length;i++){
                    if (memory[i].id == id){
                        return memory[i]
                    }
                }
                
            }
            function showProduct(pro){
                productDetail.innerHTML = `
            <div class="images flex gap-4 w-1/3 h-full">
                    
                      <div class="image 2  bg-red">
                          <img class=" " src="${pro.imageUrl}" alt="">
                      </div>

                  </div>
                  <div class="content flex justify-center flex-col gap-4">
                      <div class="flex flex-col gap-4">
                          <h3 class="text-[#101750] font-bold text-3xl">${pro.marque}</h3>
                          <span class="flex items-center gap-2">
                              <div>
                                  <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                  <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                  <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                  <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                  <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                              </div>
                              <p> (22)</p>
                          </span>
                          <div class="flex gap-8">
                              <p class="text-[#151875]">${pro.price}.00$</p>
                              <p class="line-through text-[#FB2E86]">${pro.price+99}.00$</p>
                          </div>
                      </div>
                      <div class="text-[#151875] flex flex-col gap-4">
                          <p id="product-description" class="text-[#A9ACC6]">${pro.description}.</p>
                          <div class="flex gap-4">
                              <p>Color: </p>
                              <div class="flex gap-2">
                                  <img id="red" src="../img/customize/apah.svg" alt="">
                                  <img id="black" src="../img/customize/Ellipse 64.png" alt="">
                                  <img id="orange" src="../img/customize/Ellipse 65.png" alt="">
                              </div>
                          </div>
                          <div id="content" class="flex"></div>
                          <div class="flex items-center gap-4">
                                  <label for="quantity" class="text-[#151875]">Quantity:</label>
                                  <input 
                                      type="number" 
                                      id="quantity" 
                                      min="1" 
                                     value="1"
                                      class="border border-gray-300 rounded w-16 text-center" 
                                  />
                                  <a id="addToCartt" class="cursor-pointer hover:underline text-[#1A0B5B]">Add to Cart</a>
                              </div>
                          <p>Categories : Laptops</p>
                          <p>Tags : Pc , Good Quality</p>
                      </div>
                  </div>
          `
            }
            console.log(gpu,cpu,memory)
            if(pro.category === 'PC')
            {
                let proGpu = fetchGpu(pro.idGPU)
                let proCpu = fetchCpu(pro.idCPU)
                let proMem = fetchMemoire(pro.idMemoire)
                console.log(pro, proCpu, proGpu, proMem)
                pro.price = pro.priceMini + proCpu.price + proGpu.price + proMem.price

                productDetail.innerHTML=`
                     <div class="images flex gap-4 ">
                  
                    <div class="image 2">
                        <img class=" w-72 h-72md:h-full" src="${pro.imageUrl}" alt="">
                    </div>

                </div>
                <div class="content flex justify-center flex-col gap-2">
                    <div class="flex flex-col gap-4">
                        <h3 class="text-[#101750] font-bold text-3xl">${pro.marque}</h3>
                        <span class="flex items-center gap-2">
                            <div>
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                            </div>
                            <p> (22)</p>
                        </span>
                        <div class="flex gap-8">
                            <p id="product-price" class="text-[#151875]">${pro.price}.00$</p>
                            <p class="line-through text-[#FB2E86]">${pro.price+99}.00$</p>
                        </div>
                    </div>
                    <div class=" flex flex-col gap-2">
                        <p id="product-description" class="text-[#A9ACC6]">${pro.description}. GPU: ${proGpu.serie} CPU: ${proCpu.serie} Memoire: ${proMem.marque}</p>
                        <div class="text-[#151875] flex gap-4">
                            <p>Color: </p>
                            <div class="flex gap-2">
                                <img src="../img/customize/apah.svg" alt="">
                                <img src="../img/customize/Ellipse 64.png" alt="">
                                <img src="../img/customize/Ellipse 65.png" alt="">
                            </div>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div class="flex gap-8">
                                <select class="bg-[#EEE8E8] p-2  pr-4 rounded-xl " onchange="show()" name="gpu" id="gpu" >
                                    <option value="" class="text-[#848484]" disabled selected>Choose a GPU</option>
                                    <option value="NVIDIA">NVIDIA</option>
                                    <option value="AMD">AMD</option>
                                    <option value="Intel">Intel</option>
                                    
                                  </select>
                                  <select class="bg-[#EEE8E8] p-2 pr-4 rounded-xl hidden " name="gpu-serie" id="gpu-serie" >
                                    <option value="" class="text-[#848484]" disabled selected>Choose a GPU Serie</option>
                                  
                                  </select>
                                </div>
                            <div class="flex gap-8">
                                <select class="bg-[#EEE8E8] p-2 pr-4 rounded-xl "  name="cpu" id="cpu" >
                                    <option value="" class="text-[#848484]" disabled selected>Choose a CPU</option>
                                    <option value="Intel">Intel</option>
                                    <option value="AMD">AMD</option>
                                  
                                  </select>
                                  <select class="bg-[#EEE8E8] p-2 pr-4 rounded-xl hidden" name="cpu-serie" id="cpu-serie" >
                                    <option value="" class="text-[#848484]" disabled selected>Choose a CPU Serie</option>
                                  
                                  </select>
                                </div>
                                <div class="flex gap-8">
                                    <select class="bg-[#EEE8E8] p-2 pr-4 rounded-xl " name="memoire" id="memoire" >
                                        <option value="" class="text-[#848484]" disabled selected>Choose a Memory</option>
                                        
                                    </select>
                                    </div>
                        </div>
                         <div class="flex items-center gap-4">
                                      <label for="quantity" class="text-[#151875]">Quantity:</label>
                                      <input 
                                          type="number" 
                                          id="quantity" 
                                          min="1" 
                                         value="1"
                                          class="border border-gray-300 rounded w-16 text-center" 
                                      />
                                      <a id="addToCartt" class="cursor-pointer hover:underline text-[#1A0B5B]">Add to Cart</a>
                                  </div>   
                        <div class="flex gap-8">
                            <p class="text-[#151875]">Categories : Laptops</p>
                            <p class="text-[#151875]">Tags : Pc , Good Quality</p>
                        </div>
                      
                    </div>
                </div> 
                `
                document.getElementById("addToCartt").addEventListener("click", () => addToCart(pro))

                document.getElementById('gpu').addEventListener('change',  showGPU)
                document.getElementById('cpu').addEventListener('change', showCPU)
                document.getElementById('cpu-serie').addEventListener('change', changeCpu)
                document.getElementById('gpu-serie').addEventListener('change', changeGpu)
                document.getElementById('memoire').addEventListener('change', changeMem)
               

               
                const mem = document.getElementById("memoire");
                const gpuSerieInput = document.getElementById("gpu-serie");
                const gpuInput = document.getElementById("gpu");
                const cpuSerieInput = document.getElementById("cpu-serie");
                const cpuInput = document.getElementById("cpu");
                function showGPU(){
                    // GPU dropdown
                    if (gpu.value == "" ){
                        gpuSerieInput.style.display="none"} 
                    else {
                        gpuSerieInput.style.display="block"
                        if (gpuInput.value == 'AMD'){
                            document.getElementById("gpu-serie").innerHTML=`
                            <option value="" class="text-[#848484]" disabled selected>Choose a GPU Serie</option>
                       `
                            const gpuS = data.products.filter(item => item.marque === 'AMD' && item.category == 'GPU');
                            console.log(gpuS)
                            gpuS.forEach(item => {
                               
                                const option = document.createElement("option");
                               
                                option.value = item.id;        
                                option.textContent = item.serie;
                                document.getElementById("gpu-serie").appendChild(option);
                            });
                          
                        }
                        else if (gpuInput.value == 'NVIDIA')
                        {
                            document.getElementById("gpu-serie").innerHTML=`
                                     <option value="" class="text-[#848484]" disabled selected>Choose a GPU Serie</option>
                                `
                            const gpuS = data.products.filter(item => item.marque === 'NVIDIA' && item.category == 'GPU');
                            console.log(gpuS)
                            gpuS.forEach(item => {
                                
                                const option = document.createElement("option");
                                option.value = item.id;        
                                option.textContent = item.serie; 
                                document.getElementById("gpu-serie").appendChild(option);
                            });
                        }
                        else 
                        {
                            document.getElementById("gpu-serie").innerHTML=`
                            <option value="" class="text-[#848484]" disabled selected>Choose a GPU Serie</option>
                       `
                            const gpuS = data.products.filter(item => item.marque === 'Intel' && item.category == 'GPU');
                            console.log(gpuS)
                            gpuS.forEach(item => {
                                const option = document.createElement("option");
                                option.value = item.id;        // Use item.id or another unique identifier as the option value
                                option.textContent = item.serie; // Display the GPU name in the dropdown
                                document.getElementById("gpu-serie").appendChild(option);
                            }); 
                        }
                       
                       
                        

                    }
                }     
                 // CPU DROPDOWN
                function showCPU(){
                    if (cpuInput.value == "" ){
                        cpuSerieInput.style.display="none"} 
                    else {
                        cpuSerieInput.style.display="block"
                        if (cpuInput.value == 'AMD'){
                            document.getElementById("cpu-serie").innerHTML=`
                            <option value="" class="text-[#848484]" disabled selected>Choose a CPU Serie</option>
                       `
                            const cpuS = data.products.filter(item => item.marque === 'AMD' && item.category == 'CPU');
                            console.log(cpuS)
                            cpuS.forEach(item => {
                                const option = document.createElement("option");
                                option.value = item.id;        
                                option.textContent = item.serie; 
                                document.getElementById("cpu-serie").appendChild(option);
                            });
                            
                        }
                       
                        else 
                        {
                            document.getElementById("cpu-serie").innerHTML=`
                            <option value="" class="text-[#848484]" disabled selected>Choose a CPU Serie</option>
                       `
                            const cpuS = data.products.filter(item => item.marque === 'Intel' && item.category == 'CPU');
                            console.log(cpuS)
                            cpuS.forEach(item => {
                                const option = document.createElement("option");
                                option.value = item.id;        // Use item.id or another unique identifier as the option value
                                option.textContent = item.serie; // Display the cpu name in the dropdown
                                document.getElementById("cpu-serie").appendChild(option);
                            }); 
                        }
                }      
            }    
                
                memory.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.id;        // Use item.id or another unique identifier as the option value
                    option.textContent = item.marque; // Display the GPU name in the dropdown
                    mem.appendChild(option);
                });
                
                document.getElementById('red').addEventListener('click', ()=> changeColor("Red"))
                document.getElementById('black').addEventListener('click', ()=> changeColor("Black"))
                document.getElementById('orange').addEventListener('click', ()=> changeColor("Orange"))
                function  changeColor(color){
                    pro.color=color
                    document.getElementById("product-description").innerText= pro.description+ " Description: " + pro.description + " Color: " + pro.color

                }
                function changeCpu(){
                    const newCpu = document.getElementById('cpu-serie').value
                        pro.price -= proCpu.price
                        proCpu = allProducts[newCpu-1]
                        console.log(proCpu)
                        pro.price += proCpu.price
                        console.log(pro.price)
                        document.getElementById("product-price").innerText = pro.price + ".00$"
                        document.getElementById("product-description").innerText = pro.description + " GPU: " + proGpu.marque +" " + proGpu.serie + " CPU: " + proCpu.marque +" "+ proCpu.serie + " Memoire: " + proMem.marque + " Color: " + pro.color
                        
                        

                }
                function changeGpu(){
                    const newGpu = document.getElementById('gpu-serie').value
                    pro.price -= proGpu.price
                    proGpu = allProducts[newGpu-1]
                    console.log(proGpu)
                    pro.price += proGpu.price
                    console.log(pro.price)
                    document.getElementById("product-price").innerText = pro.price + ".00$"
                    document.getElementById("product-description").innerText = pro.description + " GPU: " + proGpu.marque +" " + proGpu.serie + " CPU: " + proCpu.marque +" "+ proCpu.serie + " Memoire: " + proMem.marque + " Color: " + pro.color

                }
                function changeMem(){
                    const newMem = document.getElementById('memoire').value
                    pro.price -= proMem.price
                    proMem = allProducts[newMem-1]
                    console.log(proMem)
                    pro.price += proMem.price
                    console.log(pro.price)
                    document.getElementById("product-price").innerText = pro.price + ".00$"
                    document.getElementById("product-description").innerText = pro.description + " GPU: " + proGpu.marque +" " + proGpu.serie + " CPU: " + proCpu.marque +" "+ proCpu.serie + " Memoire: " + proMem.marque + " Color: " + pro.color


                }

            } else if (pro.category === 'souris') {
                showProduct(pro);
                const content = document.getElementById("content")
                document.getElementById("product-description").innerText= pro.description + " DPI: " + pro.DPI + " Color: " + pro.color

                content.innerHTML=`<label for="dpi" class="text-[#151875]">DPI: &nbsp;</label>
            <div class="flex gap-2" id="dpi-options">
                <input type="radio" id="dpi-300" name="dpi" value="300" >
                <label for="dpi-300">300 DPI</label>
                <input type="radio" id="dpi-600" name="dpi" value="600" >
                <label for="dpi-600">600 DPI</label>
                <input type="radio" id="dpi-1200" name="dpi" value="1200" >
                <label for="dpi-1200">1200 DPI</label>
            </div>     
                `
                
                document.getElementById('dpi-300').addEventListener('change', ()=> changeDPI(300))
                document.getElementById('dpi-600').addEventListener('change', ()=> changeDPI(600))
                document.getElementById('dpi-1200').addEventListener('change', ()=> changeDPI(1200))
                
                document.getElementById('red').addEventListener('click', ()=> changeColor("Red"))
                document.getElementById('black').addEventListener('click', ()=> changeColor("Black"))
                document.getElementById('orange').addEventListener('click', ()=> changeColor("Orange"))
                function  changeColor(color){
                    pro.color=color
                    document.getElementById("product-description").innerText= pro.description+ " Description: " + pro.description + " Color: " + pro.color

                }
                function changeDPI(newDPI){
                    pro.DPI = newDPI
                    document.getElementById("product-description").innerText= pro.description + " DPI: " + pro.DPI + " Color: " + pro.color

                }
                
            }
            else if (pro.category === 'electromenager') {
                showProduct(pro);
                const content = document.getElementById("content")
                document.getElementById("product-description").innerText= pro.description + " Litrage: " + pro.litrage + " Color: " + pro.color

                content.innerHTML=`<label for="litrage" class="text-[#151875]">litrage: &nbsp;</label>
            <div class="flex gap-2" id="litrage-options">
                <input type="radio" id="litrage-30" name="litrage" value="30" >
                <label for="litrage-30">30 Litrage</label>
                <input type="radio" id="litrage-60" name="litrage" value="60" >
                <label for="litrage-60">60 Litrage</label>
                <input type="radio" id="litrage-120" name="litrage" value="120" >
                <label for="litrage-120">120 Litrage</label>
            </div>     
                `
                
                document.getElementById('litrage-30').addEventListener('change', ()=> changeLitrage(30))
                document.getElementById('litrage-60').addEventListener('change', ()=> changeLitrage(60))
                document.getElementById('litrage-120').addEventListener('change', ()=> changeLitrage(120))
                
                document.getElementById('red').addEventListener('click', ()=> changeColor("Red"))
                document.getElementById('black').addEventListener('click', ()=> changeColor("Black"))
                document.getElementById('orange').addEventListener('click', ()=> changeColor("Orange"))
                function  changeColor(color){
                    pro.color=color
                    document.getElementById("product-description").innerText= pro.description+ " Description: " + pro.description + " Color: " + pro.color

                }
                function changeLitrage(newlitrage){
                    pro.litrage = newlitrage
                    document.getElementById("product-description").innerText= pro.description + " litrage: " + pro.litrage + " Color: " + pro.color

                }
                
            }
            else if (pro.category === 'casque') {
                showProduct(pro);
                const content = document.getElementById("content")
                let taille ="xl"
                document.getElementById("product-description").innerText= pro.description + " Taille: " + taille + " Color: " + pro.color

                content.innerHTML=`<label for="taille" class="text-[#151875]">taille: &nbsp;</label>
            <div class="flex gap-2" id="taille-options">
                <input type="radio" id="taille-m" name="taille" value="m" >
                <label for="taille-m">m taille</label>
                <input type="radio" id="taille-l" name="taille" value="l" >
                <label for="taille-l">l taille</label>
                <input type="radio" id="taille-xl" name="taille" value="xl" >
                <label for="taille-xl">xl taille</label>
            </div>     
                `
                
                document.getElementById('taille-m').addEventListener('change', ()=> changetaille("m"))
                document.getElementById('taille-l').addEventListener('change', ()=> changetaille("l"))
                document.getElementById('taille-xl').addEventListener('change', ()=> changetaille("xl"))
                
                document.getElementById('red').addEventListener('click', ()=> changeColor("Red"))
                document.getElementById('black').addEventListener('click', ()=> changeColor("Black"))
                document.getElementById('orange').addEventListener('click', ()=> changeColor("Orange"))
                function  changeColor(color){
                    pro.color=color
                    document.getElementById("product-description").innerText= pro.description+ " Description: " + pro.description + " Color: " + pro.color

                }
                function changetaille(newtaille){
                    taille = newtaille
                    document.getElementById("product-description").innerText= pro.description + " Taille: " + taille + " Color: " + pro.color

                }
                
            }
            else if (pro.category === 'smartphone') {
                showProduct(pro);
                const content = document.getElementById("content")
              
                document.getElementById("product-description").innerText= pro.description + " CPU: " + pro.cpu + " Color: " + pro.color

                content.innerHTML=`<label for="cpu" class="text-[#151875]">Cpu: &nbsp;</label>
            <div class="flex gap-2" id="cpu-options">
                <input type="radio" id="cpu-snapdragon" name="cpu" value="snapdragon" >
                <label for="cpu-m">Snapdragon CPU</label>
                <input type="radio" id="cpu-exynos" name="cpu" value="exynos" >
                <label for="cpu-exynos">Exynos CPU</label>
               
            </div>     
                `
                
                document.getElementById('cpu-snapdragon').addEventListener('change', ()=> changecpu("Snapdragon"))
                document.getElementById('cpu-exynos').addEventListener('change', ()=> changecpu("Exynos"))
                
                document.getElementById('red').addEventListener('click', ()=> changeColor("Red"))
                document.getElementById('black').addEventListener('click', ()=> changeColor("Black"))
                document.getElementById('orange').addEventListener('click', ()=> changeColor("Orange"))
                function  changeColor(color){
                    pro.color=color
                    document.getElementById("product-description").innerText= pro.description+ " Description: " + pro.description + " Color: " + pro.color

                }
                function changecpu(newcpu){
                    pro.cpu = newcpu
                    document.getElementById("product-description").innerText= pro.description + " CPU: " + pro.cpu + " Color: " + pro.color

                }
                
            }

            else {
                
                showProduct(pro)
                document.getElementById("product-description").innerText= pro.description+ " Description: " + pro.description + " Color: " + pro.color

                document.getElementById('red').addEventListener('click', ()=> changeColor("Red"))
                document.getElementById('black').addEventListener('click', ()=> changeColor("Black"))
                document.getElementById('orange').addEventListener('click', ()=> changeColor("Orange"))
                function  changeColor(color){
                    pro.color=color
                    document.getElementById("product-description").innerText= pro.description+ " Description: " + pro.description + " Color: " + pro.color

                }

                
            }
           
            document.getElementById("addToCartt").addEventListener("click", () => addToCart(pro))

        } else {
            console.error("Error fetching data: " + connection.status);
        }
        
        
    }
}

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
function addToCart(pro){
    console.log(pro)
    const carrt = JSON.parse(localStorage.getItem('cart') )|| [];
   let quantity = parseInt(document.getElementById("quantity").value);

  
   
    const it = {
        id: pro.id,
        name: pro.marque,
        price: pro.price,
        Bquantity: quantity
    }
    let found = false
    let j
   for(let i =0; i< carrt.length;i++){
        if (carrt[i].id == it.id){
            found = true;
            j=i
        }
   }
   if(found){
    carrt[j].Bquantity +=  parseInt(document.getElementById("quantity").value)
   } else{
    carrt.push(it)
   }
   
    showOnCart(carrt)

    localStorage.setItem("cart", JSON.stringify(carrt))

    
        document.getElementById('cart-menu').style.transform = "translateX(0)"
    
       


}
document.getElementById('cart-close').addEventListener("click", function(){
    document.getElementById('cart-menu').style.transform = "translateX(100%)"
})
document.getElementById("cart-toggle").addEventListener("click", function(){
    const carrt = JSON.parse(localStorage.getItem('cart') )|| [];
showOnCart(carrt)
    document.getElementById('cart-menu').style.transform = "translateX(0)"

    
})






