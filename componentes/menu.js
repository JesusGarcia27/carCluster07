const showMenuToggle = document.querySelector('.btn--menu')
const menu = document.querySelector('.nav__menu')
const closeMenu = document.querySelector('.btn--close')


const toggleMenu = () => {
  menu.classList.toggle('show--menu')
}


showMenuToggle.addEventListener('click', () => {
  toggleMenu()
})

closeMenu.addEventListener('click', () =>{
  toggleMenu()
})

export default toggleMenu