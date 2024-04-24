import notesManager from "../data/fs/NotesManager.js"
import { socketServer } from "../../server.js";

let messages = [] 
// array de mensajes

export default async (socket) => {
    console.log(`client ${socket.id} connected`);
    // sockets de notes:
    socket.emit('notes', await notesManager.read());
    socket.on('chargeNote', async data => {
        await notesManager.create(data);
    socket.emit('notes', await notesManager.read());
    }); 
    //sockets de chat:
    socket.on('nickname', async (nick) => {
        messages.push( `<p class="py-1 px-3"><span class="fw-bolder">${nick}</span> is online</p>`);
        socketServer.emit('messages', messages);
    });
    // lógica funcional para cuando el usuario introduce su nombre

    socket.on('all messages', (allMessages) => {
        messages = allMessages;
        socketServer.emit('messages', messages);
    });
    // lógica funcional para mensajes
};
