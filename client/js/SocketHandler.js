define([], function() {

    var socketHandler = function SocketHandler(_game, SERVER) {

        var socket = io.connect(SERVER);
        var game = _game;

        socket.on('connect', function() {

            // MESSAGE
            ////////////
            socket.on('message', function(data) {
                console.log("Message: " + data.msg);
            });

            // INIT_REQUEST
            /////////////////
            socket.on('init_request', function(data) {
                console.log("got remotePlayers data!");
                for (var id in data.updatablePlayerInfos) {
                    game.addRemotePlayer(id, data.updatablePlayerInfos[id], data.playerNames[id]);
                }
                game.onConnected(sendUpdateToServer);
                socket.emit('init_response', {playerName: game.getLocalPlayerName(), updatablePlayerInfo: game.getLocalPlayerUpdatableInfos()});
            });

            // NEW_PLAYER_CONNECTED
            /////////////////////////
            socket.on('new_player_connected', function(data) {
                game.addRemotePlayer(data.playerId, data.updatablePlayerInfo, data.playerName);
            });

            // UPDATE_TO_CLIENT
            /////////////////////
            socket.on('update_to_client', function(data) {
//            var remoteControllers = game.getRemoteCharacterControllers();
//            remoteControllers[data.playerId].getPlayer().update(data.updateInfo);
                game.updateRemotePlayer(data.playerId, data.updateInfo);
            });

            // PLAYER_DISCONNECTED
            ////////////////////////
            socket.on('player_disconnected', function(data) {
                game.removeRemotePlayer(data.id);
            });

        });

        function sendUpdateToServer(updateInfo) {
            socket.emit("update_to_server", {updateInfo: updateInfo});
        }
    };
    return socketHandler;
});