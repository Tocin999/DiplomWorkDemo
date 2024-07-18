//adapt cart
// document.querySelector("#cart").addEventListener("click", () => {
//     document.querySelector("#cart").style.display = "none";
//   });
  
//   document.querySelector("#popup_close").addEventListener("click", () => {
//     document.querySelector("#cart").style.display = "block";
//   });






//burger_menu
$(document).ready(function(){
    $('.header_burger').click(function(event){
        $('.header_burger, .header_menu').toggleClass('active');
        $('body').toggleClass('.lock');
    });
});



//carousel
const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1: -1;
        const slides = button.closest("[data-carousel]").querySelector('[data-slides]');

        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if(newIndex < 0) newIndex = slides.children.length - 1;
        if(newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    });
});








//cart
let cart = [];

function addToCart(productId) {
  const productElement = document.querySelector(`.product:nth-of-type(${productId})`);
  const productName = productElement.querySelector('h2').innerText;
  const productSize = productElement.querySelector(`select#size${productId}`).value;

  // Проверка выбора размера
  if (productSize === 'size') {
    alert('Пожалуйста, выберите размер товара.');
    return;
  }

  const productPrice = parseFloat(productElement.getAttribute('data-price'));
  const productImage = productElement.getAttribute('data-image');

  // Проверяем, есть ли уже такой товар в корзине
  const existingItem = cart.find(item => item.name === productName && item.size === productSize);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    const item = {
      name: productName,
      size: productSize,
      price: productPrice,
      image: productImage,
      quantity: 1
    };
    cart.push(item);
  }

  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';
  
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.style.width = '50px';
    li.appendChild(img);

    const itemInfo = document.createElement('div');
    itemInfo.textContent = `${item.name} | Размер: ${item.size} | Цена: ${item.price}₸ | Количество: ${item.quantity}`;
    li.appendChild(itemInfo);

    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', () => decreaseQuantity(index));
    decreaseButton.classList.add('minus_btn');
    li.appendChild(decreaseButton);
    
    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', () => increaseQuantity(index));
    increaseButton.classList.add('plus_btn');
    li.appendChild(increaseButton);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete_btn');
    deleteButton.addEventListener('click', () => removeFromCart(index));
    li.appendChild(deleteButton);

    

    

    cartList.appendChild(li);
    totalPrice += item.price * item.quantity;
  });

  document.getElementById('cart-total').textContent = `Итого: ${totalPrice}₸`;
  document.getElementById('cart-count').textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart(); 
}

function increaseQuantity(index) {
  cart[index].quantity++;
  updateCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    removeFromCart(index); // Если количество стало нулевым, удаляем товар из корзины
  }
  updateCart();
}




//open_and_close_the_cart
document.querySelector("#cart_btn").addEventListener("click", () => {
document.querySelector("#cart").style.display = "block";
});
  
document.querySelector("#cart_close").addEventListener("click", () => {
 document.querySelector("#cart").style.display = "none ";
});


















