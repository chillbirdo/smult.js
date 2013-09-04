function Game(localPlayerName, updatePlayerAmount) {

    var TICK_DELAY_MS = 10;

    var localPlayer = new Player(localPlayerName);
    var localCharacterController = new LocalCharacterController(localPlayer);
    var remoteCharacterControllers = {};

    localCharacterController.startTicking(TICK_DELAY_MS);

    /*
     *  registers the method where changes of the state of the local player are pushed to 
     */
    this.registerSendUpdateFunc = function(sendUpdateFunc) {
        localCharacterController.registerSendUpdateFunc(sendUpdateFunc);
    };

    /*
     * returns the actual state of the local player.
     * note that this is used for initialisation only, playerchanges are pushed via sendUpdateFunc
     */
    this.getLocalPlayerUpdatableInfos = function() {
        return localCharacterController.getPlayer().getUpdatablePlayerInfo();
    };
    
    /*
     * returns the name of the local player
     */
    this.getLocalPlayerName = function() {
        return localCharacterController.getPlayer().getName();
    };

    /*
     * returns method that reacts on keyevents (userinput)
     */
    this.getLocalPlayerOnKeyEventMethod = function() {
        return localCharacterController.onKeyEvent;
    };

    /*
     * adds a remoteplayer
     */
    this.addRemotePlayer = function(remotePlayerId, remoteUpdatablePlayerInfo, remotePlayerName) {
        console.log("game: adding new player " + remotePlayerId);
        var remotePlayer = new Player(remotePlayerName, remotePlayerId, remoteUpdatablePlayerInfo);
        var remoteCharacterController = new RemoteCharacterController(remotePlayer);
        remoteCharacterControllers[remotePlayerId] = remoteCharacterController;
        remoteCharacterControllers[remotePlayerId].startTicking(TICK_DELAY_MS);
        updatePlayerAmount(Object.keys(remoteCharacterControllers).length + 1);
        printRemotePlayers();
    };

    /*
     * removes a local player
     */
    this.removeRemotePlayer = function(remotePlayerId) {
        remoteCharacterControllers[remotePlayerId].getPlayer().disappear();
        remoteCharacterControllers[remotePlayerId].stopTicking();
        delete remoteCharacterControllers[remotePlayerId];
        updatePlayerAmount(Object.keys(remoteCharacterControllers).length + 1);

        console.log("game: removed player " + remotePlayerId);
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