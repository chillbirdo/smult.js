var io = require('socket.io').listen(3000);

var updatablePlayerInfos = {};
var playerNames = {};

io.set('log level', 1);
io.set('close timeout', 6);
io.set('heartbeat timeout', 6);
io.set('heartbeat interval', 4);
io.set('polling duration', 3);

io.sockets.on('connection', function(client) {

    console.log(">>>>> Client connected: " + client.id);

    client.emit('init_request', {playerNames: playerNames, updatablePlayerInfos: updatablePlayerInfos});
    console.log(">>>>> emitted players to client " + client.id);

    client.broadcast.emit('log_message', {msg: 'new client connected: ' + client.id});
    console.log(">>>>> emitted message to all clients except sender");

    // INIT_RESPONSE
    //////////////////
    client.on('init_response', function(data) {
        console.log("HEHAHAHAHAHAHAH");
        if (!updatablePlayerInfos[client.id]) {
            updatablePlayerInfos[client.id] = data.updatablePlayerInfo;
            playerNames[client.id] = data.playerName;
        } else {
            console.log("UNEXPECTED: wanted to add player that already existed!");
            return;
        }
        printUpdatablePlayerInfos(updatablePlayerInfos);
        client.broadcast.emit('new_player_connected', {playerId: client.id, updatablePlayerInfo: data.updatablePlayerInfo, playerName: data.playerName});
    });

    // UPDATE_TO_SERVER
    /////////////////////
    client.on('update_to_server', function(data) {
        data.updateInfo.id = client.id;
        updatablePlayerInfos[client.id] = data.updateInfo;
        client.broadcast.emit('update_to_client', {playerId: client.id, updateInfo: updatablePlayerInfos[client.id]});
//        printUpdatablePlayerInfos(updatablePlayerInfos);
    });

    // CHAT_MESSAGE
    /////////////////////
    client.on('chat_message', function(data) {
        client.broadcast.emit('chat_message', {playerId: client.id, chatMessage: data.chatMessage});
    });


    // DISCONNECT
    ///////////////
    client.on('disconnect', function() {
        console.log(">>>>> diconnected: " + client.id);

        delete updatablePlayerInfos[client.id];
        delete playerNames[client.id];
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
        var name = playerNames[id];
        console.log("name=" + name + "; id=" + id + "; posX=" + updatablePlayerInfo.posX + "; posY=" + updatablePlayerInfo.posY + "; direction=" + updatablePlayerInfo.direction + "; action=" + updatablePlayerInfo.activity + ";");
    }
}