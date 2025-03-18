import http from 'node:http' 

/*    metodos http

GET = Buscar uma info no backend
POST = Criar uma info no backend
PUT = Atualisar uma ou mais info no backend                ex: mudar foto de perfil e bio
PATCH = Atualizar uma info mais especificas no backend     ex: permitir notificações
DELETE = Deletar uma info no backend*/

/* GET /users => Buscar usuários do backend
   POST /users => Criar usuário no backend */

const users = []

const server = http.createServer((request, response) => {
    const { method, url} = request

    if (method === 'GET' && url === '/users')  {
        return response
        .setHeader('Content-type', 'application/jason')
        .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users')  {
        users.push({
            id: 1,
            name: 'julia mm',
            email: 'julia@massa.com'
        })
        return response.hasHeader(201).end()
    }

    return response.writeHeader(404).end()
})

server.listen(3333)
