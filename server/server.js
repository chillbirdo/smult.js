var io = require('socket.io').listen(3000);

var updatablePlayerInfos = {};
io.set('log level', 1);
io.set('close timeout', 6);
io.set('heartbeat timeout', 6);
io.set('heartbeat interval', 4);
io.set('polling duration', 3);
io.sockets.on('connection', function(client) {

    console.log(">>>>> Client connected: " + client.id);

    client.emit('init_request', {updatablePlayerInfos: updatablePlayerInfos});
    console.log(">>>>> emitted remotePlayers to client " + client.id);

    client.broadcast.emit('message', {msg: 'new client connected: ' + client.id});
    console.log(">>>>> emitted message to all clients except sender");

    // INIT_RESPONSE
    //////////////////
    client.on('init_response', function(data) {
        if (!updatablePlayerInfos[client.id]) {
            updatablePlayerInfos[client.id] = data.updatablePlayerInfo;
        } else {
            console.log("UNEXPECTED: wanted to add player that already existed!");
            return;
        }
        printUpdatablePlayerInfos(updatablePlayerInfos);
        client.broadcast.emit('new_player_connected', {playerId: client.id, updatablePlayerInfo: data.updatablePlayerInfo});
    });

    // UPDATE_TO_SERVER
    /////////////////////
    client.on('update_to_server', function(data) {
        data.updateInfo.id = client.id;
        updatablePlayerInfos[client.id] = data.updateInfo;
        client.broadcast.emit('update_to_client', {playerId: client.id, updateInfo: updatablePlayerInfos[client.id]});
        printUpdatablePlayerInfos(updatablePlayerInfos);
    });

    // MESSAGE
    ////////////
    client.on('message', function(message) {
        console.log(">>>>> received message from client " + client.id);
        client.broadcast.emit('message', {msg: client.id + " " + message});
        console.log(">>>>> emitted message to all clients");
    });

    // DISCONNECT
    ///////////////
    client.on('disconnect', function() {
        console.log(">>>>> diconnected: " + client.id);

        delete updatablePlayerInfos[client.id];
        printUpdatablePlayerInfos(updatablePlayerInfos);

        io.sockets.emit('player_disconnected', {id: client.id});
        console.log(">>>>> emitted player_disconnect to all clients");
    });
});

function printUpdatablePlayerInfos(updatablePlayerInfos) {
    var i = 0;
    console.log("players: ");
    for (var id in updatablePlayerInfos) {
        var updatablePlayerInfo = updatablePlayerInfos[id];
        console.log("id=" + id + "; posX=" + updatablePlayerInfo.posX + "; posY=" + updatablePlayerInfo.posY + "; direction=" + updatablePlayerInfo.direction + "; action=" + updatablePlayerInfo.activity + ";");
    }
}