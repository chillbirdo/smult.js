function Game() {

    var TICK_DELAY_MS = 10;

    var localPlayer = new Player();
    var localCharacterController = new LocalCharacterController(localPlayer);
    var localInputReader = new LocalInputReader(localCharacterController.onKeyEvent);
    var remoteCharacterControllers = [];

    localCharacterController.startTicking(TICK_DELAY_MS);

    this.setSendUpdateFunc = function(sendUpdateFunc) {
        localCharacterController.setSendUpdateFunc(sendUpdateFunc);
    }

    this.addRemotePlayer = function(remotePlayerInfo) {
        console.log("game: adding new player x: " + remotePlayerInfo.posX + " y: " + remotePlayerInfo.posY);
        var remotePlayer = new Player(remotePlayerInfo);
        var remoteCharacterController = new RemoteCharacterController(remotePlayer);
        remoteCharacterControllers.push(remoteCharacterController);
        remoteCharacterController.startTicking(TICK_DELAY_MS);
    };

    this.removeRemotePlayer = function(id) {
        console.log("game: try to remove player " + id);

        for (i = remoteCharacterControllers.length - 1; i >= 0; i--) {/*iterate in reverse to splice while iterating*/
            console.log(remoteCharacterControllers[i].getPlayer().getId());
            if (remoteCharacterControllers[i].getPlayer().getId() == id) {
                remoteCharacterControllers[i].getPlayer().disappear();
                remoteCharacterControllers[i].stopTicking();
                remoteCharacterControllers.splice(i, 1);
                console.log("game: removed player");
            }
        }
    };

    this.getLocalCharacterController = function() {
        return localCharacterController;
    };

    this.getRemoteCharacterControllers = function() {
        return remoteCharacterControllers;
    };

    function printRemotePlayers() {
        var i = 0;
        console.log("players: ");
        remoteCharacterControllers.forEach(function(controller) {
            var player = controller.getPlayer();
            console.log(i + " : id=" + player.getId() + "; posX=" + player.getPosX() + "; posY=" + player.getPosY() + "; direction=" + player.getDirection() + "; action=" + player.getActivity() + ";");
            i++;
        });
    }
}