var io = require('socket.io').listen(3000);

var remotePlayers = [];
io.disable('heartbeats');
//io.set('log level', 1);
io.sockets.on('connection', function(client) {
    //init_request: send all players to new client
    client.emit('init_request', {playerInfoArray: remotePlayers});
    //init_response: player sent his information
    client.on('init_response', function(initialPlayerInfo){
        initialPlayerInfo.id = client.id;
        remotePlayers.push(initialPlayerInfo);
        io.sockets.emit('new_player_connected', initialPlayerInfo);
    });

//
//    client.on('message', function(message){
//        var msg = { message: [client.id, message] };
//        playerInfo.push(msg);
//        if (playerInfo.length > 15) playerInfo.shift();
//        io.sockets.emit('message', msg);
//    });
//
//    client.on('disconnect', function(){
//        io.sockets.emit('announcement', client.id + ' disconnected');
//    });
});