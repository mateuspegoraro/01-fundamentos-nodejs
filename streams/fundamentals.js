import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable { // Só consegue ler dados
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 500)
    }
}

class MultiplyByTenStream extends Writable { // Só consegue escrever dados
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

class InverseNumberStream extends Transform { // Consegue ler dados de algum lugar e escrever em outro lugar. É uma stream intermediária
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformed))) // (Error, conversao)
    }
}

new OneToHundredStream() 
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())