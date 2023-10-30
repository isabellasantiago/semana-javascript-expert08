import { createFile } from '../deps/mp4box.0.5.2'

export default class Mp4Demuxer {
    #onConfig
    #onChunk
    #file

    /**
     * 
     * @param {ReadableStream} stream 
     * @param {object} options
     * @param {(config: object) => void} options.onConfig
     * 
     * @returns {Promise<void>}
     */

    async run(stream, {onConfig, onChunk }) {
        this.#onChunk = onChunk
        this.#onConfig = onConfig

        this.#file = createFile
        this.#file.onReady = ( args) => {
            debugger
        }

        this.#file.onError = (error) => console.log('deu ruim mp4demuxer', error)
    }
}