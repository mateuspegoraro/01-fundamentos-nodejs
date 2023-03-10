import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform { // Consegue ler dados de algum lugar e escrever em outro lugar. É uma stream intermediária
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        console.log(transformed)
        callback(null, Buffer.from(String(transformed))) // (Error, conversao)
    }
}

const server = http.createServer(async (req, res) => {
    const buffers = []
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)

    // return req
    //     .pipe(new InverseNumberStream())
    //     .pipe(res)
})

// req -> ReadableStream
// res -> WritableStream

server.listen(3334)