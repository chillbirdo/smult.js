function SocketHandler(address, gameArg) {

    var socket = io.connect('http://localhost:3000');
    var game = gameArg;

    socket.on('connect', function() {

        socket.on('message', function(data) {
            console.log("Message: " + data.msg);
        });

        socket.on('init_request', function(data) {
            console.log("got remotePlayers data! these players are on the server: ");
            data.remotePlayers.forEach(function(player) {
                console.log(player.id);
                game.addRemotePlayer(player);
            });
            socket.emit('init_response', {newPlayerInfo: game.getLocalPlayer().getUpdatablePlayerInfo()});
        });
    });

    socket.on('new_player_connected', function(data) {
        var newPlayerId = data.newPlayerInfo.id;
        for (var remotePlayer in game.getRemotePlayers()) {
            if (remotePlayer.getUpdatablePlayerInfo().id == newPlayerId) {
                return;
            }
        }
        console.log("Received info of new player: " + newPlayerId);
        console.log("posX: " + data.newPlayerInfo.posX);
        console.log("posY: " + data.newPlayerInfo.posY);
        game.addRemotePlayer(data.newPlayerInfo);
    });


    $('#sendmessage').click(function() {
        socket.emit('message', 'hallo!');
    });


//    var socket = io.connect(address);
//    var game = gameArg;
//
//    socket.on('connect', function() {
////        socket.on('message', function(data) {
////            var newElement = document.createElement('li');
////            newElement.innerHTML = data.message[0] + ' says: ' + data.message[1];
////            document.getElementById("list").appendChild(newElement);
////        });
////
//        socket.on('init_request', function(data) {
//            //tell the localCharacterController where to push updates
////            game.setSendUpdateFunc(sendUpdate);
//            //get the array of players and for each create remotePlayer
//            data.playerInfoArray.forEach(function(playerInfo) {
//                game.addRemotePlayer(playerInfo);
//            });
//            socket.emit('init_response', game.getLocalPlayer().getUpdatablePlayerInfo());
//        });
//
//        socket.on('new_player_connected', function(data) {
//            var newPlayerId = data.initialPlayerInfo.id;
//            for( var remotePlayer in game.getRemotePlayers()){
//                if( remotePlayer.getUpdatablePlayerInfo().id == newPlayerId){
//                    return;
//                }
//                game.addRemotePlayer(data.initialPlayerInfo);
//            }
//        });
//
//    });
//
//    function sendUpdate(updateInfo) {
//        socket.emit('update_from_client', updateInfo);
//    }
}