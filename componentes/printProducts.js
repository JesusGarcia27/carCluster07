function products(products) {
  const db = [...products];
  let base = JSON.parse(localStorage.getItem(`dataBase`))
  function printProducts(lista) {
    const contenedorProductos = document.getElementById(`contenedorProductos`);
    let codigo = ``;
    for (let product in lista) {
      let datos = lista[product];
      let id = datos[`id`];
      let nombre = datos[`name`];
      let precio = datos[`price`];
      let stock = datos[`quantity`];
      let imagen = datos[`image`];
      let description = datos[`description`];
      codigo += `<article class="producto_card">
            <div class="producto_img">
            <img src="${imagen}" alt="producto ${id}" title="${description}" loading="lazy">
            </div>
            <div class="producto_contenido">
              <span class="price">$ ${precio}</span>
              <span class="stok">Disponibles: ${stock}</span>
              <button type="button" class="boton_carrito add_cart" data-id="${id}">
              <i class="fa-solid fa-cart-shopping add_cart" data-id="${id}"></i>
              </button>
            <h3 class="name">${nombre}</h3>
            </div>
          </article>`;
    }
    contenedorProductos.innerHTML = codigo;
  }
 // base = base ? base: (db , localStorage.setItem(`dataBase`, JSON.stringify(db)));
  base = base ? base: (localStorage.setItem(`dataBase`, JSON.stringify(db)), base = db);
  printProducts(base)
  return {
    db,
    printProducts, 
  };
}

export default products;
