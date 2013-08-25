function SocketHandler(address, gameArg) {

    var socket = io.connect('http://localhost:3000');
//    var socket = io.connect('http://smultjs.eu01.aws.af.cm/');
    var game = gameArg;

    socket.on('connect', function() {

        // MESSAGE
        ////////////
        socket.on('message', function(data) {
            console.log("Message: " + data.msg);
        });

        // INIT_REQUEST
        /////////////////
        socket.on('init_request', function(data) {
            console.log("set pushdata func");
            game.setSendUpdateFunc(sendUpdateToServer);

            console.log("got remotePlayers data! these players are on the server: ");
            for (var id in data.updatablePlayerInfos) {
                if (!game.getRemoteCharacterControllers()[id]) {
                    game.addRemotePlayer(id, data.updatablePlayerInfos[id]);
                } else {
                    console.log("UNEXPECTED: wanted to add player that already existed!");
                    return;
                }
            }
            /*ugly*/
            socket.emit('init_response', {updatablePlayerInfo: game.getLocalCharacterController().getPlayer().getUpdatablePlayerInfo()});
        });

        // NEW_PLAYER_CONNECTED
        /////////////////////////
        socket.on('new_player_connected', function(data) {
            game.addRemotePlayer(data.playerId, data.updatablePlayerInfo);
        });

        // UPDATE_TO_CLIENT
        /////////////////////
        socket.on('update_to_client', function(data) {
            var remoteControllers = game.getRemoteCharacterControllers();
            remoteControllers[data.playerId].getPlayer().update(data.updateInfo);

            printRemotePlayers(game.getRemoteCharacterControllers());
//            console.log("UPDATE: id: " + data.playerId + "; posX: " + data.updateInfo.posX + "; posY: " + data.updateInfo.posY);

        });

        // PLAYER_DISCONNECTED
        ////////////////////////
        socket.on('player_disconnected', function(data) {
            game.removeRemotePlayer(data.id);
        });

    });

    function printRemotePlayers(remoteCharacterControllers) {
        var i = 0;
        console.log("players: ");
        for (var id in remoteCharacterControllers) {
            var player = remoteCharacterControllers[id].getPlayer();
            console.log("id=" + id + "; posX=" + player.getPosX() + "; posY=" + player.getPosY() + "; direction=" + player.getDirection() + "; action=" + player.getActivity() + ";");
        }
    }


    function sendUpdateToServer(updateInfo) {
        socket.emit("update_to_server", {updateInfo: updateInfo});
    }

    $('#sendmessage').click(function() {
        socket.emit('message', 'hallo!');
    });
}