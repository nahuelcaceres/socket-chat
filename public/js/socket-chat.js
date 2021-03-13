var socket = io();

const params1 = new URLSearchParams( window.location.search);

if (!params1.has('nombre') || !params1.has('sala')){
    window.location = 'index.html';

    throw new Error('El nombre y sala son necesarios');
}

const usuario = {
    nombre: params1.get('nombre'),
    sala: params1.get('sala'),
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp){
        // console.log('Usuarios conectados', resp);
        renderizarUsuarios(resp);
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('creaMensaje', {
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    // console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();

});

// Escuchar cuando usuario entra o sale del chat
socket.on('listaPersonas', (personas) => {
    console.log('Personas conectadas', personas);
    renderizarUsuarios(personas);
})


// Mensajes privados
socket.on('mensajePrivado', (mensaje) => {
    console.log('Mensaje privado:', mensaje);
})