import * as http from 'http'
import Author from '../models/Author'

export class AuthorController {

    getAll = async function(req: http.IncomingMessage, res: http.ServerResponse){

        try{
            const authors = await Author.find().lean()
            const data = {authors: authors}
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
            
        }catch (e) {
            console.error(res, e)
        }
    }
    
    create = async function(req, res){
        try{
    
        }catch(error) {
            console.log(error)
        }
    }
   
    update = async function(req, res){
    
        try{
            
        }catch(error) {
            console.log(error)
        }
    }
    
    destroy = async function(req, res){
    
        try{
     
        }catch (e) {
            console.log(e)
        }
    
    }
    
    sorted = async function(req, res){
        if(req.params.sortValue === 'lastname'){
            try{
                
            }catch (e) {
                console.error(res, e)
            }
        }
        if(req.params.sortValue === 'name'){
            try{
                
            }catch (e) {
                console.error(res, e)
            }
        }
    }
    
    searchAuthors = async function(req, res){
        try{
            if (req.params.search){
   
            }
        }catch (e) {
            console.error(res, e)
        }
    }
}