//cart
// var btnCount = document.getElementsByClassName("")
let cartIcon=document.querySelector("#cart-icon");
let cart=document.querySelector('.cart');
let closeCart=document.querySelector('#close-cart');
var total = 0;

cartIcon.onclick = () =>{
    cart.classList.add("active");
};
closeCart.onclick = () =>{
    cart.classList.remove("active");
};
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",ready);

}else{
    ready();
} 

function ready(){
    var removeCartButtons = document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons)
    for (var i=0; i< removeCartButtons.length; i++){
        var button= removeCartButtons[i]
        button.addEventListener('click' , removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for(var i = 0; i<quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //add to cart
    var noti = document.querySelector("h1");
    var addCart= document.getElementsByClassName("cart-btn");
    for(var i = 0; i<addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
        
    }
    for (but of addCart){
        but.addEventListener('click', (e) =>{
         var add = Number(noti.getAttribute('data-count')|| 0);
         noti.setAttribute("data-count",add + 1);
         noti.classList.add("zero");
        })
    }
   
   
    //buy button work
    document.getElementsByClassName('btn-cart')[0].addEventListener('click',buyButtonClicked);


   
   
    
}
//buy button clicked
function buyButtonClicked(){
    // alert('Your order is placed');

    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    makePayment()
    updatetotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value=1;
    } 
    updatetotal();
}

//Add to cart
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName("p-name")[0].innerText;
    var price = shopProducts.getElementsByClassName("p-price")[0].innerText;
    var productimg = shopProducts.getElementsByClassName("product-img")[0].src;

  
    
    addProductToCart(title, price,productimg);
    updatetotal();
}
 function  addProductToCart(title, price,productimg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert("You have already added this to cart");
            return;
        }
    
    }
    
    var cartBoxContent=`    
    <img src="${productimg}" class="cart-img">
   <div class="detail-box">
   <div class="cart-product-title">${title}</div>
  <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
  </div>
 <i class="fa-solid fa-trash cart-remove"></i>` ;
 
 cartShopBox.innerHTML = cartBoxContent;
 cartItems.append(cartShopBox);
 cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
 cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);
 

 
     
 }
  
   //update total
 function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    // var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("N",""));
        var quantity = quantityElement.value;
        total = total + price*quantity;
    }
        total = Math.round(total*100)/100;

        document.getElementsByClassName('total-price')[0].innerText="N" + total;
       
    }


    // flutterwave function
    function makePayment() {
        if (total) {
            FlutterwaveCheckout({
                public_key: "FLWPUBK_TEST-d0ade36d233e37af0021710e37b1fd35-X",
                tx_ref: "titanic-48981487343MDI0NzMx",
                amount: total,
                currency: "NGN",
                payment_options: "card, mobilemoneyghana, ussd",
                redirect_url: "google.com",
                meta: {
                    consumer_id: 23,
                    consumer_mac: "92a3-912ba-1192a",
                },
                customer: {
                    email: "rose@unsinkableship.com",
                    phone_number: "08102909304",
                    name: "Rose DeWitt Bukater",
                },
                customizations: {
                    title: "HUI Express",
                    description: "Payment for products",
                    logo: "https://huiexpress.github.io/HUIExpress.com/IMAGES/HUI2.png",
                },
            });
        }
        else {
            alert('No total value.')
        }
    }
