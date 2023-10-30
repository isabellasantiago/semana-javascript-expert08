//outro "programa" que executa no navegador para não trava-lo enquanto executa o upload
//funções executadas em segundo plano
import VideoProcessor from "./videoProcessor.js"
import Mp4Demuxer from "./mp4Demuxer.js"

//qvga - 144p
const qvgaConstraints = {
    width: 320,
    height: 240
}

const vgaConstraints = {
    width: 640,
    height: 480
}

const hdConstraints = {
    width: 1280,
    height: 720
}

//configuração do VIDEOENCODER
const encoderConfig = {
    ...qvgaConstraints,
    biterate: 10e6, // velocidade de leitura do arquivo (1MB por segundo)
    //WebM
    codec: 'vp09.00.10.08',
    pt: 4, //tipo do perfil que o encodar vai usar no codec,
    hardwareAcceleration: 'prefer-software',
    
    //MP4
    // codec: 'avc1.42002A',
    // pt: 1,
    // hardwareAcceleration: 'prefer-hardware',
    // avc: { format: 'annexb'}

}

const mp4Demuxer = new Mp4Demuxer()
const videoProcessor = new VideoProcessor({
    mp4Demuxer
}) //passo a passo para processar o vídeo

onmessage = async ({ data }) => {
    await videoProcessor.start({
        file: data.file,
        encoderConfig,
        sendMessage(message) {
            self.postMessage(message)
        }

    })
    //basicamente o window.[... do navegador
    self.postMessage({
        status: 'done'
    })
}