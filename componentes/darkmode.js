let darkMode = window.localStorage.getItem('darkMode')
const darkModeToggle = document.querySelector('#dark-mode-toggle')



const enableDarkMode = () => {
  //add the class dark to body
  document.body.classList.add('dark')
  //update darkMode in localstorage
  localStorage.setItem('darkMode','enabled')
}

const disableDarkMode = () => {
  //remove the class dark to body
  document.body.classList.remove('dark')
  //update darkMode in localstorage
  localStorage.setItem('darkMode',null)
}

 //turn on darkmode if it was previously enabled
  if (darkMode === 'enabled'){
    enableDarkMode()
  }



darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode')
  if (darkMode !== 'enabled'){
    enableDarkMode()
  } else {
    disableDarkMode()
  }
})

export default darkModeToggle