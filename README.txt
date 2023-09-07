Useful commands for starting the application with "docker compose" from the terminal:

docker-compose up --build        // creates images and containers on docker and automatically starts containers

If you want to create and start the containers separately, use the commands:

docker-compose build --no-cache  // create images inside docker. "--no-cache" is an option to disable caching

docker-compose up                // creates the containers, if they don't already exist, and starts them

docker-compose stop              // stops containers. you can also use ' ctrl+C '

docker compose down              // delete containers 


After startup two links will be generated :

https://localhost:4200/             // application site

https://localhost:443/              // site where the server is listening
Since the connection is https type, before starting the application you need to provide the certificates present inside
of the program (certificate.pem and key.pem in the 'backend' folder, cert.pem and key.pem in the 'frontend' folder), as "trust"
in the browser you use to connect to the application site.
If you want to generate your own certificates, the command used to create the current ones is the following:


openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem  

However, you are asked to use the same names as the existing files.

If you want to start the program without using docker compose you need to:

1. delete the option 
        {socket:{
            port: 6379,
            host: 'redis'
        }}

    in the file _my_smart_res/backend/base.ts on line 82     =>   export const redisClient = createClient();

2. download both backend and frontend libraries with the command :  npm install
3. launch redis with the command : redis-server 
    (redis-server funziona solo sul terminale linux o macOS)
4. start the backend with the command : npm start
5. start the frontend with the command : ng serve


Note: the application works even if you do not load the certificates, however the browser will consider the page "untrusted".
If you still want to access the site and use the application, you need to access the page https://localhost:4200/,
click on "Continue with localhost (unsafe)", access the page https://localhost:443/ and click on "Continue with localhost (unsafe)" there too (otherwise
the web page is displayed but the services provided by the server will be blocked by the browser).