function carrito() {
  const botonCarrito = document.getElementById(`cart`);
  const cart = document.querySelector(`.cart`);
  botonCarrito.addEventListener(`click`, () => {
    cart.classList.toggle(`cart_active`);
  });

  const closeCart = document.getElementById(`close_cart`);
  closeCart.addEventListener(`click`, () => {
    cart.classList.remove(`cart_active`);
  });
}
export default carrito
