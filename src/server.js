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

const server = http.createServer((req, res) => {
    const {method, url} = req

    if(method === 'GET' && url === '/users'){
        return res.end('Listagem de usuários')
    }

    if(method === 'POST' && url === '/users'){
        return res.end('Criação de usuário')
    }

    return res.end("hello ignite")
})

server.listen(3333)

// CommonJS => require
// ESModules => import/export