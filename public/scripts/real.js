
const socket = io();
socket.on('notes', (data) => {
    console.log(data);
    let template = ``;
    template = data
    .map(each => `
    <div class="card m-2" style="width: 18rem">
        <img style= "height: 10rem" src="${each.photo}" class="card-img-top object-fit-cover" alt="${each.id}">
        <div class="card-body">
            <p class="card-text">${each.text}</p>
        </div>
    </div>
    `)
    .reverse()
    .join('');
    document.querySelector('#notes').innerHTML = template;
    });
    document.querySelector('#sendNote').addEventListener('click', (event) => {
        const text = document.querySelector('#text').value;
        const date = document.querySelector('#date').value;
        const photo = document.querySelector('#photo').value;
        socket.emit('chargeNote', { text, date, photo });
    });