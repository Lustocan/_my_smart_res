import express from 'express';
import https from 'https';
import {readFileSync} from 'fs' ;
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose, { connection } from 'mongoose';
import router from './router/ret_rout';
import {Server} from "socket.io"



/*  Express provides methods to specify what function is called for a particular 
    HTTP verb ( GET , POST , SET , etc.) and URL pattern ("Route"), 
    and methods to specify what template ("view") engine is used, where template files are located, 
    and what template to use to render a response. */
const app = express()                 ;

/* Cross-origin resource sharing (CORS) is a browser mechanism which enables
   controlled access to resources located outside of a given domain.        
   for example if we are doing a request from IP : 192.0.0.1 to IP : 182.2.3.4 
   without de CORS we aren't able to do this request */
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


/* The fs.readFile() method is an inbuilt method which is used to read the file.
   This method read the entire file into buffer. 
   The util.promisify() method defines in utilities module of Node.js standard library. 
   It is basically used to convert a method that returns responses using a callback function
   to return responses in a promise object */
//const readFile = util.promisify(fs.readFile);

/* A Node.js Promise is a placeholder for a value that will be available in the future, 
   allowing us to handle the result of an asynchronous task once it has completed or encountered an error. */

// Create a sever that use the https protocol and put it listening on port 443


const httpsServer = https.createServer({key : readFileSync('key.pem'), cert : readFileSync('certificate.pem')}, app);


const io = new Server(httpsServer);

let users = [{id : String(), username : String() }] ;



io.on('connection', socket => {

   socket.on('kitchen', (arg) => {
      console.log("kitchen")
       let bool = true ;
       for(let i=0; i<users.length; i++){
           if(users[i].username===arg) bool = false ;
       }
       if(bool) users.push({id : socket.id, username : arg})
       socket.broadcast.emit('kitchen', users)
   })

   socket.on('bar', (arg) => {
      console.log("bar")
      let bool = true ;
      for(let i=0; i<users.length; i++){
          if(users[i].username===arg) bool = false ;
      }
      if(bool) users.push({id : socket.id, username : arg})
      socket.broadcast.emit('bar', users)
   })

   socket.on('tables', (arg) => {
      console.log("tables")

      console.log(arg)
      console.log(users)
      for(let i =0 ; i<users.length; i++){
         if(users[i].username===arg){
            console.log(users[i].id)
            
            socket.broadcast.to(users[i].id).emit('tables');
         }
      }
   })
})




if(httpsServer.listen(443)){
   console.log("Server running on https://localhost:443/");
}

// Our mongodb url 
const MONGO_URL = "mongodb+srv://lustocan:lustocan@cluster0.moozrf8.mongodb.net/?retryWrites=true&w=majority"

// We establish a connection with the db
mongoose.connect(MONGO_URL);

// It give us an error messagge if the connection will fail up
mongoose.connection.on('error', (error: Error) => console.log(error));

// Each path start from the '/' , router object contains the others paths
app.use('/', router());