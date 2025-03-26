import http from 'node:http'
import { Transform } from 'node:stream'
import { buffer } from 'node:stream/consumers'

class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1
        
        console.log(transformed)
        callback(null, Buffer.from(String(transformed)))
    }
}

// req = stream de leitura
// res = stream de escrita

// só responde a requisição após ler todas as chunks
const server = http.createServer(async(req, res) => {
    const buffers = []

    for await (const chunk of req){
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent)

    return res.end(fullStreamContent)
})

server.listen(3334)