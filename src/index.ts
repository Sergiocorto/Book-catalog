import * as http from 'http'
import * as mongoose from 'mongoose'
import {Router} from './router/Router'
import * as dotenv from 'dotenv'

dotenv.config()

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse)=>{

    (new Router).router(req, res)
})

async function start() {
    
    try{
        await mongoose.connect(process.env.MONGO_URI)
        server.listen(process.env.PORT, ()=>{
            console.log('Server running on http://localhost:5000/');
        })
        
    }catch(e){
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()

