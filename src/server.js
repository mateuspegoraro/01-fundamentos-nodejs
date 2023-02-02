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

import http from 'node:http' // utilizando o prefixo "node:" como boa prática
import { Database } from './database.js'
import { json } from './middlewares/json.js'

const database = new Database()

const server = http.createServer(async (req, res) => {
    const {method, url} = req

    await json(req, res)

    if(method === 'GET' && url === '/users'){
        const users = database.select('users')
        return res
            .end(JSON.stringify(users))
    }

    if(method === 'POST' && url === '/users'){
        const {name, email} = req.body
        const user = {
            id: 1,
            name: name,
            email: email
        }
        database.insert('users', user)

        return res
            .writeHead(201)
            .end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)

// CommonJS => require
// ESModules => import/export