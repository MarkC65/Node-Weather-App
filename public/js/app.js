var webForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

webForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const webLocation = search.value
  messageOne.textContent = 'Loading ...'
  messageTwo.textContent = ''
  fetch('/weather?address='+webLocation).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      messageOne.textContent = data.error
      messageTwo.textContent = ''
    }
    else {
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    }
  })
})
})