import http from 'node:http' // utilizando o prefixo "node:" como boa prática

//  Principais recursos de uma chamada HTTP
//   - HTTP
//     - Método HTTP
//     - URL

// GET => Buscar um recurso
// POST => Criar um recurso
// PUT => Editar um recurso
// PATCH => Atualizar uma informação específica de um recurso
// DELETE => Deletar um recurso

// Cabeçalhos da Request e da Response são Metadados (informações adicionais de como o dado pode ser interpretado pelo cliente)

const users = []

const server = http.createServer(async (req, res) => {
    const {method, url} = req

    const buffers = []
    for await (const chunk of req) {
        buffers.push(chunk)
    }
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }

    if(method === 'GET' && url === '/users'){
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if(method === 'POST' && url === '/users'){
        const {name, email} = req.body
        users.push({
            id: 1,
            name: name,
            email: email
        })
        return res
            .writeHead(201)
            .end('Criação de usuário')
    }

    return res.writeHead(404).end()
})

server.listen(3333)

// CommonJS => require
// ESModules => import/export