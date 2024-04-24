const socket = io()

let nickname = '';
let allMessages = [];

Swal.fire({
    title: 'Write your nickname',
    input: 'text',
    allowOutsideClick: false,
    inputValidator: value => !value && 'Insert your nickname'
}).then((data) => {
    nickname = data.value;
    document.querySelector('#nickname').innerHTML = nickname;
    socket.emit('nickname', nickname)
});
// swal devuelve siempre una promesa, con la que devuelve la data. esa data la tenemos que guardar. para hacerla simple la manejamos con then/catch.

socket.on('messages', messages => {
    allMessages = messages;
    document.querySelector('#allMessages').innerHTML = messages.map(each => each).join('')
}); 

document.querySelector('#message').addEventListener("keyup", event => {
    if (event.key == "Enter") {
        const message = `<p class="py-1 px-3"><span class="fw-bolder"> ${nickname}: </span> ${event.target.value}</p>`;
        allMessages.push(message);
        socket.emit('all messages', allMessages);
        event.target.value = '';
    };
}); 

// necesito emitirlo al servidor, que vuelva y volver a mapear 


