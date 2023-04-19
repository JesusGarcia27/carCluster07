function cart(db, printProducts) {
  // console.log(db);
  let carrito = [];
  let itemContainer = document.getElementById(`itemContainer`);
  let contenedorProductos = document.getElementById(`contenedorProductos`);
  let totalArt = document.querySelector(`.total_articulos`);
  let totalCost = document.querySelector(`.total_cost`);
  let botonComprar= document.querySelector(`.boton_comprar`)
  // localStorage.setItem(`cart`, JSON.stringify(carrito));
  let cart= JSON.parse(localStorage.getItem("cart"));
  let dataBase= JSON.parse(localStorage.getItem(`dataBase`))

  function printVacio() {
    itemContainer.innerHTML=`<div class="cart_empty">
    <p>no hay items en el carrito</p>
    </div>`
    botonComprar.disabled = true
  }
  if (cart) {
    carrito = cart
    prinCart(cart)
  }else{
    printVacio()
    localStorage.setItem(`cart`, JSON.stringify(carrito));
  }
  function prinCart(data) {
    let code = ``;
    for (const product of data) {
      let id = product.id;
      let image = product.image;
      let name = product.name;
      let price = product.price;
      let cantidad = product.cantidad;
      code += `<div class="item_container" data-id="${id}">
            <div class="item_img">
                <img src="${image}" alt="product">
            </div>
            <div class="item_description">
                <h3 class="name">${name}</h3>
            </div>
            <div class="item_cantidad">
                <button><i class="fa-solid fa-plus plus" data-id="${id}"></i></button>
                <span class="cantidad">${cantidad}</span>
                <button><i class="fa-solid fa-minus minus" data-id="${id}"></i></button>
            </div>
            <div class="item_price">
                <span>price: </span>
                <span>$ ${price}</span>
            </div>
            <div class="item_delete">
                <button><i class="fa-solid fa-trash remove" data-id="${id}"></i></button>
            </div>
        </div>`;
    }
    itemContainer.innerHTML = code;
    botonComprar.disabled = false
    obtenerTotales();
    if(itemContainer.innerHTML==``) printVacio()
  }
  function addToCart(idProducto, cantidad = 1) {
    let dbProduct = db.find((elemento) => elemento.id == idProducto);
    let pro = JSON.parse(localStorage.getItem(`dataBase`))
    let productoAnalizar = pro.find((elemento) => elemento.id == idProducto);
    if(productoAnalizar.quantity ==  0) {
      alert(`Producto agotado, por favor intenta despues`)
    }else{
    //else
    let cartItem = {
      id: dbProduct.id,
      image: dbProduct.image,
      name: dbProduct.name,
      price: dbProduct.price,
      stock: dbProduct.quantity,
      cantidad: cantidad,
    };
    let buscarInCart = carrito.find((elemento) => elemento.id == idProducto);
     
    if (buscarInCart) {
      if(buscarInCart.stock==0 || buscarInCart.cantidad == buscarInCart.stock) {
        alert(`El stock no es suficiente para una compra tan grande`)
        buscarInCart.cantidad = buscarInCart.cantidad- 1
      }
      buscarInCart.cantidad += 1;
      prinCart(carrito);
    } else {
      carrito.push(cartItem);
      prinCart(carrito);
    }
    localStorage.setItem(`cart`, JSON.stringify(carrito));
    //termina else
  }
  }
  function removeToCart(idToRemove) {
    carrito = carrito.filter((elemento) => elemento.id != idToRemove);
    localStorage.setItem(`cart`, JSON.stringify(carrito));
    prinCart(carrito);
    
  }
  function plusCart(idToPlus) {
    let obj = carrito.find((elemento) => elemento.id == idToPlus);
    if (obj.cantidad < obj.stock) {
      obj.cantidad += 1;
      localStorage.setItem(`cart`, JSON.stringify(carrito));
      prinCart(carrito);
    }else{
      alert(`El stock no es suficiente para una compra tan grande`)
    }
  }
  function restCart(idToMinus) {
    let obj = carrito.find((elemento) => elemento.id == idToMinus);
    if (obj.cantidad == 1) {
      removeToCart(idToMinus);
    } else {
      obj.cantidad -= 1;
      localStorage.setItem(`cart`, JSON.stringify(carrito));
      prinCart(carrito);
    }
  }
  contenedorProductos.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`add_cart`)) {
      let idProducto = e.target.getAttribute(`data-id`);
      addToCart(idProducto);
    }
  });
  itemContainer.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`remove`)) {
      let idToRemove = e.target.getAttribute(`data-id`);
      removeToCart(idToRemove);
    } else if (e.target.classList.contains(`plus`)) {
      let idToPlus = e.target.getAttribute(`data-id`);
      plusCart(idToPlus);
    } else if (e.target.classList.contains(`minus`)) {
      let idToMinus = e.target.getAttribute(`data-id`);
      restCart(idToMinus);
    }
  });
  function obtenerTotales() {
    let totalProductos = 0;
    let totaldinero = 0;
    let compraTotal=[]
    carrito.forEach((element) => {
      totalProductos += element.cantidad;
      totaldinero += element.cantidad * element.price;
      let compra={}
      let id= element.id
      let cantidad = element.cantidad
      compra={ 
        id,
        cantidad
      }
      compraTotal.push(compra)
    });
    totalArt.innerHTML = totalProductos;
    totalCost.innerHTML = `<strong>$</strong>${totaldinero}`
    localStorage.setItem(`compras`, JSON.stringify(compraTotal))
  }
  botonComprar.addEventListener(`click`, function comprar () {
    let arrayCompras= JSON.parse(localStorage.getItem(`compras`))
    let newdb=[]
    arrayCompras.forEach(element => {
      for (const articulo of db) {
        if( articulo.id == element.id){
          articulo.quantity = articulo.quantity - element.cantidad
          newdb.push(articulo)
        }else{
          newdb.push(articulo)
        }
      }
    });
    dataBase=[...newdb]
    localStorage.setItem(`dataBase`, JSON.stringify(dataBase))
    carrito = [];
    localStorage.setItem(`cart`, JSON.stringify(carrito));
    arrayCompras=[]
    localStorage.setItem(`compras`, JSON.stringify(arrayCompras))
    contenedorProductos.innerHTML= ``
    printProducts(dataBase)
    printVacio()
    totalArt.innerHTML = 0;
    totalCost.innerHTML = 0

  }) 
}

export default cart;
