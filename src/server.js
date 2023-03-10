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
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'



const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)
        const { query, ...params } = routeParams.groups
        req.params = params
        req.query = query ? extractQueryParams(query) : {}
        req.params = { ...routeParams.groups }
        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)

// CommonJS => require
// ESModules => import/export