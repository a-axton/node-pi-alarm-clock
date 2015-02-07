var socketio = require('socket.io');
var io;
module.exports = {
    listen: function(app){
        var socket = socketio.listen(app);
        this.io = socket;
        return socket;
    },
    io: io
}