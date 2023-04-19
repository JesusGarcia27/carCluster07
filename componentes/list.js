function filtrar(print) {
    console.log(`hola`)
    let botonLista = document.querySelector(`.boton_lista`)
    let listValue = document.getElementById(`lista`)
    botonLista.addEventListener(`click`, function () {
        let data = JSON.parse(localStorage.getItem(`dataBase`))
        if(listValue.value == `todos`) print( data )
        else{
            let arrayFiltrado = []
            data.forEach( element => {
            if(element.category == listValue.value) arrayFiltrado.push(element)
            })
            print(arrayFiltrado)
        }
    })
}
export default filtrar