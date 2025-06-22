import http from 'http';
import cluster from 'cluster';
import os from 'node:os'
import app from './index.js';
import connectDb from './config/db.config.js';
import 'dotenv/config.js'

const totalCpus = os.cpus().length;

if(cluster.isPrimary){
    console.log(`primary process ${process.pid} is running!`);
    for(let i = 0 ; i < totalCpus; i++){
        cluster.fork()
    }
    cluster.on('exit',(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} died!`)
    })
}else{
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
}
