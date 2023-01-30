import { Readable } from 'node:stream'

class OneToHundredStream extends Readable { // Só consegue ler dados
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 5) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}
// fetch é nativo desde a versão 18 do node
fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half'
}).then(response => {
    response.text().then(data => {
        console.log(data)
    })
})