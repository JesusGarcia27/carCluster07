async function obtenerDatos() {
    try {
      const response = await fetch(
        "https://ecommercebackend.fundamentos-29.repl.co/"
      );
      const data = await response.json();
      return data
    } catch (error) {
      console.error(error);
    }
  }
  export default obtenerDatos
