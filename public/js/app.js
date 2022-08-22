console.log('archivo file creado!')

const weaterForm = document.querySelector('form')
const ciudadsearch = document.querySelector('input')
const mensaje1 = document.querySelector('#mensaje1')
const mensaje2 = document.querySelector('#mensaje2')

weaterForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    let valor = ciudadsearch.value
    console.log(valor)

    fetch('http://localhost:3001/weather?address='+valor).then( (response) => {
      response.json().then((data)=>{
        console.log(data)
        if(data.error){
            mensaje1.textContent = data.error
            mensaje2.textContent = data.errormsj
        }else{
            mensaje1.textContent = data.resp;//JSON.stringify(data)
            mensaje2.textContent = '';
        }
      })
})
})

fetch('http://puzzle.mead.io/puzzle').then( (response) => {
    response.json().then((data)=>{
        console.log(data)
        })
    })
