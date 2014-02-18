define([], function() {

    return function SocketHandler(_game, SERVER) {

        var socket = io.connect(SERVER);
        var game = _game;
        var showSpeechBubble; /*function of HtmlHandler to show the chat text of a player */

        socket.on('connect', function() {

            // LOG_MESSAGE
            ////////////
            socket.on('log_message', function(data) {
                console.log("log_message: " + data.msg);
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
                game.updateRemotePlayer(data.playerId, data.updateInfo);
            });

            // CHAT_MESSAGE
            ////////////////////
            socket.on('chat_message', function(data) {
                showSpeechBubble( data.playerId, data.chatMessage);
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

        //public
        this.sendChatMessageToServer = function(chatMessage) {
            console.log("sending chatmessage to server..");
            socket.emit("chat_message", {chatMessage: chatMessage});
        };

        this.registerShowSpeechBubbleFunc = function(showSpeechBubbleFunc) {
            showSpeechBubble = showSpeechBubbleFunc;
        };

    };//socketHandler

});//require