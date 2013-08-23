function SocketHandler(address, gameArg) {

//    var socket = io.connect('http://localhost:3000');
    var socket = io.connect('http://smultjs.eu01.aws.af.cm/');
    var game = gameArg;

    socket.on('connect', function() {

        socket.on('message', function(data) {
            console.log("Message: " + data.msg);
        });

        socket.on('init_request', function(data) {
            console.log("set pushdata func");
            game.setSendUpdateFunc(sendUpdateToServer);
            console.log("got remotePlayers data! these players are on the server: ");
            data.remotePlayers.forEach(function(player) {
                console.log(player.id);
                game.addRemotePlayer(player);
            });
            socket.emit('init_response', {newPlayerInfo: game.getLocalPlayer().getUpdatablePlayerInfo()});
        });

        socket.on('new_player_connected', function(data) {
            var newPlayerId = data.newPlayerInfo.id;
            for (var remotePlayer in game.getRemotePlayers()) {
                if (remotePlayer.getUpdatablePlayerInfo().id == newPlayerId) {
                    return;
                }
            }
            game.addRemotePlayer(data.newPlayerInfo);
        });

        socket.on('update_to_client', function(data) {
            var remotePlayers = game.getRemotePlayers();
            for (i = 0; i < remotePlayers.length; i++) {
                if (remotePlayers[i].getId() == data.playerInfo.id) {
                    remotePlayers[i].update(data.playerInfo);
                }
            }
        });

        socket.on('player_disconnected', function(data) {
            game.removeRemotePlayer(data.id);
        });

    });

    function sendUpdateToServer(playerInfo) {
        socket.emit("update_from_client", {playerInfo: playerInfo});
    }

    $('#sendmessage').click(function() {
        socket.emit('message', 'hallo!');
    });

    function printPlayerDataArray(playerDataArray) {
        var i = 0;
        console.log("players: ");

        playerDataArray.forEach(function(player) {
            console.log(i + " : id=" + player.id + "; posX=" + player.posX + "; posY=" + player.posY + "; direction=" + player.direction + "; action=" + player.action + ";");
            i++;
        });
    }
}