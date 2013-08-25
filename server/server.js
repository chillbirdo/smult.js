var io = require('socket.io').listen(3000);

var remotePlayers = [];
io.set('log level', 1);
io.set('close timeout', 6);
io.set('heartbeat timeout', 6);
io.set('heartbeat interval', 4);
io.set('polling duration', 3);
io.sockets.on('connection', function(client) {

    console.log(">>>>> Client connected: " + client.id);

    client.emit('init_request', {remotePlayers: remotePlayers});
    console.log(">>>>> emitted remotePlayers to client " + client.id);

    client.broadcast.emit('message', {msg: 'new client connected: ' + client.id});
    console.log(">>>>> emitted message to all clients except sender");

    client.on('init_response', function(data) {
        for (i = 0; i < remotePlayers.length; i++) {
            if (remotePlayers[i].id == client.id) {
                console.log("UNEXPECTED: wanted to add player that already existed!");
                return;
            }
        }
        data.newPlayerInfo.id = client.id;
        remotePlayers.push(data.newPlayerInfo);

        console.log("players: ");
        printPlayerDataArray(remotePlayers);
        client.broadcast.emit('new_player_connected', {newPlayerInfo: data.newPlayerInfo});
    });

    client.on('update_to_server', function(data) {
        data.playerInfo.id = client.id;
        client.broadcast.emit('update_to_client', {playerInfo: data.playerInfo});
        for (i = 0; i < remotePlayers.length; i++) {
            if (remotePlayers[i].id == client.id) {
                remotePlayers[i] = data.playerInfo;
                break;
            }
        }
    });

    client.on('message', function(message) {
        console.log(">>>>> received message from client " + client.id);
        client.broadcast.emit('message', {msg: client.id + " " + message});
        console.log(">>>>> emitted message to all clients");
    });

    client.on('disconnect', function() {
        console.log(">>>>> diconnected: " + client.id);
        for (i = 0; i < remotePlayers.length; i++) {
            if (remotePlayers[i].id == client.id) {
                remotePlayers.splice(i, 1);
                console.log("removed id " + client.id);
            }
        }
        printPlayerDataArray(remotePlayers);

        io.sockets.emit('player_disconnected', {id: client.id});
        console.log(">>>>> emitted player_disconnect to all clients");
    });
});

function printPlayerDataArray(playerDataArray) {
    var i = 0;
    console.log("players: ");

    playerDataArray.forEach(function(player) {
        console.log(i + " : id=" + player.id + "; posX=" + player.posX + "; posY=" + player.posY + "; direction=" + player.direction + "; action=" + player.activity + ";");
        i++;
    });
}