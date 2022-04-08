class SocketController {
    public async messageCreate(io: any, socket: any, data: any) {
        console.log(data);

        // socket.emit('message:get-all', { messages: [{ text: data.message }] });
        // io.emit('message:get-all', { messages: [{ text: data.message }] });

        socket.broadcast.emit('message:get-all', { messages: [{ text: data.message }] });
    }
}

export const socketController = new SocketController();
