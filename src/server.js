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

const server = http.createServer((req, res) => {
    const {method, url} = req


    console.log(req.headers)
    
    if(method === 'GET' && url === '/users'){
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if(method === 'POST' && url === '/users'){
        users.push({
            id: 1,
            name: 'john doe',
            email: 'johndoe@example.com'
        })
        return res.end('Criação de usuário')
    }

    return res.end("hello ignite")
})

server.listen(3333)

// CommonJS => require
// ESModules => import/export