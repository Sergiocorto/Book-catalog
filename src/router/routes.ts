import * as http from 'http'
import {AuthorController} from "../controllers/AuthorController"

module.exports = {
    '/authors': {
        'GET': (req: http.IncomingMessage, res: http.ServerResponse) => {
            const authorController = new AuthorController
            authorController.getAll(req, res)
        } 
        
    }  
}