var io = require('socket.io').listen(3000);

var remotePlayers = [];
io.set('log level', 1);
io.sockets.on('connection', function(client) {

    console.log(">>>>> Client connected: " + client.id);

    client.emit('init_request', {remotePlayers: remotePlayers});
    console.log(">>>>> emitted remotePlayers to client " + client.id);

    client.broadcast.emit('message', {msg: 'new client connected: ' + client.id});
    console.log(">>>>> emitted message to all clients except sender");

    client.on('init_response', function(data) {
        data.newPlayerInfo.id = client.id;
        remotePlayers.push(data.newPlayerInfo);

        console.log("players: ");
        printPlayerDataArray(remotePlayers);
        client.broadcast.emit('new_player_connected', {newPlayerInfo: data.newPlayerInfo});
    });

    client.on('update_from_client', function(data) {
        data.playerInfo.id = client.id;
        client.broadcast.emit('update_to_client', {playerInfo: data.playerInfo});
        for (i = 0; i < remotePlayers.length; i++) {
            if (remotePlayers[i].id == client.id) {
                if (data.playerInfo.posX) {
                    remotePlayers[i].posX = data.playerInfo.posX;
                }
                if (data.playerInfo.posY) {
                    remotePlayers[i].posY = data.playerInfo.posY;
                }
                if (data.playerInfo.direction) {
                    remotePlayers[i].direction = data.playerInfo.direction;
                }
                if (data.playerInfo.activity) {
                    remotePlayers[i].activity = data.playerInfo.activity;
                }
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