function Game() {

    var TICK_DELAY_MS = 10;

    var localPlayer = new Player();
    var localCharacterController = new LocalCharacterController(localPlayer);
    var localInputReader = new LocalInputReader(localCharacterController.onKeyEvent);
    var remoteCharacterControllers = {};

    localCharacterController.startTicking(TICK_DELAY_MS);

    this.setSendUpdateFunc = function(sendUpdateFunc) {
        localCharacterController.setSendUpdateFunc(sendUpdateFunc);
    }

    this.addRemotePlayer = function(remotePlayerId, remoteUpdatablePlayerInfo) {
        console.log("game: adding new player " + remotePlayerId);
        var remotePlayer = new Player(remotePlayerId, remoteUpdatablePlayerInfo);
        var remoteCharacterController = new RemoteCharacterController(remotePlayer);
        remoteCharacterControllers[remotePlayerId] = remoteCharacterController;
        remoteCharacterControllers[remotePlayerId].startTicking(TICK_DELAY_MS);
        printRemotePlayers();
    };

    this.removeRemotePlayer = function(remotePlayerId) {
        remoteCharacterControllers[remotePlayerId].getPlayer().disappear();
        remoteCharacterControllers[remotePlayerId].stopTicking();
        delete remoteCharacterControllers[remotePlayerId];
        console.log("game: removed player " + remotePlayerId);
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
        for (var id in remoteCharacterControllers) {
            var player = remoteCharacterControllers[id].getPlayer();
            console.log("id=" + id + "; posX=" + player.getPosX() + "; posY=" + player.getPosY() + "; direction=" + player.getDirection() + "; action=" + player.getActivity() + ";");
        }
    }
}