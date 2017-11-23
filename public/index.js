'use strict'

const content = document.getElementById('content')


const clearAll = document.getElementById('clear-content')
clearAll.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    content.value = ''
})

const superForm = document.getElementById('main-form')
superForm.addEventListener('submit', (e) => {
    e.preventDefault()
    e.stopPropagation()
    let text = content.value
    console.log('text -> ', text)

})
