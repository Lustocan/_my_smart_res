import express from 'express';
import https from 'https';
import { readFileSync } from 'fs' ;
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/ret_rout';
import { Server } from "socket.io"
import { createClient } from 'redis';




/*  Express provides methods to specify what function is called for a particular 
    HTTP verb ( GET , POST , SET , etc.) and URL pattern ("Route"), 
    and methods to specify what template ("view") engine is used, where template files are located, 
    and what template to use to render a response. */

const app = express()                      ;

/* Cross-origin resource sharing (CORS) is a browser mechanism which enables
   controlled access to resources located outside of a given domain.        */

app.use(cors({
    credentials: true,
    origin :["https://localhost:4200"]
}));

// The middleware will attempt to compress response bodies for all request that traverse through the middleware

app.use(compression());

/* Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
   Optionally you may enable signed cookie support by passing a secret string,
   which assigns req.secret so it may be used by other middleware. */
   
app.use(cookieParser());


/* Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
   As req.body’s shape is based on user-controlled input, all properties and values in this object are 
   untrusted and should be validated before trusting */

app.use(bodyParser.json());

/* A Node.js Promise is a placeholder for a value that will be available in the future, 
   allowing us to handle the result of an asynchronous task once it has completed or encountered an error. */

// Create a sever that use the https protocol and put it listening on port 443

const httpsServer = https.createServer({key : readFileSync('key.pem'), cert : readFileSync('certificate.pem')}, app);

const io = new Server(httpsServer);


io.on('connection', socket => {

   socket.on('kitchen', (arg) => {
      socket.broadcast.emit('kitchen', arg)
   })
   socket.on('bar', (arg) => {
      socket.broadcast.emit('bar', arg)
   })
   socket.on('tables', (arg) => {
      socket.broadcast.emit('tables', arg);
   })
   socket.on('cash', (arg) => {
      socket.broadcast.emit('cash', arg);
   })
   socket.on('delete', (arg) => {
      socket.broadcast.emit('delete', arg);
   })

})

if(httpsServer.listen(443)){
   console.log("Server running on https://localhost:443/");
}

export const redisClient = createClient({socket:{
   port: 6379,
   host: 'redis'
}})         ;

(async () => {
   await redisClient.connect();
})();

// Our mongodb url 
const MONGO_URL = "an empty url"

// We establish a connection with the db
mongoose.connect(MONGO_URL);

// It give us an error messagge if the connection will fail up
mongoose.connection.on('error', (error: Error) => console.log(error));

// Each path start from the '/' , router object contains the others paths
app.use('/', router());

