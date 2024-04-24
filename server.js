import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import { engine } from 'express-handlebars';

import indexRouter from './src/routers/index.router.js';
import socketCb from './src/routers/index.socket.js'
import errorHandler from './src/middlewares/errorHandler.js';
import notFoundHandler from './src/middlewares/notFoundHandler.js';
import __dirname from './utils.js';


//SERVER node - tcp
const server = express();
const port = 8080;
const ready = () => {
    console.log(`Server running on port ${port}`)
};
const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);
socketServer.on('connection', socketCb);
export { socketServer };
nodeServer.listen(port, ready);

// handlebars
server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')


//middlewares (a nivel servidor)
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname + '/public'))
// sin prefijo virtual. si quisiera poner un prefijo iría 'prefix', express.static.....
// sin prefijo habilita q al ingresar a la ruta no sea necesario escribir mas que '/'.
server.use(morgan('dev'))

// endpoints
server.use('/', indexRouter);
server.use(errorHandler);
server.use(notFoundHandler);
// el orden es requerido acá. Si ocurre un error dentro de los endpoints el next hace pasar al error handler; si no existe la ruta salta el notFoundHandler.