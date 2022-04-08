import 'reflect-metadata';
import express from 'express';
import SocketIO from 'socket.io';
import http from 'http';
import path from 'path';
import { engine } from 'express-handlebars';
import { createConnection } from 'typeorm';
import fileUpload from 'express-fileupload';
import { apiRouter } from './routes';
import { config } from './config';
import { cronRunner } from './cron';
import { socketController } from './contorller';

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, { cors: { origin: '*' } });

io.on('connection', (socket: any) => {
    console.log('----------------------');
    console.log(socket.handshake.query.userId);
    console.log(socket.handshake.query.accessToken);
    console.log('----------------------');

    socket.on('message:create', async (data: any) => {
        await socketController.messageCreate(io, socket, data);
    });

    socket.on('join_room', (data: any) => {
        socket.join(data.id);
        socket.broadcast.to(data.id)
            .emit('user_join_room', { message: `User ${socket.id} joined room` });
    });

    // --------------------------------------------------------------------------------------------------

    // ONE TO ONE
    // socket.emit(event, {});

    // SEND TO ALL ONLINE USERS (INCLUDE SENDER)
    // io.emit(event, {})

    // SEND TO ALL ONLINE USERS (AVOID SENDER)
    // socket.broadcast.emit(event, {})

    // socket.join(room_id)

    // TO ROOM AVOID SENDER
    // socket.broadcast.to(room_id).emit(event, {})

    // TO ROOM INCLUDE SENDER
    // io.to(room_id).emit(event, {})

    // --------------------------------------------------------------------------------------------------
});

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'emailTemplates'));

app.use(apiRouter);

const { PORT } = config;

server.listen(PORT, async () => {
    console.log(`Server has been started on ${PORT} port...`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected...');
            await cronRunner();
        }
    } catch (e) {
        if (e) {
            console.log(e);
        }
    }
});
