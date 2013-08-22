var io = require('socket.io').listen(3000);

//var remotePlayers = [];
//io.disable('heartbeats');
////io.set('log level', 1);
//io.sockets.on('connection', function(client) {
//    //init_request: send all players to new client
//    client.emit('init_request', {playerInfoArray: remotePlayers});
//    //init_response: player sent his information
//    client.on('init_response', function(initialPlayerInfo){
//        initialPlayerInfo.id = client.id;
//        remotePlayers.push(initialPlayerInfo);
//        io.sockets.emit('new_player_connected', initialPlayerInfo);
//    });
//
////
////    client.on('message', function(message){
////        var msg = { message: [client.id, message] };
////        playerInfo.push(msg);
////        if (playerInfo.length > 15) playerInfo.shift();
////        io.sockets.emit('message', msg);
////    });
////
////    client.on('disconnect', function(){
////        io.sockets.emit('announcement', client.id + ' disconnected');
////    });
//});

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
        remotePlayers.forEach(function(player) {
            console.log(player.id);
        });
        client.broadcast.emit('new_player_connected', {newPlayerInfo: data.newPlayerInfo});
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
        console.log("players: ");
        remotePlayers.forEach(function(player) {
            console.log(player.id);
        });


        io.sockets.emit('message', {msg: client.id + ' disconnected'});
        console.log(">>>>> emitted announcement to all clients");
    });
});

function printPlayerDataArray(playerDataArray) {
    var i = 0;
    playerDataArray.forEach(function(player) {
        console.log(i + " : id=" + player.id + "; posX=" + player.posX + "; posY=" + player.posY + "; direction=" + player.direction + "; action=" + player.action + ";");
        i++;
    });
}