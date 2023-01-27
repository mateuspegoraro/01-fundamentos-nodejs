import http from 'node:http' // utilizando o prefixo "node:" como boa prática

const server = http.createServer((req, res) => {
    return res.end("hello word")
})

server.listen(3333)

// CommonJS => require
// ESModules => import/export