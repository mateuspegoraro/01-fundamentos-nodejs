import http from 'node:http' // utilizando o prefixo "node:" como boa prática
import { json } from './middlewares/json.js'

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

    await json(req, res)

    if(method === 'GET' && url === '/users'){
        return res
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
            .end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)

// CommonJS => require
// ESModules => import/export