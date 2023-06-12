const http = require('http');
const { once } = require('events');

const DEFAULT_USER = {
  username: 'Gabriel',
  password: '123'
}

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page');
    return response.end();
  },
  // curl -X POST --data '{"username": "Gabriel","password": "123"}' localhost:3000/login
  '/login:post': async (request, response) => {
    const user = await once(request, 'data');
    const parsedUser = JSON.parse(user);
    const toLower = (text) => text.toLowerCase();
    
    if(
      toLower(parsedUser.username) !== toLower(DEFAULT_USER.username) || 
      parsedUser.password !== DEFAULT_USER.password
    ) {
      response.writeHead(401);
      response.end('Logging failed!');
      return;
    }


    return response.end("Logged in!");
  },
  default(request, response){
    response.writeHead(404);
    return response.end('Not found!');  
  }
}

function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default;

  return chosen(request, response);
}

const app = http.createServer(handler)
.listen(3000, () => console.log('Running at 3000'))

module.exports = app;