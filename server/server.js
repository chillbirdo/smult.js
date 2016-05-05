var express = require('express');
var app = express();

var http = require('http').Server(app);

app.use(express.static('client'));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

var io = require('socket.io')(http);

var updatablePlayerInfos = {};
var playerNames = {};

io.sockets.on('connection', function(client) {

    console.log(">>>>> Client connected: " + cleanId(client.id));

    client.emit('init_request', {playerNames: playerNames, updatablePlayerInfos: updatablePlayerInfos});
    console.log(">>>>> emitted players to client " + cleanId(client.id));

    client.broadcast.emit('log_message', {msg: 'new client connected: ' + cleanId(client.id)});
    console.log(">>>>> emitted message to all clients except sender");

    // INIT_RESPONSE
    //////////////////
    client.on('init_response', function(data) {
        if (!updatablePlayerInfos[cleanId(client.id)]) {
            updatablePlayerInfos[cleanId(client.id)] = data.updatablePlayerInfo;
            playerNames[cleanId(client.id)] = data.playerName;
        } else {
            console.log("UNEXPECTED: wanted to add player that already existed!");
            return;
        }
        printUpdatablePlayerInfos(updatablePlayerInfos);
        client.broadcast.emit('new_player_connected', {playerId: cleanId(client.id), updatablePlayerInfo: data.updatablePlayerInfo, playerName: data.playerName});
    });

    // UPDATE_TO_SERVER
    /////////////////////
    client.on('update_to_server', function(data) {
        data.updateInfo.id = cleanId(client.id);
        updatablePlayerInfos[cleanId(client.id)] = data.updateInfo;
        client.broadcast.emit('update_to_client', {playerId: cleanId(client.id), updateInfo: updatablePlayerInfos[cleanId(client.id)]});
//        printUpdatablePlayerInfos(updatablePlayerInfos);
    });

    // CHAT_MESSAGE
    /////////////////////
    client.on('chat_message', function(data) {
        client.broadcast.emit('chat_message', {playerId: cleanId(client.id), chatMessage: data.chatMessage});
    });


    // DISCONNECT
    ///////////////
    client.on('disconnect', function() {
        console.log(">>>>> diconnected: " + cleanId(client.id));

        delete updatablePlayerInfos[cleanId(client.id)];
        delete playerNames[cleanId(client.id)];
        printUpdatablePlayerInfos(updatablePlayerInfos);

        io.sockets.emit('player_disconnected', {id: cleanId(client.id)});
        console.log(">>>>> emitted player_disconnect to all clients");
    });
});

function cleanId(id){
        return id.substring(2);
}

function printUpdatablePlayerInfos(updatablePlayerInfos) {
    var i = 0;
    console.log("players: ");
    for (var id in updatablePlayerInfos) {
        var updatablePlayerInfo = updatablePlayerInfos[id];
        var name = playerNames[id];
        console.log("name=" + name + "; id=" + id + "; posX=" + updatablePlayerInfo.posX + "; posY=" + updatablePlayerInfo.posY + "; direction=" + updatablePlayerInfo.direction + "; action=" + updatablePlayerInfo.activity + ";");
    }
}


http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});

