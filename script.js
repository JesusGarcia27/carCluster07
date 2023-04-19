import carrito from "./componentes/mostrarCarrito.js";
import obtenerDatos from "./componentes/recurso/obtenerdatos.js";
import products from "./componentes/printProducts.js";
import cart from "./componentes/carrito.js";
import filtrar from "./componentes/list.js";
import loader from "./componentes/loader.js";
import toggleMenu from "./componentes/menu.js";
import darkModeToggle from "./componentes/darkmode.js";


loader()
carrito()
let {db,printProducts} = products (await obtenerDatos())
cart(db,printProducts)
filtrar(printProducts)
