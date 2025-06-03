import http from 'http';
import app from './index.js';
import connectDb from './config/db.config.js';
import 'dotenv/config.js'

// create server
const server = http.createServer(app);

// port
const port = process.env.PORT;

// listen
server.listen(port,()=>{
    try{
        connectDb();
        console.log(`connected successfully ${port}`)
    }catch(err){
        console.log(err);
    }
})