function Game() {

    var TICK_DELAY_MS = 25;

    var localPlayer = new Player();
    var localCharacterController = new LocalCharacterController(localPlayer);
    var localInputReader = new LocalInputReader(localCharacterController.onKeyEvent);

    var remotePlayers = [];


    this.setSendUpdateFunc = function(sendUpdateFunc) {
        localCharacterController.setSendUpdateFunc(sendUpdateFunc);
    }

    this.addRemotePlayer = function(remotePlayerInfo) {
        console.log("game: adding new player x: " + remotePlayerInfo.posX + " y: " + remotePlayerInfo.posY);
        remotePlayers.push(new Player(remotePlayerInfo));
    };

    this.removeRemotePlayer = function(id) {
        console.log("game: try to remove player " + id);

        for (i = remotePlayers.length - 1; i >= 0; i--) {/*iterate in reverse to splice while iterating*/
            console.log( remotePlayers[i].getId());
            if (remotePlayers[i].getId() == id) {
                remotePlayers[i].disappear();
                remotePlayers.splice(i, 1);
                console.log("game: removed player");
            }
        }
    };

    this.getLocalPlayer = function() {
        return localPlayer;
    };

    this.getRemotePlayers = function() {
        return remotePlayers;
    };

    function printRemotePlayers() {
        var i = 0;
        console.log("players: ");
        remotePlayers.forEach(function(player) {
            console.log(i + " : id=" + player.getId() + "; posX=" + player.getPosX() + "; posY=" + player.getPosY() + "; direction=" + player.getDirection() + "; action=" + player.getActivity() + ";");
            i++;
        });
    }
}