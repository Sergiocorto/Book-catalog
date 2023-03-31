import * as http from 'http'
import * as url from 'url'
import * as routes from './routes'

export class Router {

    router = (req: http.IncomingMessage, res: http.ServerResponse) =>{

        if (routes[req.url]) {
            const handler = routes[req.url][req.method];
            if (handler) {
              handler(req, res);
            } else {
              res.writeHead(405);
              res.end('Method not allowed');
            }
          } else {
            res.writeHead(404);
            res.end('Not found');
          }
    }
}