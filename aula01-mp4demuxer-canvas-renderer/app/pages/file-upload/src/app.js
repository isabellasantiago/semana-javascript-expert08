import Clock from './deps/clock.js';
import View from './view.js'

const view = new View()
const clock = new Clock()

const worker = new Worker('./src/worker/worker.js', {
    type: 'module'
})

worker.onmessage = ({ data }) => {
    if (data.status !== 'done') return;
    
    clock.stop()
    view.updateElapsedtime(`Process took ${took.replace('ago', '')}`)
}


let took = ''
view.configureOnFileChange(file => {

    //inicializando o projeto
    worker.postMessage({
        file
    })

    clock.start((time) => {
        took = time;
        view.updateElapsedtime(`Process started ${time}`)
    })

    setTimeout(() => {

    }, 5000)
})

//simulando o click no botao que ja adiciona o vídeo
async function fakeFetch() {
    const filePath = '/videos/frag_bunny.mp4'
    const response = await fetch(filePath)

    // traz o tamanho do arquivo em bytes
    // const response = await fetch(filePath, {
    //     method: "HEAD"
    // })
    //response.headers.het('content-length')
    //debugger


    const file = new File([await response.blob()] /*baixa o arquivo inteiro e joga na varialvel. Blob é o formato binário do objeto*/
        , filePath, {
        type: 'video/mp4',
        lastModified: Date.now()
    })


    //dispara o evento
    const event = new Event('change')

    //criando uma propriedade dentro de event para alterar o valor dele
    Reflect.defineProperty(
        event,
        'target',
        { value: { files: [file] } }
    )

    document.getElementById('fileUpload').dispatchEvent(event)
}

fakeFetch()